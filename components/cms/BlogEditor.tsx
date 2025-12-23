'use client';

/**
 * Blog Editor Component
 * Edit blog on real layout with content blocks
 * Reuses existing blog components for pixel-perfect rendering
 */

import { useState, useEffect } from 'react';
import { BlogDraft, ContentBlock } from '@/lib/cms/types';
import ContentBlockEditor from './ContentBlockEditor';
import EditorToolbar from './EditorToolbar';
import BlogPreview from './BlogPreview';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface BlogEditorProps {
  blog: BlogDraft;
  onSave: (updates: Partial<BlogDraft>) => Promise<void>;
  readOnly?: boolean;
}

export default function BlogEditor({ blog, onSave, readOnly = false }: BlogEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(blog.contentBlocks);
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [tags, setTags] = useState<string[]>(blog.tags);
  const [featuredImage, setFeaturedImage] = useState(blog.featuredImage);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBlocks(blog.contentBlocks);
    setTitle(blog.title);
    setDescription(blog.description);
    setTags(blog.tags);
    setFeaturedImage(blog.featuredImage);
  }, [blog]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        title,
        description,
        tags,
        featuredImage,
        contentBlocks: blocks,
      });
    } finally {
      setSaving(false);
    }
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: type === 'image' ? { src: '', alt: '' } : '',
      order: blocks.length,
      ...(type === 'heading' && { level: 2 }),
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reordered = items.map((block, index) => ({
      ...block,
      order: index,
    }));

    setBlocks(reordered);
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <h2 className="font-anek font-bold text-xl text-[#0b2540]">Preview Mode</h2>
            <button
              onClick={() => setPreviewMode(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-anek font-medium"
            >
              Exit Preview
            </button>
          </div>
        </div>
        <BlogPreview
          title={title}
          description={description}
          featuredImage={featuredImage}
          tags={tags}
          contentBlocks={blocks}
          author={blog.authorName}
          date={blog.createdAt}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Editor Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="font-anek font-bold text-xl text-[#0b2540]">
                {readOnly ? 'Viewing Blog' : 'Editing Blog'}
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-anek font-semibold uppercase ${
                blog.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                blog.status === 'internal_review' ? 'bg-blue-100 text-blue-700' :
                blog.status === 'admin_review' ? 'bg-purple-100 text-purple-700' :
                blog.status === 'approved' ? 'bg-green-100 text-green-700' :
                blog.status === 'published' ? 'bg-teal-100 text-teal-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {blog.status.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewMode(true)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-anek font-medium"
              >
                Preview
              </button>
              {!readOnly && (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-[#419372] text-white rounded-lg hover:bg-[#357a5e] font-anek font-semibold disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Title */}
            <div className="mb-6">
              <label className="block font-anek font-bold text-sm text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={readOnly}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-anek text-2xl font-bold text-[#0b2540] focus:ring-2 focus:ring-[#419372] focus:border-transparent disabled:bg-gray-50"
                placeholder="Enter blog title..."
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block font-anek font-bold text-sm text-gray-700 mb-2">
                Description (SEO) *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={readOnly}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-noto text-base text-gray-700 focus:ring-2 focus:ring-[#419372] focus:border-transparent disabled:bg-gray-50"
                placeholder="Brief description for SEO (min 50 characters)..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {description.length} / 50 characters minimum
              </p>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <label className="block font-anek font-bold text-sm text-gray-700 mb-2">
                Featured Image *
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                disabled={readOnly}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-noto text-base focus:ring-2 focus:ring-[#419372] focus:border-transparent disabled:bg-gray-50"
                placeholder="Image URL or upload..."
              />
            </div>

            {/* Content Blocks */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="block font-anek font-bold text-sm text-gray-700">
                  Content Blocks
                </label>
                {!readOnly && (
                  <EditorToolbar onAddBlock={addBlock} />
                )}
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="blocks">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {blocks.sort((a, b) => a.order - b.order).map((block, index) => (
                        <Draggable
                          key={block.id}
                          draggableId={block.id}
                          index={index}
                          isDragDisabled={readOnly}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ContentBlockEditor
                                block={block}
                                onChange={(updates) => updateBlock(block.id, updates)}
                                onDelete={() => deleteBlock(block.id)}
                                readOnly={readOnly}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {blocks.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 font-noto">
                    No content blocks yet. Click "Add Block" to start writing.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <label className="block font-anek font-bold text-sm text-gray-700 mb-3">
                Tags (min 3) *
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E9EAF8] text-[#FF8854] font-anek font-bold text-xs uppercase rounded"
                  >
                    {tag}
                    {!readOnly && (
                      <button
                        onClick={() => setTags(tags.filter((_, i) => i !== index))}
                        className="text-[#FF8854] hover:text-red-600"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {!readOnly && (
                <input
                  type="text"
                  placeholder="Add tag and press Enter..."
                  className="w-full px-3 py-2 border border-gray-300 rounded font-noto text-sm focus:ring-2 focus:ring-[#419372] focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      setTags([...tags, e.currentTarget.value.trim()]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-anek font-bold text-sm text-gray-700 mb-3">Metadata</h3>
              <div className="space-y-2 text-sm font-noto">
                <div className="flex justify-between">
                  <span className="text-gray-600">Author:</span>
                  <span className="font-medium">{blog.authorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated:</span>
                  <span className="font-medium">
                    {new Date(blog.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium">{blog.version}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
