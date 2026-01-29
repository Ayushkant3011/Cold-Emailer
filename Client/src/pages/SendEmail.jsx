import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import EmailPreviewModal from "../components/EmailPreviewModal";

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

  // 🔹 Generate preview body
  const previewBody = selectedTemplate
    ? selectedTemplate.body
        .replace("{{name}}", form.name || "Name")
        .replace("{{company}}", form.company || "Company")
        .replace("{{sender}}", "You")
    : "";

  // 🔹 Schedule email
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
      <Navbar />

      <div style={{ maxWidth: "600px", margin: "30px auto" }}>
        <h2>📧 Send Email</h2>

        <input
          placeholder="Recipient Email"
          onChange={e => setForm({ ...form, to: e.target.value })}
        />

        <select
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
          placeholder="HR Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Company Name"
          onChange={e => setForm({ ...form, company: e.target.value })}
        />

        <input
          type="datetime-local"
          onChange={e => setForm({ ...form, sendAt: e.target.value })}
        />

        {/* Buttons */}
        <div style={{ marginTop: 15 }}>
          <button onClick={() => setShowPreview(true)}>
            Preview Email
          </button>

          <button
            onClick={handleSchedule}
            disabled={loading}
            style={{ marginLeft: 10 }}
          >
            {loading ? "Scheduling..." : "Schedule Email"}
          </button>
        </div>
      </div>

      {/* 🔍 Preview Modal */}
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
