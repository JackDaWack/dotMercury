import react, { useState } from 'react';

const CONFIRMATION_PHRASE = "DELETE ACCOUNT";

function DeleteAccount() {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsDeleting(true);

    try {
      const csrfResponse = await fetch("http://localhost:8000/api/csrf", {
        credentials: "include",
      });
      const csrfData = await csrfResponse.json();
      if (!csrfResponse.ok || !csrfData.success || !csrfData.token) {
        throw new Error("Unable to initialize a secure deletion request.");
      }

      const response = await fetch("http://localhost:8000/api/delete_user", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfData.token,
        },
        body: JSON.stringify({ password, confirmation }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.detail || data.message || "Failed to delete account");
      }

      setMessage("Account deleted successfully");
      window.location.href = "/";
    } catch (error) {
      setMessage(error.message || "Unable to delete account.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <form onSubmit={handleDelete}>
        <label htmlFor="password">Current password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <label htmlFor="confirmation">
          Type {CONFIRMATION_PHRASE} to confirm:
        </label>
        <input
          type="text"
          id="confirmation"
          name="confirmation"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          required
          autoComplete="off"
        />
        <button type="submit" disabled={isDeleting}>
          {isDeleting ? "Deleting account..." : "Confirm Delete Account"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default DeleteAccount;