// components/ChatDashboard.tsx
export const ChatDashboard = ({
  messages,
  currentUserId,
}: {
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    avatar: string;
    content: string;
    timestamp: string;
  }[];
  currentUserId: string;
}) => {
  return (
    <div className="space-y-4">
      {messages.map((msg) => {
        const isCurrentUser = msg.senderId === currentUserId;
        return (
          <div
            key={msg.id}
            className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={msg.avatar} alt={msg.senderName} />
              </div>
            </div>
            <div className="chat-header">
              {msg.senderName}
              <time className="text-xs opacity-50 ml-1">{msg.timestamp}</time>
            </div>
            <div className="chat-bubble">{msg.content}</div>
            <div className="chat-footer opacity-50">
              {isCurrentUser ? "Seen" : "Delivered"}
            </div>
          </div>
        );
      })}
    </div>
  );
};
