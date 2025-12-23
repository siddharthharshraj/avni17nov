'use client';

/**
 * Inline Comment Overlay
 * Text selection and comment highlighting system
 */

import { useState, useEffect, useRef } from 'react';
import { InlineComment, TextAnchor } from '@/lib/cms/types';
import { MessageSquare, Check, X } from 'lucide-react';

interface InlineCommentOverlayProps {
  blogId: string;
  comments: InlineComment[];
  onAddComment: (anchor: TextAnchor, comment: string) => Promise<void>;
  onResolveComment: (commentId: string, resolved: boolean) => Promise<void>;
  canComment: boolean;
  canResolve: boolean;
}

export default function InlineCommentOverlay({
  blogId,
  comments,
  onAddComment,
  onResolveComment,
  canComment,
  canResolve,
}: InlineCommentOverlayProps) {
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [adding, setAdding] = useState(false);
  const commentBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setSelectedText('');
        setSelectionPosition(null);
        return;
      }

      const text = selection.toString().trim();
      if (text.length === 0) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedText(text);
      setSelectionPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commentBoxRef.current && !commentBoxRef.current.contains(event.target as Node)) {
        setShowCommentBox(false);
        setCommentText('');
      }
    };

    if (showCommentBox) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCommentBox]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !selectedText) return;

    setAdding(true);
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const textContent = container.textContent || '';
      const startOffset = range.startOffset;

      const prefix = textContent.slice(Math.max(0, startOffset - 20), startOffset);
      const suffix = textContent.slice(startOffset + selectedText.length, startOffset + selectedText.length + 20);

      const anchor: TextAnchor = {
        exact: selectedText,
        prefix,
        suffix,
        blockId: container.parentElement?.id || 'unknown',
      };

      await onAddComment(anchor, commentText);

      setShowCommentBox(false);
      setCommentText('');
      setSelectedText('');
      setSelectionPosition(null);
      window.getSelection()?.removeAllRanges();
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      {/* Comment Button */}
      {canComment && selectedText && selectionPosition && !showCommentBox && (
        <div
          className="fixed z-50"
          style={{
            left: `${selectionPosition.x}px`,
            top: `${selectionPosition.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <button
            onClick={() => setShowCommentBox(true)}
            className="px-3 py-2 bg-[#419372] text-white rounded-lg shadow-lg hover:bg-[#357a5e] font-anek font-medium text-sm flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Add Comment
          </button>
        </div>
      )}

      {/* Comment Input Box */}
      {showCommentBox && selectionPosition && (
        <div
          ref={commentBoxRef}
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80"
          style={{
            left: `${selectionPosition.x}px`,
            top: `${selectionPosition.y + 40}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="mb-3">
            <p className="text-xs font-anek font-semibold uppercase text-gray-600 mb-1">
              Selected Text
            </p>
            <p className="text-sm font-noto text-gray-700 bg-yellow-50 p-2 rounded border border-yellow-200">
              "{selectedText}"
            </p>
          </div>

          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your comment..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-noto text-sm focus:ring-2 focus:ring-[#419372] focus:border-transparent"
            autoFocus
          />

          <div className="flex items-center justify-end gap-2 mt-3">
            <button
              onClick={() => {
                setShowCommentBox(false);
                setCommentText('');
              }}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded font-anek text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim() || adding}
              className="px-4 py-1.5 bg-[#419372] text-white rounded hover:bg-[#357a5e] font-anek font-medium text-sm disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add Comment'}
            </button>
          </div>
        </div>
      )}

      {/* Comment Highlights */}
      {comments.map((comment) => (
        <CommentHighlight
          key={comment.id}
          comment={comment}
          onResolve={(resolved) => onResolveComment(comment.id, resolved)}
          canResolve={canResolve}
        />
      ))}
    </>
  );
}

interface CommentHighlightProps {
  comment: InlineComment;
  onResolve: (resolved: boolean) => void;
  canResolve: boolean;
}

function CommentHighlight({ comment, onResolve, canResolve }: CommentHighlightProps) {
  const [showThread, setShowThread] = useState(false);

  return (
    <div className="relative inline">
      <mark
        className={`cursor-pointer ${
          comment.resolved
            ? 'bg-green-100 hover:bg-green-200'
            : 'bg-yellow-200 hover:bg-yellow-300'
        }`}
        onClick={() => setShowThread(!showThread)}
      >
        {comment.anchor.exact}
      </mark>

      {showThread && (
        <div className="absolute z-50 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-anek font-semibold text-sm text-[#0b2540]">
                {comment.createdByName}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setShowThread(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="font-noto text-sm text-gray-700 mb-3">
            {comment.comment}
          </p>

          {canResolve && (
            <button
              onClick={() => onResolve(!comment.resolved)}
              className={`w-full px-3 py-2 rounded font-anek font-medium text-sm flex items-center justify-center gap-2 ${
                comment.resolved
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <Check className="w-4 h-4" />
              {comment.resolved ? 'Unresolve' : 'Mark as Resolved'}
            </button>
          )}

          {comment.resolved && (
            <p className="text-xs text-green-600 mt-2 text-center">
              Resolved by {comment.resolvedBy}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
