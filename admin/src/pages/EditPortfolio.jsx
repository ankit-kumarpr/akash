import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config";

const EditPortfolio = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState("");

    useEffect(() => {
        fetch(`${config.backendBaseUrl}/api/portfolio`)
            .then(res => res.json())
            .then(data => {
                const portfolio = data.find(p => p._id === id);
                setTitle(portfolio.title);
                setDescription(portfolio.description);
                setLink(portfolio.link);
                setOldImage(portfolio.image);
            });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("link", link);
        if (image) formData.append("image", image);

        const res = await fetch(`${config.backendBaseUrl}/api/portfolio/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (res.ok) {
            alert("Portfolio Updated");
            navigate("/portfolio");
        } else {
            alert("Update failed");
        }
    };

    return (
        <div className="container mt-5">
            <h3>Edit Portfolio</h3>

            <form onSubmit={handleUpdate}>
                <input className="form-control mb-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <textarea className="form-control mb-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />

                <input className="form-control mb-2"
                    value={link}
                    onChange={(e) => setLink(e.target.value)} />

                <div className="mb-2">
                    <img src={`${config.backendBaseUrl}/${oldImage}`} width="120" alt="" />
                </div>

                <input type="file" className="form-control mb-3"
                    onChange={(e) => setImage(e.target.files[0])} />

                <button className="btn btn-success">Update Portfolio</button>
            </form>
        </div>
    );
};

export default EditPortfolio;
