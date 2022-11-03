import FormCard from "../../UI/FormCard";
import { Heading } from "@chakra-ui/react";
import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { updateToDo } from "../../../services/todo-services";
import { ToDo } from "prisma/prisma-client";
import ToDoForm from "./ToDoForm";

/**Formulário para atualização de tarefa.
 * Utiliza o formulário genérico (ToDoForm) mas possui uma função própria 
 * para lidar com a submissão das informações.
 */
type UpdateToDoFormState = {
    name: string;
    description: string;
};

export default function UpdateToDoForm({
    toDoState,
    setToDoState,
    onClose,
}: {
    toDoState: ToDo;
    setToDoState: Dispatch<SetStateAction<ToDo>>;
    onClose: () => void;
}) {
    const formInitialState: UpdateToDoFormState = {
        name: toDoState.name,
        description: toDoState.description,
    };
    const [formState, setFormState] = useState<UpdateToDoFormState>(formInitialState);

    const handleUpdateToDo = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedToDo = await updateToDo({
            id: toDoState.id,
            name: formState.name,
            description: formState.description,
            authorId: toDoState.authorId,
            done: toDoState.done,
        });
        setToDoState(updatedToDo);
        onClose();
    };

    return (
        <FormCard>
            <Heading paddingBottom={"1em"}>Atualizar tarefa</Heading>
            <form action="" onSubmit={handleUpdateToDo}>
                <ToDoForm formState={formState} setFormState={setFormState} buttonText="Atualizar" />
            </form>
        </FormCard>
    );
}
