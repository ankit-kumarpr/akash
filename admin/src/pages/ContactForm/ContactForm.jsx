import React, { useState } from "react";
import config from "../../config";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState(""); // ✅ added
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${config.backendBaseUrl}/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                contactNumber, // ✅ added
                message
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        alert("Message sent successfully");
        setName("");
        setEmail("");
        setContactNumber(""); // ✅ reset
        setMessage("");
    };

    return (
        <div className="container mt-5">
            <h3>Contact Us</h3>

            <form onSubmit={handleSubmit} className="card p-4">

                <input
                    className="form-control mb-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* ✅ Contact Number */}
                <input
                    type="tel"
                    className="form-control mb-3"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                />

                <textarea
                    className="form-control mb-3"
                    placeholder="Message"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button className="btn btn-primary">Send Message</button>
            </form>
        </div>
    );
};

export default ContactForm;
