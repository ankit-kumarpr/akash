import React, { useState } from "react";
import config from "../config";

const AddBlog = () => {
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [content, setContent] = useState("");
    const [timeDuration, setTimeDuration] = useState("");
    const [imageText, setImageText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorQuote, setAuthorQuote] = useState("");
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("shortDescription", shortDescription);
        formData.append("content", content);
        formData.append("timeDuration", timeDuration);
        formData.append("imageText", imageText);
        formData.append("authorName", authorName);
        formData.append("authorQuote", authorQuote);

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        const res = await fetch(`${config.backendBaseUrl}/api/blogs`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        alert("Blog Created Successfully");
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <h3>Add Blog</h3>

            <form onSubmit={handleSubmit} encType="multipart/form-data">

                <input className="form-control mb-2" placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)} />

                <textarea className="form-control mb-2" placeholder="Short Description"
                    onChange={(e) => setShortDescription(e.target.value)} />

                <textarea className="form-control mb-2" placeholder="Content"
                    onChange={(e) => setContent(e.target.value)} />

                <input className="form-control mb-2" placeholder="Reading Time"
                    onChange={(e) => setTimeDuration(e.target.value)} />

                <input className="form-control mb-2" placeholder="Image Caption"
                    onChange={(e) => setImageText(e.target.value)} />

                <input className="form-control mb-2" placeholder="Author Name"
                    onChange={(e) => setAuthorName(e.target.value)} />

                <input className="form-control mb-2" placeholder="Author Quote"
                    onChange={(e) => setAuthorQuote(e.target.value)} />

                <input type="file" multiple className="form-control mb-3"
                    onChange={(e) => setImages(e.target.files)} />

                <button className="btn btn-primary">Create Blog</button>

            </form>
        </div>
    );
};

export default AddBlog;
