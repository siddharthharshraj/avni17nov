/**
 * GitHub Publishing Integration
 * Commit markdown and images to GitHub repository
 */

import { BlogDraft, PublishResult } from './types';
import { blocksToMarkdown, generateFrontmatter } from './markdown-converter';

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'samanvayfoundation';
const GITHUB_REPO = process.env.GITHUB_REPO || 'avninew-v2-PROD';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

if (!GITHUB_TOKEN) {
  console.warn('GITHUB_TOKEN not set - publishing will fail');
}

interface GitHubFileContent {
  path: string;
  content: string;
  message: string;
  branch?: string;
  sha?: string;
}

async function githubRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${error}`);
  }
  
  return response.json();
}

async function getFileSha(path: string): Promise<string | null> {
  try {
    const data = await githubRequest(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`
    );
    return data.sha;
  } catch (error) {
    return null;
  }
}

async function createOrUpdateFile(file: GitHubFileContent): Promise<any> {
  const sha = await getFileSha(file.path);
  
  const body = {
    message: file.message,
    content: Buffer.from(file.content).toString('base64'),
    branch: file.branch || GITHUB_BRANCH,
    ...(sha && { sha }),
  };
  
  return githubRequest(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file.path}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
    }
  );
}

export async function publishBlogToGitHub(blog: BlogDraft): Promise<PublishResult> {
  try {
    // Generate markdown content
    const markdown = blocksToMarkdown(blog.contentBlocks);
    
    // Generate frontmatter
    const frontmatter = generateFrontmatter({
      title: blog.title,
      author: blog.authorName,
      date: new Date(blog.createdAt).toISOString().split('T')[0],
      tags: blog.tags,
      featuredImage: blog.featuredImage,
      description: blog.description,
    });
    
    const fullMarkdown = frontmatter + markdown;
    
    // Create filename: YYYY-MM-DD-slug.md
    const date = new Date(blog.createdAt).toISOString().split('T')[0];
    const filename = `${date}-${blog.slug}.md`;
    const markdownPath = `content/blogs/${filename}`;
    
    // Commit markdown file
    const result = await createOrUpdateFile({
      path: markdownPath,
      content: fullMarkdown,
      message: `Publish blog: ${blog.title}`,
    });
    
    return {
      success: true,
      markdownPath,
      commitSha: result.commit.sha,
    };
  } catch (error) {
    console.error('Error publishing to GitHub:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function uploadImageToGitHub(
  blogSlug: string,
  imageName: string,
  imageData: Buffer
): Promise<string> {
  const path = `public/images/blog/${blogSlug}/${imageName}`;
  
  await createOrUpdateFile({
    path,
    content: imageData.toString('base64'),
    message: `Add image for blog: ${blogSlug}`,
  });
  
  return `/images/blog/${blogSlug}/${imageName}`;
}

export async function deleteImageFromGitHub(imagePath: string): Promise<void> {
  const sha = await getFileSha(imagePath);
  if (!sha) return;
  
  await githubRequest(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${imagePath}`,
    {
      method: 'DELETE',
      body: JSON.stringify({
        message: `Delete image: ${imagePath}`,
        sha,
        branch: GITHUB_BRANCH,
      }),
    }
  );
}

export async function unpublishBlogFromGitHub(blog: BlogDraft): Promise<PublishResult> {
  try {
    const date = new Date(blog.createdAt).toISOString().split('T')[0];
    const filename = `${date}-${blog.slug}.md`;
    const markdownPath = `content/blogs/${filename}`;
    
    const sha = await getFileSha(markdownPath);
    if (!sha) {
      return {
        success: false,
        error: 'Blog file not found in repository',
      };
    }
    
    await githubRequest(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${markdownPath}`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          message: `Unpublish blog: ${blog.title}`,
          sha,
          branch: GITHUB_BRANCH,
        }),
      }
    );
    
    return {
      success: true,
      markdownPath,
    };
  } catch (error) {
    console.error('Error unpublishing from GitHub:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function triggerNetlifyBuild(): Promise<void> {
  const buildHook = process.env.NETLIFY_BUILD_HOOK;
  if (!buildHook) return;
  
  try {
    await fetch(buildHook, { method: 'POST' });
  } catch (error) {
    console.error('Error triggering Netlify build:', error);
  }
}
