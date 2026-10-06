import { useState } from 'react';

function SetNewPassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const csrfResponse = await fetch("http://localhost:8000/api/csrf", {
        credentials: "include",
      });
      const csrfData = await csrfResponse.json();
      if (!csrfResponse.ok || !csrfData.success || !csrfData.token) {
        throw new Error("Unable to initialize a secure password change.");
      }

      const response = await fetch("http://localhost:8000/api/change_password", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfData.token,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.detail || data.message || "Failed to change password");
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setMessage(data.message || "Password changed successfully");
    } catch (error) {
      setMessage(error.message || "Unable to change password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Password Settings</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="current-password">Current password:</label>
        <input
          type="password"
          id="current-password"
          name="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
          autoComplete="current-password"
        />
        <label htmlFor="new-password">New password:</label>
        <input
          type="password"
          id="new-password"
          name="new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
          autoComplete="new-password"
        />
        <label htmlFor="confirm-new-password">Confirm new password:</label>
        <input
          type="password"
          id="confirm-new-password"
          name="confirm-new-password"
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.target.value)}
          required
          autoComplete="new-password"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Changing password..." : "Confirm New Password"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default SetNewPassword;