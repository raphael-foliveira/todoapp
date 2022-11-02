import { User } from "prisma/prisma-client";
import { UserWithToDos } from "../components/UserProfile/UserProfile";

export const createUser = async (userInfo: { username: string; password: string }) => {
    const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
    const newUser = await response.json();
    return newUser;
};

export const authenticateUser = async (providedCredentials: {
    username: string;
    password: string;
}): Promise<User | null> => {
    const response = await fetch("/api/autorizar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(providedCredentials),
    });
    if (response.status === 401) {
        return null;
    }
    const authenticationInfo = await response.json();
    return authenticationInfo;
};

export const getUserInfo = async (userId: string): Promise<UserWithToDos> => {
    const response = await fetch(`/api/usuarios/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const userInfo = await response.json();
    return userInfo;
};
