function EmailPreviewModal({ subject, body, onClose }) {
  return (
    <div className="preview-overlay">
      <div className="preview-modal">
        <h3>Email Preview</h3>

        <p>
          <strong>Subject:</strong> {subject}
        </p>

        <hr />

        <pre>{body}</pre>

        <div style={{ textAlign: "right" }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EmailPreviewModal;
