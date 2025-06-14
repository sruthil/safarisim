"use client";
import { useEffect } from "react";
import * as THREE from "three";

export default function Globe() {
  useEffect(() => {
    // Make THREE globally available if globe.js expects it
    (window as any).THREE = THREE;

    // Dynamically import your local globe script
    import("../../utils/js/globe.js").catch((err) =>
      console.error("Failed to load globe.js:", err)
    );
  }, []);

  return null;
}