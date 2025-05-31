import React from 'react';
import { Session } from '../types';
import { MessageCircle, Clock } from 'lucide-react';

interface SessionsListProps {
  sessions: Session[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
}

const SessionsList: React.FC<SessionsListProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="font-medium flex items-center">
          <MessageCircle size={16} className="mr-2" />
          Recent Sessions
        </h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {sessions.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">No sessions yet</div>
        ) : (
          sessions.map(session => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                activeSessionId === session.id ? 'bg-blue-50' : ''
              }`}
            >
              <h3 className="font-medium text-gray-800 truncate">{session.title}</h3>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <Clock size={12} className="mr-1" />
                {new Date(session.createdAt).toLocaleString()}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default SessionsList;