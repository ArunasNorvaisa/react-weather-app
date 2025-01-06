import { createRoot } from "react-dom/client";
import App from "./components/App";
import Store from "./components/Store";

createRoot(document.getElementById("app")).render(
  <Store>
    <App />
  </Store>,
);
