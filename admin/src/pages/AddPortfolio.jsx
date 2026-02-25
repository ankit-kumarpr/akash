import React, { useState } from "react";
import config from "../config";

const AddPortfolio = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("image", image);

    const res = await fetch(`${config.backendBaseUrl}/api/portfolio`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      alert("Portfolio Created");
      setTitle("");
      setDescription("");
      setLink("");
      setImage(null);
    } else {
      alert("Error creating portfolio");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add Portfolio</h3>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Title"
          value={title} onChange={(e)=>setTitle(e.target.value)} />

        <textarea className="form-control mb-2" placeholder="Description"
          value={description} onChange={(e)=>setDescription(e.target.value)} />

        <input className="form-control mb-2" placeholder="Project Link"
          value={link} onChange={(e)=>setLink(e.target.value)} />

        <input type="file" className="form-control mb-3"
          onChange={(e)=>setImage(e.target.files[0])} />

        <button className="btn btn-primary">Add Portfolio</button>
      </form>
    </div>
  );
};

export default AddPortfolio;
