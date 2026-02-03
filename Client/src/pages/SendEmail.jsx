import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import EmailPreviewModal from "../components/EmailPreviewModal";
import LiquidBlobs from "../components/LiquidBlobs";

function SendEmail() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [form, setForm] = useState({
    to: "",
    name: "",
    company: "",
    sendAt: ""
  });

  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/templates")
      .then(res => setTemplates(res.data));
  }, []);

  const previewBody = selectedTemplate
    ? selectedTemplate.body
        .replace("{{name}}", form.name || "Name")
        .replace("{{company}}", form.company || "Company")
        .replace("{{sender}}", "You")
    : "";

  const handleSchedule = async () => {
    if (!form.to || !selectedTemplate || !form.sendAt) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/schedule",
        {
          to: form.to,
          subject: selectedTemplate.subject,
          body: previewBody,
          sendAt: form.sendAt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Email scheduled successfully!");
      setShowPreview(false);
    } catch (err) {
      alert("❌ Failed to schedule email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LiquidBlobs />
      <Navbar />

      <div className="page send-page">
        <div className="send-card">
          <h1 className="send-title">📨 Send Email</h1>

          <div className="send-grid">
            <input
              className="glass-input"
              placeholder="Recipient Email"
              onChange={e => setForm({ ...form, to: e.target.value })}
            />

            <select
              className="glass-input"
              onChange={e => {
                const temp = templates.find(t => t._id === e.target.value);
                setSelectedTemplate(temp);
              }}
            >
              <option value="">Select Role</option>
              {templates.map(t => (
                <option key={t._id} value={t._id}>
                  {t.role}
                </option>
              ))}
            </select>

            <input
              className="glass-input"
              placeholder="HR Name"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="glass-input"
              placeholder="Company Name"
              onChange={e => setForm({ ...form, company: e.target.value })}
            />

            <input
              type="datetime-local"
              className="glass-input"
              onChange={e => setForm({ ...form, sendAt: e.target.value })}
            />
          </div>

          <div className="send-actions">
            <button
              className="glass-btn secondary"
              onClick={() => setShowPreview(true)}
            >
              Preview Email
            </button>

            <button
              className="glass-btn primary"
              onClick={handleSchedule}
              disabled={loading}
            >
              {loading ? "Scheduling..." : "Schedule Email"}
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <EmailPreviewModal
          subject={selectedTemplate?.subject}
          body={previewBody}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}

export default SendEmail;
