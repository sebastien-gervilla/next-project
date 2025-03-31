import './page.scss';
import { FC, Suspense, use } from "react";
import { User } from '@/interfaces';
import { Loader } from '@/components';

const getUsers = async (): Promise<{ body: User[] | string }> => {

    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (response.status !== 200)
        return {
            body: "An error has occured",
        };

    const users = await response.json();

    return {
        body: users,
    };
}

export default async function UsersController() {

    const response = getUsers();

    return (
        <div id="users-page" className="page">
            <Suspense fallback={<Loader />}>
                <UsersPage usersResponse={response} />
            </Suspense>
        </div>
    );
}

interface Props {
    usersResponse: Promise<{ body: User[] | string }>;
}

const UsersPage: FC<Props> = ({ usersResponse }) => {
    "use client";

    const response = use(usersResponse);

    if (typeof response.body === 'string') return (
        <div>
            <p>
                {response.body}
            </p>
        </div>
    );

    const displayedUsers = response.body.map(user => (
        <div
            key={user.id}
            className="user"
        >
            {user.username}
        </div>
    ));

    return (
        <div className="users">
            {displayedUsers}
        </div>
    );
}