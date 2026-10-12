function MailViewer({ message, onArchive, onDelete, onToggleStar, onReply }) {
  if (!message) {
    return (
      <section className="reading-panel" aria-label="Message details">
        <div className="reading-empty">
          <span aria-hidden="true">✉</span>
          <strong>Select a message to read</strong>
          <p>Your selected email will appear here.</p>
        </div>
      </section>
    );
  }

  const initials = message.sender
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="reading-panel" aria-label="Message details">
      <div className="reading-toolbar">
        <div>
          <button
            className="icon-button"
            type="button"
            aria-label="Archive message"
            title="Archive"
            onClick={() => onArchive(message.id)}
          >
            ▣
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Move message to trash"
            title="Move to trash"
            onClick={() => onDelete(message.id)}
          >
            ⌫
          </button>
        </div>
        <button
          className={`icon-button${message.starred ? " is-starred" : ""}`}
          type="button"
          aria-label={message.starred ? "Remove star" : "Star message"}
          aria-pressed={Boolean(message.starred)}
          title={message.starred ? "Remove star" : "Star"}
          onClick={() => onToggleStar(message.id)}
        >
          {message.starred ? "★" : "☆"}
        </button>
      </div>

      <article className="message-detail">
        {message.labels?.length > 0 && (
          <div className="detail-labels" aria-label="Message labels">
            {message.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        )}
        <h2>{message.subject || "(no subject)"}</h2>

        <div className="sender-detail">
          <span
            className={`sender-avatar ${message.avatarClassName ?? "avatar-lavender"}`}
            aria-hidden="true"
          >
            {initials}
          </span>
          <div>
            <strong>{message.sender}</strong>
            <span>{message.email}</span>
          </div>
          <time>{message.date ?? message.time}</time>
        </div>

        <div className="message-body">{message.body}</div>

        <div className="reply-actions">
          <button
            className="reply-button"
            type="button"
            onClick={() => onReply(message)}
          >
            <span aria-hidden="true">↶</span>
            Reply
          </button>
          <button
            className="reply-button"
            type="button"
            onClick={() => onReply(message, true)}
          >
            <span aria-hidden="true">↗</span>
            Forward
          </button>
        </div>
      </article>
    </section>
  );
}

export default MailViewer;