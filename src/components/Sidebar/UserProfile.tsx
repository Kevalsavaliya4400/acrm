import React from 'react';
import { User } from 'lucide-react';

export function UserProfile() {
  const userInitials = 'JD'; // This would come from user context
  const userName = 'John Doe'; // This would come from user context
  const userRole = 'Real Estate Agent'; // This would come from user context

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          {userInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
          <p className="text-xs text-gray-500 truncate">{userRole}</p>
        </div>
      </div>
    </div>
  );
}