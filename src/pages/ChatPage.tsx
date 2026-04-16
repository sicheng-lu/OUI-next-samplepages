import styles from './ChatPage.module.css';

const SAMPLE_MESSAGES = [
  { role: 'assistant' as const, text: 'Hello! I\'m your OpenSearch assistant. How can I help you today?' },
  { role: 'user' as const, text: 'Show me the top error-producing indices from the last 24 hours.' },
  { role: 'assistant' as const, text: 'Here are the top 3 indices by error count in the last 24 hours:\n\n1. logs-web-prod — 2,847 errors\n2. logs-api-gateway — 1,203 errors\n3. logs-auth-service — 892 errors\n\nWould you like me to drill into any of these?' },
];

const ChatPage = () => {
  return (
    <div className={styles.page} data-testid="chat-page">
      <div className={styles.header}>
        <h1 className={styles.title}>Chat</h1>
      </div>

      <div className={styles.messages} data-testid="chat-messages">
        {SAMPLE_MESSAGES.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${msg.role === 'user' ? styles.messageUser : ''}`}
          >
            <div className={`${styles.avatar} ${msg.role === 'user' ? styles.avatarUser : styles.avatarAssistant}`}>
              {msg.role === 'user' ? 'U' : 'AI'}
            </div>
            <div className={`${styles.bubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <input
            className={styles.chatInput}
            type="text"
            placeholder="Ask a question about your data..."
            data-testid="chat-input"
            readOnly
          />
          <button className={styles.sendButton} type="button" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2.94 3.02a.75.75 0 01.86-.18l14 6.5a.75.75 0 010 1.36l-14 6.5a.75.75 0 01-1.04-.88L4.44 11H10a.75.75 0 000-1.5H4.44L2.76 3.9a.75.75 0 01.18-.88z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
