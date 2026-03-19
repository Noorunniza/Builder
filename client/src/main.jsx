import React from "react"
import ReactDOM from "react-dom/client"
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from "./App.jsx"

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>
        <GoogleOAuthProvider clientId="404447211974-qurlqkolqrfe4nclaevqktiqrraut599.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>

)