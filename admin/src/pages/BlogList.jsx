import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const fetchBlogs = async () => {
        const res = await fetch(`${config.backendBaseUrl}/api/blogs`);
        const data = await res.json();
        setBlogs(data);
    };

    const deleteBlog = async (id) => {
        if (!window.confirm("Delete this blog?")) return;

        await fetch(`${config.backendBaseUrl}/api/blogs/${id}`, {
            method: "DELETE"
        });

        fetchBlogs();
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // const navigate = useNavigate()

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-4" >
                <h3>Blog List</h3>
                {/* <button className="btn ">Add Blog</button> */}

                <button onClick={() => navigate('/add-blog')} className="btn btn-primary">
                    Add Blog
                </button>

            </div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Images</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog._id}>
                            <td>{blog.title}</td>
                            <td>{blog.authorName}</td>
                            <td>
                                {blog.images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={`${config.backendBaseUrl}/${img}`}
                                        width="60"
                                        alt=""
                                        className="me-2"
                                    />
                                ))}
                            </td>
                            <td>
                                {/* ✅ Edit Button */}
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/edit-blog/${blog._id}`)}
                                >
                                    Edit
                                </button>

                                {/* ✅ Delete Button */}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteBlog(blog._id)}
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

export default BlogList;
