function EmailTable({ emails }) {
  if (!emails.length) {
    return (
      <div className="empty-state">
        No emails scheduled yet.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="email-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Retries</th>
            <th>Scheduled At</th>
          </tr>
        </thead>
        <tbody>
          {emails.map(email => (
            <tr key={email._id}>
              <td>{email.to}</td>
              <td>
                <span className={`status ${email.status}`}>
                  {email.status}
                </span>
              </td>
              <td>{email.retryCount}</td>
              <td>{new Date(email.sendAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailTable;
