function MailItem({ message, isSelected, onSelect, onToggleStar }) {
  const initials = message.sender
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={`message-row${isSelected ? " is-selected" : ""}${message.unread ? " is-unread" : ""}`}
    >
      <span
        className={`sender-avatar ${message.avatarClassName ?? "avatar-lavender"}`}
        aria-hidden="true"
      >
        {initials}
      </span>
      <button
        className="message-row-content"
        type="button"
        onClick={onSelect}
        aria-pressed={isSelected}
      >
        <span className="message-row-top">
          <span className="sender-name">{message.sender}</span>
          <time className="message-time">{message.time}</time>
        </span>
        <span className="message-subject">{message.subject || "(no subject)"}</span>
        <span className="message-preview">{message.preview || message.body}</span>
      </button>
      <button
        className={`row-star${message.starred ? " is-starred" : ""}`}
        type="button"
        aria-label={`${message.starred ? "Remove star from" : "Star"} message from ${message.sender}`}
        aria-pressed={Boolean(message.starred)}
        onClick={onToggleStar}
      >
        {message.starred ? "★" : "☆"}
      </button>
    </article>
  );
}

export default MailItem;