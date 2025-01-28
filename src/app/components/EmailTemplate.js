"use client";

import { useState, useEffect } from "react";

export default function EmailForm() {
  const [formData, setFormData] = useState({
    recipientName: "",
    emailPurpose: "Meeting Request",
    keyPoints: "",
  });

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGeneratedEmail("");

    try {
      const res = await fetch("/pages/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        const generatedEmail = data.generatedEmail
        setGeneratedEmail(generatedEmail);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to generate email.");
    }
  };
  return(
    <>
       <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Generate a Professional Email</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email Purpose</label>
          <select
            name="emailPurpose"
            value={formData.emailPurpose}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Meeting Request">Meeting Request</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Thank You">Thank You</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Key Points</label>
          <textarea
            name="keyPoints"
            value={formData.keyPoints}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Generate Email
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {generatedEmail && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Generated Email:</h2>
          <p>{generatedEmail}</p>
        </div>
      )}
    </div>
    </>
  )
  };