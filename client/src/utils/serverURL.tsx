const serverURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://ai-cover-letters-server.vercel.app/";

export { serverURL };
