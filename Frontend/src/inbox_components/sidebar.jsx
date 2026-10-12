import "../Inbox.css";

const folders = [
  { id: "inbox", label: "Inbox", icon: "✉" },
  { id: "starred", label: "Starred", icon: "☆" },
  { id: "snoozed", label: "Snoozed", icon: "◷" },
  { id: "sent", label: "Sent", icon: "↗" },
  { id: "drafts", label: "Drafts", icon: "▤" },
  { id: "archive", label: "Archive", icon: "▣" },
  { id: "trash", label: "Trash", icon: "⌫" },
];

const defaultLabels = [
  { id: "personal", name: "Personal", dotClassName: "" },
  { id: "work", name: "Work", dotClassName: "label-dot-1" },
  { id: "receipts", name: "Receipts", dotClassName: "label-dot-2" },
];

function Sidebar({
  activeFolder = "inbox",
  activeLabel = null,
  unreadCount = 0,
  draftCount = 0,
  labels = defaultLabels,
  storageUsed = 4.2,
  storageLimit = 15,
  onCompose,
  onFolderChange,
  onLabelChange,
  onAddLabel,
}) {
  const storagePercentage =
    storageLimit > 0
      ? Math.min(Math.max((storageUsed / storageLimit) * 100, 0), 100)
      : 0;

  return (
    <aside className="inbox-sidebar" aria-label="Mailbox navigation">
      <button className="compose-button" type="button" onClick={onCompose}>
        <span aria-hidden="true">+</span>
        Compose
      </button>

      <nav className="folder-nav" aria-label="Folders">
        {folders.map((folder) => {
          const isActive = activeFolder === folder.id;
          const count =
            folder.id === "inbox"
              ? unreadCount
              : folder.id === "drafts"
                ? draftCount
                : 0;

          return (
            <button
              className={`folder-link${isActive ? " is-active" : ""}`}
              key={folder.id}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onFolderChange?.(folder.id)}
            >
              <span className="folder-icon" aria-hidden="true">
                {folder.icon}
              </span>
              <span>{folder.label}</span>
              {count > 0 && <span className="folder-count">{count}</span>}
            </button>
          );
        })}
      </nav>

      <section className="sidebar-section" aria-labelledby="labels-heading">
        <div className="sidebar-heading">
          <span id="labels-heading">Labels</span>
          <button
            className="icon-button"
            type="button"
            aria-label="Add label"
            onClick={onAddLabel}
          >
            +
          </button>
        </div>
        <nav aria-label="Labels">
          {labels.map((label) => {
            const isActive = activeLabel === label.id;

            return (
              <button
                className={`label-link${isActive ? " is-active" : ""}`}
                key={label.id}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onLabelChange?.(label.id)}
              >
                <span
                  className={`label-dot ${label.dotClassName ?? ""}`.trim()}
                  aria-hidden="true"
                />
                <span>{label.name}</span>
              </button>
            );
          })}
        </nav>
      </section>

      <section className="storage-card" aria-label="Storage usage">
        <div className="storage-copy">
          <span>Storage</span>
          <strong>
            {storageUsed} GB <span>of {storageLimit} GB</span>
          </strong>
        </div>
        <div
          className="storage-meter"
          role="meter"
          aria-label="Storage used"
          aria-valuemin={0}
          aria-valuemax={storageLimit}
          aria-valuenow={storageUsed}
        >
          <span style={{ width: `${storagePercentage}%` }} />
        </div>
        <p>Storage used across your mailbox</p>
      </section>
    </aside>
  );
}

export default Sidebar;