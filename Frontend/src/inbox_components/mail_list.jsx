import MailItem from "./mail_item.jsx";

const tabs = [
  { id: "all", label: "All" },
  { id: "primary", label: "Primary" },
  { id: "social", label: "Social" },
  { id: "promotions", label: "Promotions" },
];

function MailList({
  title,
  messages,
  selectedId,
  search,
  activeCategory,
  onSearchChange,
  onCategoryChange,
  onSelect,
  onToggleStar,
  onRefresh,
}) {
  return (
    <section className="message-panel" aria-label={`${title} messages`}>
      <div className="inbox-toolbar">
        <label className="inbox-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            placeholder="Search mail"
            aria-label="Search mail"
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <kbd aria-hidden="true">/</kbd>
        </label>
        <button
          className="icon-button"
          type="button"
          aria-label="Refresh messages"
          title="Refresh messages"
          onClick={onRefresh}
        >
          ↻
        </button>
      </div>

      <div className="message-list-heading">
        <div>
          <p className="eyebrow">YOUR MAIL</p>
          <h1>{title}</h1>
        </div>
        <span className="message-total">
          {messages.length} {messages.length === 1 ? "message" : "messages"}
        </span>
      </div>

      <div className="message-tabs" role="tablist" aria-label="Message categories">
        {tabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          const count =
            tab.id === "primary"
              ? messages.filter((message) => (message.category ?? "primary") === tab.id)
                  .length
              : null;

          return (
            <button
              className={isActive ? "is-active" : ""}
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(tab.id)}
            >
              {tab.label}
              {count > 0 && <span>{count}</span>}
            </button>
          );
        })}
      </div>

      <div className="message-list">
        {messages.length === 0 ? (
          <div className="empty-list">
            <span aria-hidden="true">✉</span>
            <strong>No messages found</strong>
            <p>Try another folder or search term.</p>
          </div>
        ) : (
          messages.map((message) => (
            <MailItem
              key={message.id}
              message={message}
              isSelected={message.id === selectedId}
              onSelect={() => onSelect(message.id)}
              onToggleStar={(event) => {
                event.stopPropagation();
                onToggleStar(message.id);
              }}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default MailList;