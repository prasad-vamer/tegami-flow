import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
// Import i18n config
import "./i18n/config"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
