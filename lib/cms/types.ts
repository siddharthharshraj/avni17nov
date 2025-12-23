/**
 * CMS Type Definitions
 * Core types for the blog CMS system
 */

export type BlogStatus = 
  | 'draft'
  | 'internal_review'
  | 'changes_requested_ir'
  | 'admin_review'
  | 'changes_requested_admin'
  | 'approved'
  | 'published'
  | 'unpublished'
  | 'locked';

export type UserRole = 'author' | 'internal_reviewer' | 'admin';

export type ReviewStage = 'internal_review' | 'admin_review';

export interface User {
  email: string;
  name: string;
  picture?: string;
  role: UserRole;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: string;
}

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'code';
  content: string | ImageContent;
  level?: number;
  order: number;
}

export interface ImageContent {
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogDraft {
  id: string;
  authorEmail: string;
  authorName: string;
  
  title: string;
  slug: string;
  description: string;
  featuredImage: string;
  tags: string[];
  
  contentBlocks: ContentBlock[];
  
  status: BlogStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  
  submittedForIRAt?: string;
  submittedForAdminAt?: string;
  approvedAt?: string;
  publishedAt?: string;
  unpublishedAt?: string;
  lockedAt?: string;
}

export interface TextAnchor {
  exact: string;
  prefix: string;
  suffix: string;
  blockId: string;
}

export interface InlineComment {
  id: string;
  blogId: string;
  draftVersion: number;
  
  anchor: TextAnchor;
  
  comment: string;
  assignedTo: string;
  createdBy: string;
  createdByName: string;
  reviewStage: ReviewStage;
  
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  
  createdAt: string;
}

export interface BlogSnapshot {
  blogId: string;
  version: number;
  draft: BlogDraft;
  comments: InlineComment[];
  createdAt: string;
  reason: 'submit_ir' | 'submit_admin' | 'comment_added' | 'manual';
}

export interface QualityCheck {
  check: string;
  passed: boolean;
  message?: string;
}

export interface PublishResult {
  success: boolean;
  markdownPath?: string;
  commitSha?: string;
  error?: string;
}

export const PERMISSIONS = {
  author: [
    'create_blog',
    'edit_own_draft',
    'view_own_blogs',
    'respond_to_comments',
    'submit_for_ir',
    'delete_own_draft',
  ],
  
  internal_reviewer: [
    'view_ir_queue',
    'add_comments_ir',
    'approve_for_admin',
    'request_changes_ir',
  ],
  
  admin: [
    'view_all_blogs',
    'add_comments_admin',
    'approve_final',
    'request_changes_admin',
    'publish',
    'force_publish',
    'delete_any_blog',
    'view_analytics',
  ],
} as const;

export type Permission = typeof PERMISSIONS[UserRole][number];
