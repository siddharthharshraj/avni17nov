/**
 * Normalize GitHub Projects v2 GraphQL Response
 * Converts raw GraphQL data into a clean, usable format
 */

import type {
  Project,
  ProjectItem,
  ProjectField,
  NormalizedProjectData,
  ProjectItemFieldValue,
} from '@/types/github-project';

export function normalizeProjectData(rawData: any): NormalizedProjectData {
  const projectV2 = rawData.organization?.projectV2;

  if (!projectV2) {
    throw new Error('Project not found or not accessible');
  }

  // Normalize fields
  const fields: ProjectField[] = (projectV2.fields?.nodes || []).map((field: any) => ({
    id: field.id,
    name: field.name,
    dataType: field.dataType,
    options: field.options || undefined,
  }));

  // Find the Release field for grouping (prioritize release/version fields)
  const releaseField = fields.find(
    (f) => f.name.toLowerCase().includes('release') || f.name.toLowerCase().includes('version') || f.name.toLowerCase().includes('milestone')
  );
  const statusField = fields.find(
    (f) => f.dataType === 'SINGLE_SELECT' && (f.name.toLowerCase().includes('status') || f.name.toLowerCase().includes('stage'))
  );
  const anySelectField = fields.find((f) => f.dataType === 'SINGLE_SELECT');
  
  const groupByField = releaseField?.name || statusField?.name || anySelectField?.name;
  
  console.log('🔍 Debug - Available fields:', fields.map(f => ({ name: f.name, dataType: f.dataType })));
  console.log('🎯 Debug - Selected groupByField:', groupByField);
  console.log('✅ Debug - Release field found:', releaseField?.name);

  // Normalize project metadata
  const project: Project = {
    id: projectV2.id,
    title: projectV2.title,
    description: projectV2.shortDescription,
    url: projectV2.url,
    fields,
    groupByField,
  };

  // Normalize items
  const items: ProjectItem[] = (projectV2.items?.nodes || []).map((item: any) => {
    // Extract field values
    const fieldValues: ProjectItemFieldValue = {};
    (item.fieldValues?.nodes || []).forEach((fieldValue: any) => {
      const fieldName = fieldValue.field?.name;
      if (!fieldName) return;

      if (fieldValue.text !== undefined) {
        fieldValues[fieldName] = fieldValue.text;
      } else if (fieldValue.number !== undefined) {
        fieldValues[fieldName] = fieldValue.number;
      } else if (fieldValue.date !== undefined) {
        fieldValues[fieldName] = fieldValue.date;
      } else if (fieldValue.name !== undefined) {
        fieldValues[fieldName] = fieldValue.name;
      } else if (fieldValue.title !== undefined) {
        fieldValues[fieldName] = fieldValue.title;
      }
    });

    // Extract content (issue/PR data)
    const content = item.content;
    let normalizedContent: ProjectItem['content'];

    if (content) {
      if (content.__typename === 'DraftIssue') {
        normalizedContent = undefined; // Draft issues have limited data
      } else {
        normalizedContent = {
          number: content.number,
          url: content.url,
          repository: content.repository
            ? `${content.repository.owner.login}/${content.repository.name}`
            : undefined,
          author: content.author
            ? {
                login: content.author.login,
                avatarUrl: content.author.avatarUrl,
              }
            : undefined,
          labels: (content.labels?.nodes || []).map((label: any) => ({
            name: label.name,
            color: label.color,
          })),
          state: content.state,
        };
      }
    }

    return {
      id: item.id,
      title: content?.title || 'Untitled',
      contentType: item.type || 'DraftIssue',
      content: normalizedContent,
      fields: fieldValues,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });

  // Group items by the groupByField
  let columns: { [columnName: string]: ProjectItem[] } = {};

  if (groupByField) {
    // Get all possible column values from the field options
    const groupField = fields.find((f) => f.name === groupByField);
    if (groupField?.options) {
      groupField.options.forEach((option) => {
        columns[option.name] = [];
      });
    }

    // Add "No Status" column for items without the field
    columns['No Status'] = [];

    // Distribute items into columns
    items.forEach((item) => {
      const columnValue = item.fields[groupByField];
      if (columnValue && typeof columnValue === 'string') {
        if (!columns[columnValue]) {
          columns[columnValue] = [];
        }
        columns[columnValue].push(item);
      } else {
        columns['No Status'].push(item);
      }
    });

    // Sort columns by version number if grouping by release/version
    if (groupByField.toLowerCase().includes('release') || 
        groupByField.toLowerCase().includes('version') ||
        groupByField.toLowerCase().includes('milestone')) {
      const sortedColumns: { [columnName: string]: ProjectItem[] } = {};
      const columnNames = Object.keys(columns).filter(name => name !== 'No Status');
      
      // Sort version numbers in descending order (newest first)
      columnNames.sort((a, b) => {
        // Extract version numbers (e.g., "16.0.0" -> [16, 0, 0])
        const parseVersion = (v: string) => {
          const match = v.match(/(\d+)\.(\d+)\.(\d+)/);
          return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
        };
        
        const versionA = parseVersion(a);
        const versionB = parseVersion(b);
        
        // Compare major, minor, patch in order
        for (let i = 0; i < 3; i++) {
          if (versionB[i] !== versionA[i]) {
            return versionB[i] - versionA[i]; // Descending order
          }
        }
        return 0;
      });
      
      // Rebuild columns object in sorted order
      columnNames.forEach(name => {
        sortedColumns[name] = columns[name];
      });
      
      // Add "No Status" at the end if it has items
      if (columns['No Status'].length > 0) {
        sortedColumns['No Status'] = columns['No Status'];
      }
      
      columns = sortedColumns;
    }
  } else {
    // No grouping field found, put all items in one column
    columns['All Items'] = items;
  }

  return {
    project,
    items,
    columns,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Fetch all project items with pagination
 */
export async function fetchAllProjectItems(
  client: any,
  owner: string,
  projectNumber: number
): Promise<any> {
  let allItems: any[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;
  let projectData: any = null;

  const { PROJECT_V2_QUERY } = await import('./github-queries');

  while (hasNextPage) {
    const result: { data: any; rateLimit: any } = await client.query(PROJECT_V2_QUERY, {
      owner,
      number: projectNumber,
      after: cursor,
    });

    if (!projectData) {
      projectData = result.data;
    }

    const items: any[] = result.data.organization?.projectV2?.items?.nodes || [];
    allItems = allItems.concat(items);

    const pageInfo: any = result.data.organization?.projectV2?.items?.pageInfo;
    hasNextPage = pageInfo?.hasNextPage || false;
    cursor = pageInfo?.endCursor || null;

    // Safety limit: max 500 items
    if (allItems.length >= 500) {
      console.warn('Reached maximum item limit (500)');
      break;
    }
  }

  // Replace items with all fetched items
  if (projectData?.organization?.projectV2) {
    projectData.organization.projectV2.items.nodes = allItems;
  }

  return projectData;
}
