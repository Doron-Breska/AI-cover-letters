const serverURL =
  import.meta.env.VITE_APP_ENV === "development"
    ? "http://localhost:5001"
    : "http://new-ai-cover-letters-server.vercel.app";

export { serverURL };
