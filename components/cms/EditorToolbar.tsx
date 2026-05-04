'use client';

/**
 * Editor Toolbar
 * Add different types of content blocks
 */

import { ContentBlock } from '@/lib/cms/types';
import { Type, Image, List, Quote, Code, Heading2 } from 'lucide-react';
import { useState } from 'react';

interface EditorToolbarProps {
  onAddBlock: (type: ContentBlock['type']) => void;
}

export default function EditorToolbar({ onAddBlock }: EditorToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const blocks = [
    { type: 'heading' as const, icon: Heading2, label: 'Heading' },
    { type: 'paragraph' as const, icon: Type, label: 'Paragraph' },
    { type: 'image' as const, icon: Image, label: 'Image' },
    { type: 'list' as const, icon: List, label: 'List' },
    { type: 'quote' as const, icon: Quote, label: 'Quote' },
    { type: 'code' as const, icon: Code, label: 'Code' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-[#1F7A63] text-white rounded-lg hover:bg-[#155947] font-anek font-medium text-sm"
      >
        + Add Block
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            {blocks.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => {
                  onAddBlock(type);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 font-noto text-sm text-gray-700"
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
