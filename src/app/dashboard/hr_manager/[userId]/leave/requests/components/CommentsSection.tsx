'use client';

import { MessageSquare, Send } from 'lucide-react';

export default function CommentsSection() {
  const comments = [
    { id: 1, author: 'Rahul Sharma', role: 'Employee', message: 'Need leave for family function.', time: '28 May 2024, 10:30 AM' },
    { id: 2, author: 'John Manager', role: 'Manager', message: 'Work has been delegated.', time: '28 May 2024, 2:45 PM' },
    { id: 3, author: 'Sarah HR', role: 'HR', message: 'Approved.', time: '29 May 2024, 11:20 AM' },
  ];

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-blue-500" />
        Comments Section
      </h3>
      <div className="space-y-4 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-zinc-900 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{comment.author}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{comment.role}</p>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{comment.time}</p>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{comment.message}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#94cb3d] focus:border-transparent"
        />
        <button className="px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
