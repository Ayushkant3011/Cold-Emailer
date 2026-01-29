function EmailPreviewModal({ subject, body, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Email Preview</h3>
        <p><b>Subject:</b> {subject}</p>
        <hr />
        <pre>{body}</pre>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    background: "#fff",
    padding: 20,
    width: "60%",
    borderRadius: 8
  }
};

export default EmailPreviewModal;
