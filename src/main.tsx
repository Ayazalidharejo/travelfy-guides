import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { setupFaviconLoader, faviconLoader } from "./utils/faviconLoader";

// 🎯 Initialize dynamic favicon loader
setupFaviconLoader();

// Show loading favicon immediately
faviconLoader.showLoading();

createRoot(document.getElementById("root")!).render(<App />);

// Set static favicon after app renders
setTimeout(() => {
  faviconLoader.setStatic();
}, 100);
