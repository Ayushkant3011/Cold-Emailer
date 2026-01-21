import { useEffect, useState } from "react";
import axios from "axios";

function SendEmail() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [form, setForm] = useState({
    to: "",
    name: "",
    company: "",
    sendAt: ""
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/templates")
      .then(res => setTemplates(res.data));
  }, []);

  const handleTemplateChange = (id) => {
    const temp = templates.find(t => t._id === id);
    setSelectedTemplate(temp);
  };

  const handleSubmit = async () => {
    const body = selectedTemplate.body
      .replace("{{name}}", form.name)
      .replace("{{company}}", form.company)
      .replace("{{sender}}", "Ayush");

    await axios.post("http://localhost:5000/api/schedule", {
      to: form.to,
      subject: selectedTemplate.subject,
      body,
      sendAt: form.sendAt,
      userEmail: "your@gmail.com",
      userPass: "your-app-password"
    });

    alert("Email scheduled!");
  };

  return (
    <div>
      <h2>Schedule Email</h2>

      <input placeholder="HR Email" onChange={e => setForm({...form, to: e.target.value})} />

      <select onChange={e => handleTemplateChange(e.target.value)}>
        <option>Select Role</option>
        {templates.map(t => (
          <option key={t._id} value={t._id}>
            {t.role}
          </option>
        ))}
      </select>

      <input placeholder="HR Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Company" onChange={e => setForm({...form, company: e.target.value})} />

      <input type="datetime-local"
        onChange={e => setForm({...form, sendAt: e.target.value})}
      />

      <button onClick={handleSubmit}>Schedule Email</button>
    </div>
  );
}

export default SendEmail;
