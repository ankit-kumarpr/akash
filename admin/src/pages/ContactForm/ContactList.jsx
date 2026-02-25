import React, { useEffect, useState } from "react";
import config from "../../config";
import { useNavigate } from "react-router-dom";
// import config from "../config";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const token = localStorage.getItem("token");

    const fetchContacts = async () => {
        const res = await fetch(`${config.backendBaseUrl}/api/contact`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        setContacts(data);
    };

    const deleteMessage = async (id) => {
        if (!window.confirm("Delete this message?")) return;

        await fetch(`${config.backendBaseUrl}/api/contact/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        fetchContacts();
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const navigate = useNavigate()


    return (
        <div className="container mt-5">



            <div className="d-flex justify-content-between mb-4" >
                <h3>Contact Messages</h3>
                {/* <button className="btn ">Add Blog</button> */}

                <button onClick={() => navigate('/contact')} className="btn btn-primary">
                    Add Contact
                </button>

            </div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {contacts.map((c) => (
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.message}</td>
                            <td>{new Date(c.createdAt).toLocaleString()}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteMessage(c._id)}
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

export default ContactList;
