import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
// import config from "../config";

const CareerList = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchJobs = async () => {
        const res = await fetch(`${config.backendBaseUrl}/api/career`);
        const data = await res.json();
        setJobs(data);
    };

    const deleteJob = async (id) => {
        if (!window.confirm("Delete this job?")) return;

        await fetch(`${config.backendBaseUrl}/api/career/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        fetchJobs();
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="container mt-5">
            {/* <h3>Career Jobs</h3>

            <button className="btn btn-success mb-3"
                onClick={() => navigate("/career-form")}>
                Add Job
            </button> */}


            <div className="d-flex justify-content-between mb-4" >
                <h3>Career Jobs</h3>
                {/* <button className="btn ">Add Blog</button> */}

                {/* <button onClick={() => navigate('/add-blog')} className="btn btn-primary">
                    Add Blog
                </button> */}

                <button className="btn btn-primary mb-4"
                    onClick={() => navigate("/career-form")}>
                    Add Job
                </button>

            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Location</th>
                        <th>Experience</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {jobs.map(job => (
                        <tr key={job._id}>
                            <td>{job.jobTitle}</td>
                            <td>{job.location}</td>
                            <td>{job.experience}</td>
                            <td>{job.salary}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/career-form/${job._id}`)}>
                                    Edit
                                </button>

                                <button className="btn btn-danger btn-sm"
                                    onClick={() => deleteJob(job._id)}>
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

export default CareerList;
