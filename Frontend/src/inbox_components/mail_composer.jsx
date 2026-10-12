import { useState } from "react";

function MailComposer({
  initialTo = "",
  initialSubject = "",
  initialBody = "",
  onSend,
  onClose,
}) {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);

  function handleSubmit(event) {
    event.preventDefault();
    onSend({ to: to.trim(), subject: subject.trim(), body: body.trim() });
  }

  return (
    <div
      className="compose-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        className="compose-modal"
        aria-labelledby="compose-title"
        onSubmit={handleSubmit}
      >
        <div className="compose-heading">
          <h2 id="compose-title">New message</h2>
          <button
            className="icon-button"
            type="button"
            aria-label="Close composer"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <label>
          To
          <input
            autoFocus
            type="email"
            value={to}
            placeholder="name@example.com"
            required
            onChange={(event) => setTo(event.target.value)}
          />
        </label>
        <label>
          Subject
          <input
            type="text"
            value={subject}
            placeholder="Add a subject"
            onChange={(event) => setSubject(event.target.value)}
          />
        </label>
        <label>
          Message
          <textarea
            rows="8"
            value={body}
            placeholder="Write your message..."
            required
            onChange={(event) => setBody(event.target.value)}
          />
        </label>
        <div className="compose-footer">
          <span>Sent from dotMercury</span>
          <button className="send-button" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default MailComposer;