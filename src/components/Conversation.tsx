import React, { useState } from 'react';
import { Conversation as ConversationType } from '../types';
import AnswerCard from './AnswerCard';
import QuestionForm from './QuestionForm';

interface ConversationProps {
  conversations: ConversationType[];
  onAskFollowUp: (parentId: string, question: string) => void;
  isLoading: boolean;
}

const Conversation: React.FC<ConversationProps> = ({
  conversations,
  onAskFollowUp,
  isLoading,
}) => {
  const [followUpId, setFollowUpId] = useState<string | null>(null);

  // Build a tree structure for the conversation
  const buildConversationTree = (convs: ConversationType[]) => {
    const roots: ConversationType[] = [];
    const childrenMap: Record<string, ConversationType[]> = {};

    // First, identify root conversations and create a children map
    convs.forEach(conv => {
      if (!conv.parentId) {
        roots.push(conv);
      } else {
        if (!childrenMap[conv.parentId]) {
          childrenMap[conv.parentId] = [];
        }
        childrenMap[conv.parentId].push(conv);
      }
    });

    // Recursive function to render conversation and its children
    const renderConversation = (conv: ConversationType, level: number = 0) => {
      const children = childrenMap[conv.id] || [];
      
      return (
        <div key={conv.id} className={`ml-${level * 4}`}>
          <AnswerCard
            question={conv.question}
            answer={conv.answer}
            citations={conv.citations}
            timestamp={conv.timestamp}
            isFollowUp={level > 0}
            onFollowUp={() => setFollowUpId(followUpId === conv.id ? null : conv.id)}
          />
          
          {followUpId === conv.id && (
            <div className="ml-6 mb-4">
              <QuestionForm
                onSubmit={(question) => {
                  onAskFollowUp(conv.id, question);
                  setFollowUpId(null);
                }}
                isLoading={isLoading}
                placeholder="Ask a follow-up question..."
              />
            </div>
          )}
          
          {children.map(child => renderConversation(child, level + 1))}
        </div>
      );
    };

    return roots.map(root => renderConversation(root));
  };

  return (
    <div className="w-full">
      {buildConversationTree(conversations)}
    </div>
  );
};

export default Conversation;