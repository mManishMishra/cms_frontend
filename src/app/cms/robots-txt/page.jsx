"use client";
import React, { useState, useEffect } from "react";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout"; // Ensure this path is correct
import { FaSave, FaCheckCircle, FaExclamationTriangle, FaRobot } from "react-icons/fa";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999";

export default function RobotsTxtManager() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const defaultRobots = `User-agent: *
Disallow: /dashboard
Disallow: /login
Disallow: .staging.
Disallow: /privacy-policy
Disallow: /term-and-condition
Disallow:/cancelletion-policy
Allow: /
Sitemap: https://hcinterior.in/sitemap.xml`;

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/robots-txt`);
        if (res.ok) {
          const data = await res.json();
          setContent(data.content || defaultRobots);
        } else {
          setContent(defaultRobots);
        }
      } catch (error) {
        console.error("Failed to fetch robots.txt", error);
        setContent(defaultRobots);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRobots();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await fetch(`${API_BASE_URL}/robots-txt`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include your auth token here if your backend requires it:
          // "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        setMessage({ text: "Robots.txt updated successfully!", type: "success" });
      } else {
        setMessage({ text: "Failed to update. Please try again.", type: "error" });
      }
    } catch (error) {
      console.error("Save error:", error);
      setMessage({ text: "An error occurred while saving.", type: "error" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 4000);
    }
  };

  return (
    <AuthMainLayout>
      <div className="container-fluid my-5">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="h3 mb-1 text-gray-800 d-flex align-items-center gap-2">
                  <FaRobot className="text-primary" /> Robots.txt Editor
                </h1>
                <p className="text-muted mb-0 small">Manage your site&apos;s search engine crawling rules.</p>
              </div>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn btn-primary px-4 py-2 shadow-sm fw-bold d-flex align-items-center gap-2"
              >
                {isSaving ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  <FaSave />
                )}
                {isSaving ? "Saving..." : "Save Configuration"}
              </button>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            ) : (
              <>
                {/* Warning Alert */}
                <div className="alert alert-warning d-flex align-items-center shadow-sm" role="alert">
                  <FaExclamationTriangle className="fs-4 me-3 text-warning" />
                  <div>
                    <strong>Exercise Caution:</strong> Incorrect configurations in your <code>robots.txt</code> file can block search engines from indexing your site, causing a drop in traffic. Ensure your syntax is correct.
                  </div>
                </div>

                {/* Success/Error Message */}
                {message.text && (
                  <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center shadow-sm`} role="alert">
                    {message.type === 'success' ? <FaCheckCircle className="fs-5 me-2" /> : <FaExclamationTriangle className="fs-5 me-2" />}
                    <strong>{message.text}</strong>
                  </div>
                )}

                {/* Code Editor Section */}
                <div className="mt-4 rounded overflow-hidden shadow-sm" style={{ border: "1px solid #444", backgroundColor: "#1e1e1e" }}>
                  
                  {/* Editor "Mac" Header */}
                  <div className="px-3 py-2 d-flex align-items-center border-bottom" style={{ backgroundColor: "#2d2d2d", borderColor: "#444" }}>
                    <div className="d-flex gap-2">
                      <div className="rounded-circle" style={{ width: "12px", height: "12px", backgroundColor: "#ff5f56" }}></div>
                      <div className="rounded-circle" style={{ width: "12px", height: "12px", backgroundColor: "#ffbd2e" }}></div>
                      <div className="rounded-circle" style={{ width: "12px", height: "12px", backgroundColor: "#27c93f" }}></div>
                    </div>
                    <div className="ms-3 text-muted font-monospace small" style={{ fontSize: "0.85rem" }}>
                      ~/public/robots.txt
                    </div>
                  </div>

                  {/* Text Area */}
                  <textarea
                    className="w-100 border-0 p-4 font-monospace"
                    style={{
                      height: "500px",
                      backgroundColor: "#1e1e1e",
                      color: "#d4d4d4",
                      fontSize: "15px",
                      lineHeight: "1.6",
                      resize: "vertical",
                      outline: "none",
                      boxShadow: "none"
                    }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    spellCheck="false"
                    placeholder="User-agent: *\nAllow: /"
                  />
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </AuthMainLayout>
  );
}