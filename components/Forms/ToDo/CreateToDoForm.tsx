import FormCard from "../../UI/FormCard";
import { Heading } from "@chakra-ui/react";
import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { createToDo } from "../../../services/todo-services";
import { ToDo } from "prisma/prisma-client";
import ToDoForm from "./ToDoForm";
import { ToDoFormState } from "./ToDoForm";

export default function CreateToDoForm({
    toDoAuthor,
    setToDos,
    onClose,
}: {
    toDoAuthor: number;
    setToDos: Dispatch<SetStateAction<ToDo[]>>;
    onClose: () => void;
}) {
    const formInitialState: ToDoFormState = {
        name: "",
        description: "",
    };
    const [formState, setFormState] = useState<ToDoFormState>(formInitialState);

    const handleAddToDo = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newToDo = await createToDo({
            ...formState,
            authorId: toDoAuthor,
        });
        setToDos((previousState) => {
            if (previousState) {
                return [...previousState, newToDo];
            }
            return [newToDo];
        });
        onClose();
    };

    return (
        <FormCard>
            <Heading paddingBottom={"1em"}>Criar nova tarefa</Heading>
            <form action="" onSubmit={handleAddToDo}>
                <ToDoForm formState={formState} setFormState={setFormState} buttonText="Adicionar" />
            </form>
        </FormCard>
    );
}
