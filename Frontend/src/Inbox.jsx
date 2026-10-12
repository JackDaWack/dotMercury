import { useMemo, useState } from "react";
import "./Inbox.css";
import MailComposer from "./inbox_components/mail_composer.jsx";
import MailList from "./inbox_components/mail_list.jsx";
import MailViewer from "./inbox_components/mail_viewer.jsx";
import Sidebar from "./inbox_components/sidebar.jsx";

const demoMessages = [
  {
    id: "welcome",
    sender: "Maya Chen",
    email: "maya.chen@example.com",
    subject: "Welcome to dotMercury",
    preview: "A few tips to help you get started with your new inbox.",
    body: "Hi there,\n\nWelcome to dotMercury! Your new inbox is ready. You can organize messages with folders and labels, and keep track of important conversations by starring them.\n\nWe are glad you are here.\n\n— Maya",
    time: "9:42 AM",
    date: "Today, 9:42 AM",
    unread: true,
    starred: true,
    folder: "inbox",
    category: "primary",
    labels: ["Personal"],
    avatarClassName: "avatar-lavender",
  },
  {
    id: "design-review",
    sender: "Jordan Lee",
    email: "jordan.lee@example.com",
    subject: "Design review for Friday",
    preview: "I’ve attached the latest screens for a quick look before the review.",
    body: "Hi,\n\nI’ve attached the latest screens for Friday’s review. When you have a moment, please take a look at the updated navigation and share any feedback.\n\nThanks,\nJordan",
    time: "8:15 AM",
    date: "Today, 8:15 AM",
    unread: true,
    starred: false,
    folder: "inbox",
    category: "primary",
    labels: ["Work"],
    avatarClassName: "avatar-mint",
  },
  {
    id: "receipt",
    sender: "Northstar Market",
    email: "receipts@northstarmarket.example",
    subject: "Your order receipt",
    preview: "Thanks for your order. Here is your receipt and delivery summary.",
    body: "Thanks for shopping with Northstar Market.\n\nOrder #NM-4821\nTotal: $38.50\nDelivery: Tomorrow, 10 AM–2 PM\n\nThis is an example receipt for the inbox preview.",
    time: "Yesterday",
    date: "Yesterday, 4:28 PM",
    unread: false,
    starred: false,
    folder: "inbox",
    category: "promotions",
    labels: ["Receipts"],
    avatarClassName: "avatar-peach",
  },
  {
    id: "community",
    sender: "dotMercury Community",
    email: "community@example.com",
    subject: "What the community is building",
    preview: "See this week’s projects, questions, and announcements.",
    body: "Hello!\n\nHere is a look at what the dotMercury community has been working on this week. Join the conversation and share what you are building.\n\nSee you there!",
    time: "Yesterday",
    date: "Yesterday, 11:06 AM",
    unread: false,
    starred: false,
    folder: "inbox",
    category: "social",
    labels: [],
    avatarClassName: "avatar-blue",
  },
];

const initialLabels = [
  { id: "personal", name: "Personal", dotClassName: "" },
  { id: "work", name: "Work", dotClassName: "label-dot-1" },
  { id: "receipts", name: "Receipts", dotClassName: "label-dot-2" },
];

const folderTitles = {
  inbox: "Inbox",
  starred: "Starred",
  snoozed: "Snoozed",
  sent: "Sent",
  drafts: "Drafts",
  archive: "Archive",
  trash: "Trash",
};

function Inbox({ initialMessages = demoMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [labels, setLabels] = useState(initialLabels);
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [activeLabel, setActiveLabel] = useState(null);
  const [activeCategory, setActiveCategory] = useState("primary");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(initialMessages[0]?.id ?? null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerInitial, setComposerInitial] = useState({});
  const [notice, setNotice] = useState("");

  const unreadCount = messages.filter(
    (message) => message.folder === "inbox" && message.unread,
  ).length;
  const draftCount = messages.filter(
    (message) => message.folder === "drafts",
  ).length;

  const visibleMessages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return messages.filter((message) => {
      const matchesFolder =
        activeFolder === "starred"
          ? message.starred && message.folder !== "trash"
          : message.folder === activeFolder;
      const matchesLabel =
        activeLabel === null ||
        message.labels?.some(
          (label) =>
            label.toLowerCase() ===
            labels.find((item) => item.id === activeLabel)?.name.toLowerCase(),
        );
      const matchesCategory =
        activeCategory === "all" ||
        (message.category ?? "primary") === activeCategory;
      const searchableText = [
        message.sender,
        message.email,
        message.subject,
        message.preview,
        message.body,
        ...(message.labels ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesFolder &&
        matchesLabel &&
        matchesCategory &&
        (!normalizedSearch || searchableText.includes(normalizedSearch))
      );
    });
  }, [activeCategory, activeFolder, activeLabel, labels, messages, search]);

  const selectedMessage =
    visibleMessages.find((message) => message.id === selectedId) ?? null;

  function showNotice(text) {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function handleFolderChange(folderId) {
    setActiveFolder(folderId);
    setActiveLabel(null);
    setActiveCategory("all");
    setSelectedId(null);
  }

  function handleLabelChange(labelId) {
    setActiveLabel(labelId);
    setActiveCategory("all");
    setSelectedId(null);
  }

  function handleSelectMessage(messageId) {
    setSelectedId(messageId);
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId ? { ...message, unread: false } : message,
      ),
    );
  }

  function updateMessage(messageId, changes) {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId ? { ...message, ...changes } : message,
      ),
    );
  }

  function handleMoveMessage(messageId, folder, confirmation) {
    updateMessage(messageId, { folder });
    setSelectedId(null);
    showNotice(confirmation);
  }

  function handleToggleStar(messageId) {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId
          ? { ...message, starred: !message.starred }
          : message,
      ),
    );
  }

  function handleAddLabel() {
    const name = window.prompt("Name this label:");
    const trimmedName = name?.trim();

    if (!trimmedName) return;

    const exists = labels.some(
      (label) => label.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (exists) {
      showNotice("A label with that name already exists.");
      return;
    }

    const nextLabel = {
      id: `label-${Date.now()}`,
      name: trimmedName,
      dotClassName: `label-dot-${labels.length % 3}`,
    };
    setLabels((currentLabels) => [...currentLabels, nextLabel]);
    showNotice(`Created label “${trimmedName}”.`);
  }

  function openComposer(initial = {}) {
    setComposerInitial(initial);
    setIsComposerOpen(true);
  }

  function handleSend({ to, subject, body }) {
    const now = new Date();
    const newMessage = {
      id: `sent-${Date.now()}`,
      sender: "You",
      email: "you@dotmercury.local",
      to,
      subject,
      preview: body,
      body,
      time: "Just now",
      date: now.toLocaleString(),
      unread: false,
      starred: false,
      folder: "sent",
      category: "primary",
      labels: [],
      avatarClassName: "avatar-ink",
    };
    setMessages((currentMessages) => [newMessage, ...currentMessages]);
    setActiveFolder("sent");
    setActiveLabel(null);
    setActiveCategory("primary");
    setSearch("");
    setSelectedId(newMessage.id);
    setIsComposerOpen(false);
    showNotice("Message sent.");
  }

  function handleReply(message, forward = false) {
    const subject = message.subject
      ? `${forward ? "Fwd" : "Re"}: ${message.subject}`
      : `${forward ? "Fwd" : "Re"}:`;
    openComposer({
      initialTo: forward ? "" : message.email,
      initialSubject: subject,
      initialBody: forward
        ? `\n\n---------- Forwarded message ----------\n${message.body}`
        : "",
    });
  }

  return (
    <main className="inbox-page">
      <Sidebar
        activeFolder={activeFolder}
        activeLabel={activeLabel}
        unreadCount={unreadCount}
        draftCount={draftCount}
        labels={labels}
        onCompose={() => openComposer()}
        onFolderChange={handleFolderChange}
        onLabelChange={handleLabelChange}
        onAddLabel={handleAddLabel}
      />
      <MailList
        title={
          activeLabel
            ? labels.find((label) => label.id === activeLabel)?.name
            : folderTitles[activeFolder]
        }
        messages={visibleMessages}
        selectedId={selectedId}
        search={search}
        activeCategory={activeCategory}
        onSearchChange={setSearch}
        onCategoryChange={setActiveCategory}
        onSelect={handleSelectMessage}
        onToggleStar={handleToggleStar}
        onRefresh={() => showNotice("Mailbox is up to date.")}
      />
      <MailViewer
        message={selectedMessage}
        onArchive={(messageId) =>
          handleMoveMessage(messageId, "archive", "Message archived.")
        }
        onDelete={(messageId) =>
          handleMoveMessage(messageId, "trash", "Message moved to trash.")
        }
        onToggleStar={handleToggleStar}
        onReply={handleReply}
      />

      {notice && (
        <div className="inbox-notice" role="status">
          {notice}
        </div>
      )}
      {isComposerOpen && (
        <MailComposer
          {...composerInitial}
          onSend={handleSend}
          onClose={() => setIsComposerOpen(false)}
        />
      )}
    </main>
  );
}

export default Inbox;