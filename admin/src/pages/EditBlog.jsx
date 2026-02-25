import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [content, setContent] = useState("");
    const [timeDuration, setTimeDuration] = useState("");
    const [imageText, setImageText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorQuote, setAuthorQuote] = useState("");

    const [existingImages, setExistingImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [newImages, setNewImages] = useState([]);

    // 🔹 Fetch blog data
    useEffect(() => {
        fetch(`${config.backendBaseUrl}/api/blogs/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setShortDescription(data.shortDescription);
                setContent(data.content);
                setTimeDuration(data.timeDuration);
                setImageText(data.imageText);
                setAuthorName(data.authorName);
                setAuthorQuote(data.authorQuote);
                setExistingImages(data.images || []);
            });
    }, [id]);

    // 🔹 Remove existing image
    const removeExistingImage = (img) => {
        setImagesToDelete([...imagesToDelete, img]);
        setExistingImages(existingImages.filter(i => i !== img));
    };

    // 🔹 Submit update
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("shortDescription", shortDescription);
        formData.append("content", content);
        formData.append("timeDuration", timeDuration);
        formData.append("imageText", imageText);
        formData.append("authorName", authorName);
        formData.append("authorQuote", authorQuote);

        imagesToDelete.forEach(img => {
            formData.append("imagesToDelete", img);
        });

        for (let i = 0; i < newImages.length; i++) {
            formData.append("images", newImages[i]);
        }

        const res = await fetch(`${config.backendBaseUrl}/api/blogs/${id}`, {
            method: "PUT",
            body: formData
        });

        if (res.ok) {
            alert("Blog Updated Successfully");
            navigate("/blogs");
        } else {
            alert("Update failed");
        }
    };

    return (
        <div className="container mt-5">
            <h3>Edit Blog</h3>

            <form onSubmit={handleUpdate}>

                <input className="form-control mb-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title" />

                <textarea className="form-control mb-2"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Short Description" />

                <textarea className="form-control mb-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content" />

                <input className="form-control mb-2"
                    value={timeDuration}
                    onChange={(e) => setTimeDuration(e.target.value)}
                    placeholder="Reading Time" />

                <input className="form-control mb-2"
                    value={imageText}
                    onChange={(e) => setImageText(e.target.value)}
                    placeholder="Image Caption" />

                <input className="form-control mb-2"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Author Name" />

                <input className="form-control mb-2"
                    value={authorQuote}
                    onChange={(e) => setAuthorQuote(e.target.value)}
                    placeholder="Author Quote" />

                {/* Existing Images */}
                <div className="mb-3">
                    <h6>Existing Images</h6>
                    {existingImages.map((img, i) => (
                        <div key={i} className="d-inline-block me-2 position-relative">
                            <img
                                src={`${config.backendBaseUrl}/${img}`}
                                alt=""
                                width="100"
                                height="80"
                                className="border"
                            />
                            <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                onClick={() => removeExistingImage(img)}
                            >X</button>
                        </div>
                    ))}
                </div>

                {/* Upload new images */}
                <input type="file" multiple className="form-control mb-3"
                    onChange={(e) => setNewImages(e.target.files)} />

                <button className="btn btn-success">Update Blog</button>
            </form>
        </div>
    );
};

export default EditBlog;
