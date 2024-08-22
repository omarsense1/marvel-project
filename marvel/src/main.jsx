import { createRoot } from "react-dom/client";
import App from "./components/app/App.jsx";

import "./style/style.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
