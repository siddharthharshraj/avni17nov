/**
 * GitHub Projects v2 Type Definitions
 * Normalized data structures for project board data
 */

export interface ProjectField {
  id: string;
  name: string;
  dataType: 'TEXT' | 'NUMBER' | 'DATE' | 'SINGLE_SELECT' | 'ITERATION';
  options?: ProjectFieldOption[];
}

export interface ProjectFieldOption {
  id: string;
  name: string;
  color?: string;
}

export interface ProjectItemFieldValue {
  [fieldName: string]: string | number | null;
}

export interface ProjectItem {
  id: string;
  title: string;
  contentType: 'Issue' | 'PullRequest' | 'DraftIssue';
  content?: {
    number?: number;
    url?: string;
    repository?: string;
    author?: {
      login: string;
      avatarUrl: string;
    };
    labels?: Array<{
      name: string;
      color: string;
    }>;
    state?: string;
  };
  fields: ProjectItemFieldValue;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  url: string;
  fields: ProjectField[];
  groupByField?: string; // The field name used for columns (e.g., "Status")
}

export interface NormalizedProjectData {
  project: Project;
  items: ProjectItem[];
  columns: {
    [columnName: string]: ProjectItem[];
  };
  lastUpdated: string;
}

// Real-time update event types
export type ProjectUpdateEventType = 
  | 'itemAdded'
  | 'itemUpdated'
  | 'itemMoved'
  | 'itemRemoved'
  | 'fullRefresh';

export interface ProjectUpdateEvent {
  type: ProjectUpdateEventType;
  timestamp: string;
  data?: {
    item?: ProjectItem;
    itemId?: string;
    fromColumn?: string;
    toColumn?: string;
  };
}

// Rate limit info
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
  used: number;
}

// API response types
export interface ProjectAPIResponse {
  success: boolean;
  data?: NormalizedProjectData;
  error?: string;
  rateLimit?: RateLimitInfo;
}
