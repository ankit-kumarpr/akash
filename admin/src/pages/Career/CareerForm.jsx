import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../config";
// import config from "../config";

const CareerForm = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); // for edit

  const token = localStorage.getItem("token");

  // Fetch job if editing
  useEffect(() => {
    if (id) {
      fetch(`${config.backendBaseUrl}/api/career`)
        .then(res => res.json())
        .then(data => {
          const job = data.find(j => j._id === id);
          if (job) {
            setJobTitle(job.jobTitle);
            setDescription(job.description);
            setLocation(job.location);
            setExperience(job.experience);
            setSalary(job.salary);
          }
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = { jobTitle, description, location, experience, salary };

    const url = id
      ? `${config.backendBaseUrl}/api/career/${id}`
      : `${config.backendBaseUrl}/api/career`;

    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert(id ? "Job Updated" : "Job Created");
    navigate("/career-list");
  };

  return (
    <div className="container mt-5">
      <h3>{id ? "Edit Job" : "Add Job"}</h3>

      <form onSubmit={handleSubmit} className="card p-4">

        <input className="form-control mb-3" placeholder="Job Title"
          value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />

        <textarea className="form-control mb-3" placeholder="Description"
          value={description} onChange={e => setDescription(e.target.value)} required />

        <input className="form-control mb-3" placeholder="Location"
          value={location} onChange={e => setLocation(e.target.value)} required />

        <input className="form-control mb-3" placeholder="Experience"
          value={experience} onChange={e => setExperience(e.target.value)} required />

        <input className="form-control mb-3" placeholder="Salary"
          value={salary} onChange={e => setSalary(e.target.value)} required />

        <button className="btn btn-primary">
          {id ? "Update Job" : "Create Job"}
        </button>

      </form>
    </div>
  );
};

export default CareerForm;
