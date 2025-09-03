import { useLoaderData, useNavigation } from "react-router-dom";
import UsersList from "../components/UsersList";

export default function Users() {
    const users = useLoaderData();

    return <UsersList items={users} />;
}

export async function loader() {
    const response = await fetch("http://localhost:3000/api/users");
    
    if (!response.ok) {
        throw new Response("Failed to fetch users", { status: response.status });
    }

    const responseData = await response.json();
    return responseData.users || [];
}
