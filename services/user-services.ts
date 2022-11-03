import { User } from "prisma/prisma-client";
import { UserWithToDos } from "../components/UserProfile/UserProfile";

const md5 = require("md5");

export const createUser = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    const hashedPassword = md5(password);
    const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: hashedPassword,
        }),
    });
    const newUser = await response.json();
    return newUser;
};

export const authenticateUser = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}): Promise<User | null> => {
    const hashedPassword = md5(password);
    const response = await fetch("/api/autorizar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: hashedPassword,
        }),
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
