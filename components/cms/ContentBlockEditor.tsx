'use client';

/**
 * Content Block Editor
 * Individual block editing with type-specific controls
 */

import { ContentBlock, ImageContent } from '@/lib/cms/types';
import { GripVertical, Trash2 } from 'lucide-react';

interface ContentBlockEditorProps {
  block: ContentBlock;
  onChange: (updates: Partial<ContentBlock>) => void;
  onDelete: () => void;
  readOnly?: boolean;
}

export default function ContentBlockEditor({
  block,
  onChange,
  onDelete,
  readOnly = false,
}: ContentBlockEditorProps) {
  const renderEditor = () => {
    switch (block.type) {
      case 'heading':
        return (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <select
                value={block.level || 2}
                onChange={(e) => onChange({ level: parseInt(e.target.value) })}
                disabled={readOnly}
                className="px-2 py-1 border border-gray-300 rounded text-sm font-anek disabled:bg-gray-50"
              >
                <option value={2}>H2</option>
                <option value={3}>H3</option>
                <option value={4}>H4</option>
              </select>
            </div>
            <input
              type="text"
              value={block.content as string}
              onChange={(e) => onChange({ content: e.target.value })}
              disabled={readOnly}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-anek font-bold text-xl text-[#0b2540] focus:ring-2 focus:ring-[#1F7A63] focus:border-transparent disabled:bg-gray-50"
              placeholder="Heading text..."
            />
          </div>
        );

      case 'paragraph':
        return (
          <textarea
            value={block.content as string}
            onChange={(e) => onChange({ content: e.target.value })}
            disabled={readOnly}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-noto text-base text-gray-700 leading-relaxed focus:ring-2 focus:ring-[#1F7A63] focus:border-transparent disabled:bg-gray-50"
            placeholder="Paragraph text..."
          />
        );

      case 'image':
        const img = block.content as ImageContent;
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={img.src}
              onChange={(e) => onChange({ content: { ...img, src: e.target.value } })}
              disabled={readOnly}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-noto text-sm focus:ring-2 focus:ring-[#1F7A63] focus:border-transparent disabled:bg-gray-50"
              placeholder="Image URL..."
            />
            <input
              type="text"
              value={img.alt}
              onChange={(e) => onChange({ content: { ...img, alt: e.target.value } })}
              disabled={readOnly}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-noto text-sm focus:ring-2 focus:ring-[#1F7A63] focus:border-transparent disabled:bg-gray-50"
              placeholder="Alt text..."
            />
            <input
              type="text"
              value={img.caption || ''}
              onChange={(e) => onChange({ content: { ...img, caption: e.target.value } })}
              disabled={readOnly}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-noto text-sm focus:ring-2 focus:ring-[#1F7A63] focus:border-transparent disabled:bg-gray-50"
              placeholder="Caption (optional)..."
            />
            {img.src && (
              <img
                src={img.src}
                alt={img.alt}
                className="w-full rounded-lg border border-gray-200"
              />
            )}
          </div>
        );

      case 'list':
        return (
          <textarea
            value={block.content as string}
            onChange={(e) => onChange({ content: e.target.value })}
            disabled={readOnly}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-noto text-base text-gray-700 focus:ring-2 focus:ring-[#1F7A63] focus:border-transparent disabled:bg-gray-50"
            placeholder="List items (one per line)..."
          />
        );

      case 'quote':
        return (
          <textarea
            value={block.content as string}
            onChange={(e) => onChange({ content: e.target.value })}
            disabled={readOnly}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-noto text-base italic text-gray-600 focus:ring-2 focus:ring-[#1F7A63] focus:border-transparent disabled:bg-gray-50"
            placeholder="Quote text..."
          />
        );

      case 'code':
        return (
          <textarea
            value={block.content as string}
            onChange={(e) => onChange({ content: e.target.value })}
            disabled={readOnly}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm text-gray-800 bg-gray-50 focus:ring-2 focus:ring-[#1F7A63] focus:border-transparent disabled:bg-gray-100"
            placeholder="Code..."
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:border-[#1F7A63] transition-colors">
      {/* Block Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {!readOnly && (
            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          )}
          <span className="text-xs font-anek font-semibold uppercase text-gray-500">
            {block.type}
          </span>
        </div>
        {!readOnly && (
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Block Content */}
      {renderEditor()}
    </div>
  );
}
