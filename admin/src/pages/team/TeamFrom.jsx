import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../config";

const TeamForm = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  // ✅ Fetch Single Member (Edit Mode)
  useEffect(() => {
    if (id) {
      fetch(`${config.backendBaseUrl}/api/team`)
        .then((res) => res.json())
        .then((data) => {
          const member = data.find((m) => m._id === id);
          if (member) {
            setName(member.name || "");
            setPosition(member.position || "");
            setBio(member.bio || "");
            setLinkedin(member.linkedin || "");
            setInstagram(member.instagram || "");
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("bio", bio);
    formData.append("linkedin", linkedin);
    formData.append("instagram", instagram);
    if (image) formData.append("image", image);

    try {
      // ✅ FIXED URLs
      const url = id
        ? `${config.backendBaseUrl}/api/team/team-update/${id}`
        : `${config.backendBaseUrl}/api/team/add`;

      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // ✅ Safe JSON Parse
      let data;
      try {
        data = await res.json();
      } catch (err) {
        alert("Server returned invalid response");
        return;
      }

      if (!res.ok) {
        alert(data?.message || "Something went wrong");
        return;
      }

      alert(
        id
          ? "Team Member Updated Successfully"
          : "Team Member Created Successfully"
      );

      navigate("/team-list");
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Server Error. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>{id ? "Edit Team Member" : "Add Team Member"}</h3>

      <form onSubmit={handleSubmit} className="card p-4">
        <input
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-3"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="LinkedIn URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Instagram URL"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setImage(e.target.files[0])}
          required={!id}
        />

        <button className="btn btn-primary">
          {id ? "Update Member" : "Create Member"}
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
