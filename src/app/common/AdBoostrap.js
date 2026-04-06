"use client";

import { useEffect } from "react";

export default function AddBootstrap() {
  useEffect(() => {
    // Import the bundle
    import("bootstrap/dist/js/bootstrap.bundle.js").then(() => {
      // Initialize Tooltips once Bootstrap is loaded
      const tooltipTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    });
  }, []);

  return <></>;
}