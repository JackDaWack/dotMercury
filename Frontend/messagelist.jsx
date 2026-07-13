import MessageRow from "./MessageRow";
import SearchBox from "../common/SearchBox";
import Toolbar from "../common/Toolbar";

export default function MessageList({ messages, onSearch, onSelectMessage }) {
  return (
    <div className="message-list">
      <Toolbar />
      <SearchBox onSearch={onSearch} />
      <div className="message-rows">
        {messages.map((message) => (
          <MessageRow
            key={message.id}
            message={message}
            isOwnMessage={message.isOwnMessage}
            onSelect={onSelectMessage}
          />
        ))}
      </div>
    </div>
  );
}