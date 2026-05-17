// central configuration values
// export const API_BASE = "/api/v1";
'use client'; 

// src/app/config.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '/api/v1';

// export const API_BASE = "https://YOUR-BACKEND-URL.onrender.com/api/v1";   // ← full URL
