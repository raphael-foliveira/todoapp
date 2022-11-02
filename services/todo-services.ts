import { ToDo } from "prisma/prisma-client";

export async function createToDo(newToDoInfo: {
    name: string;
    description: string;
    authorId: number;
}) {
    const response = await fetch("/api/tarefas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newToDoInfo),
    });
    const newToDo = await response.json();
    return newToDo;
}

export async function deleteToDo(toDoId: number) {
    const response = await fetch(`/api/tarefas/${toDoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const deletedToDo = await response.json();
    return deletedToDo;
}

export async function updateToDo(toDo: ToDo) {
    const response = await fetch(`/api/tarefas/${toDo.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(toDo),
    });
    const updatedToDo = await response.json();
    return updatedToDo;
}
