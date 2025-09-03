import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./ErrorPage.css";
import MainNavigation from "../Navigation/MainNavigation";


export default function ErrorPage() {
    const error = useRouteError();

    let status = 500;
    let message = "Something went wrong!";

    if (isRouteErrorResponse(error)) {
        status = error.status;
        message = error.data || "Unexpected Error"
    }
    else if (error instanceof Error) {
        message = error.message
    }
    return (
        <>
            <MainNavigation />
            <div className="error-container">
                <h1 className="error-title">Error {status}</h1>
                <p className="error-message">{message}</p>
            </div>
        </>
    )
}
