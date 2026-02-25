import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const TeamList = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchMembers = async () => {
    const res = await fetch(`${config.backendBaseUrl}/api/team`);
    const data = await res.json();
    setMembers(data);
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    await fetch(`${config.backendBaseUrl}/api/team/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between mb-4">
        <h3>Team Members</h3>
        <button className="btn btn-primary"
          onClick={() => navigate("/team-form")}>
          Add Member
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {members.map(member => (
            <tr key={member._id}>
              <td>
                <img
                  src={`${config.backendBaseUrl}/${member.image}`}
                  alt=""
                  width="60"
                />
              </td>
              <td>{member.name}</td>
              <td>{member.position}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/team-form/${member._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteMember(member._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default TeamList;