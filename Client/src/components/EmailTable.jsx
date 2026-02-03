import { motion } from "framer-motion";

function EmailTable({ emails }) {
  if (!emails.length) {
    return <div className="empty-state">No emails scheduled yet.</div>;
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
            <motion.tr
              key={email._id}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.25)" }}
              transition={{ duration: 0.2 }}
            >
              <td>{email.to}</td>
              <td>
                <span className={`status ${email.status}`}>
                  {email.status}
                </span>
              </td>
              <td>{email.retryCount}</td>
              <td>{new Date(email.sendAt).toLocaleString()}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailTable;
