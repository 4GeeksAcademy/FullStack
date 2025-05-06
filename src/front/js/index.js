// Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client"; // 👈 importante para React 18

// Import your styles
import "../styles/index.css";

// Import your main layout
import Layout from "./layout";

// Render the app using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Layout />);
