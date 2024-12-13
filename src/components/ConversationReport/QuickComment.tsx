import React, { useState } from 'react';
import { Send, Phone, Mail, Video } from 'lucide-react';
import type { Conversation } from '../../types';

interface QuickCommentProps {
  onSubmit: (conversation: Omit<Conversation, 'id'>) => Promise<void>;
  leadId: string;
}

const QUICK_COMMENTS = [
  'Left voicemail',
  'No answer',
  'Will call back',
  'Scheduled meeting',
  'Sent information',
  'Following up next week',
];

export function QuickComment({ onSubmit, leadId }: QuickCommentProps) {
  const [type, setType] = useState<'call' | 'email' | 'meeting'>('call');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        lead_id: leadId,
        type,
        notes: comment,
        date: new Date().toISOString(),
        outcome: 'Completed',
      });
      setComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[
          { type: 'call' as const, icon: Phone, label: 'Call' },
          { type: 'email' as const, icon: Mail, label: 'Email' },
          { type: 'meeting' as const, icon: Video, label: 'Meeting' },
        ].map(({ type: t, icon: Icon, label }) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
              type === t
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_COMMENTS.map((quickComment) => (
          <button
            key={quickComment}
            onClick={() => setComment(quickComment)}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            {quickComment}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting || !comment.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          Add
        </button>
      </form>
    </div>
  );
}