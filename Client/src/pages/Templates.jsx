import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./templates.css";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({
    role: "",
    subject: "",
    body: ""
  });

  const token = localStorage.getItem("token");

  const fetchTemplates = () => {
    axios
      .get("http://localhost:5000/api/templates")
      .then(res => setTemplates(res.data));
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const addTemplate = async () => {
    if (!form.role || !form.subject || !form.body) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/templates",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchTemplates();
    setForm({ role: "", subject: "", body: "" });
  };

  return (
    <>
      <Navbar />

      <div className="templates-page">
        <h1 className="templates-title">Email Templates</h1>

        {/* ADD TEMPLATE FORM */}
        <div className="template-form">
          <input
            placeholder="Role (e.g. Frontend Developer)"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          />

          <input
            placeholder="Email Subject"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
          />

          <textarea
            placeholder="Email Body (use {{name}}, {{company}}, {{sender}})"
            value={form.body}
            onChange={e => setForm({ ...form, body: e.target.value })}
          />

          <button onClick={addTemplate}>Add Template</button>
        </div>

        {/* TEMPLATE LIST */}
        <div className="template-list">
          {templates.length === 0 && (
            <div className="templates-empty">
              No templates created yet.
            </div>
          )}

          {templates.map(t => (
            <div key={t._id} className="template-card">
              <div className="template-role">{t.role}</div>

              <div className="template-subject">
                {t.subject}
              </div>

              <div className="template-divider" />

              <div className="template-body">
                {t.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Templates;
