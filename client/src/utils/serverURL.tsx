const serverURL =
  import.meta.env.VITE_APP_ENV === "development"
    ? "http://localhost:5001"
    : "https://ai-cover-letters-virid.vercel.app/";

export { serverURL };
