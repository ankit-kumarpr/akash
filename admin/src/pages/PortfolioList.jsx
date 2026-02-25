import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

const PortfolioList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const navigate = useNavigate();

    const fetchPortfolios = async () => {
        const res = await fetch(`${config.backendBaseUrl}/api/portfolio`);
        const data = await res.json();
        setPortfolios(data);
    };

    const deletePortfolio = async (id) => {
        if (!window.confirm("Delete this portfolio?")) return;

        const token = localStorage.getItem("token");

        await fetch(`${config.backendBaseUrl}/api/portfolio/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        fetchPortfolios();
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    return (
        <div className="container mt-5">




            <div className="d-flex justify-content-between mb-4" >
                <h3>Portfolio List</h3>
                {/* <button className="btn ">Add Blog</button> */}

                <button onClick={() => navigate('/add-portfolio')} className="btn btn-primary">
                    Add Portfolio
                </button>

            </div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Link</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {portfolios.map(p => (
                        <tr key={p._id}>
                            <td>{p.title}</td>
                            <td>
                                <img
                                    src={`${config.backendBaseUrl}/${p.image}`}
                                    width="80"
                                    alt=""
                                />
                            </td>
                            <td>{p.link}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/edit-portfolio/${p._id}`)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deletePortfolio(p._id)}
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

export default PortfolioList;
