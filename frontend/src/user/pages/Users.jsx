import UsersList from "../components/UsersList";

export default function Users() {
    const users = [
        { id: 'u1', name: 'John', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICSVq9-BAcWmscgA5pQyPPxdeJGu6p6w-0Q&s', places: 3 },
        { id: 'u2', name: 'Jane', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXg9k5fHy--R9x2Q8cuvxeQ8TriABt_HJGUQ&s', places: 5 }
    ];


    return <UsersList items={users} />;
}
