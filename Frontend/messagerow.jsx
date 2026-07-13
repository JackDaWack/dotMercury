import Avatar from './avatar';

export default function MessageRow({ message, isOwnMessage }) {
  return (
    <div className={`message-row ${isOwnMessage ? 'own-message' : ''}`}>
      <Avatar />
      <div className="message-header">
        <span>{message.sender}</span>
        <span>{message.date}</span>
      </div>
      <div className="message-content">
        <p>{message.preview}</p>
      </div>
    </div>
  );
}