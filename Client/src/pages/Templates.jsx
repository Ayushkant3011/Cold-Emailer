    import { useEffect, useState } from "react";
import axios from "axios";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({
    role: "",
    subject: "",
    body: ""
  });

  const token = localStorage.getItem("token");

  const fetchTemplates = () => {
    axios.get("http://localhost:5000/api/templates")
      .then(res => setTemplates(res.data));
  };

  useEffect(fetchTemplates, []);

  const addTemplate = async () => {
    await axios.post(
      "http://localhost:5000/api/templates",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchTemplates();
    setForm({ role: "", subject: "", body: "" });
  };

  return (
    <div>
      <h2>Email Templates</h2>

      <input placeholder="Role"
        onChange={e => setForm({ ...form, role: e.target.value })} />

      <input placeholder="Subject"
        onChange={e => setForm({ ...form, subject: e.target.value })} />

      <textarea placeholder="Body"
        onChange={e => setForm({ ...form, body: e.target.value })} />

      <button onClick={addTemplate}>Add Template</button>

      <hr />

      {templates.map(t => (
        <div key={t._id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <h4>{t.role}</h4>
          <p><b>{t.subject}</b></p>
          <pre>{t.body}</pre>
        </div>
      ))}
    </div>
  );
}

export default Templates;
