import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function SendEmail() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [form, setForm] = useState({
    to: "",
    name: "",
    company: "",
    sendAt: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/templates")
      .then(res => setTemplates(res.data));
  }, []);

  const previewBody = selectedTemplate
    ? selectedTemplate.body
        .replace("{{name}}", form.name || "Name")
        .replace("{{company}}", form.company || "Company")
        .replace("{{sender}}", "You")
    : "";

  const handleSchedule = async () => {
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

    alert("Email Scheduled Successfully!");
  };

  return (
    <div>
      <Navbar/>
      <h2>Send Email</h2>

      <input
        placeholder="Recipient Email"
        onChange={e => setForm({ ...form, to: e.target.value })}
      />

      <select onChange={e => {
        const temp = templates.find(t => t._id === e.target.value);
        setSelectedTemplate(temp);
      }}>
        <option>Select Role</option>
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
        placeholder="Company"
        onChange={e => setForm({ ...form, company: e.target.value })}
      />

      <input
        type="datetime-local"
        onChange={e => setForm({ ...form, sendAt: e.target.value })}
      />

      {/* 🔍 EMAIL PREVIEW */}
      <h3>Email Preview</h3>
      <div style={{
        border: "1px solid gray",
        padding: "10px",
        marginTop: "10px"
      }}>
        <b>Subject:</b> {selectedTemplate?.subject}
        <hr />
        <pre>{previewBody}</pre>
      </div>

      <button onClick={handleSchedule}>
        Schedule Email
      </button>
    </div>
  );
}

export default SendEmail;
