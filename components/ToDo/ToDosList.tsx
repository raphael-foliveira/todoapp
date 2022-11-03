import { ToDo } from "prisma/prisma-client";
import SingleToDo from "./SingleToDo";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

/**Renderiza uma lista de tarefas, assegurando responsividade. */
export default function toDosList({
    toDos,
    setToDos,
}: {
    toDos: ToDo[];
    setToDos: Dispatch<SetStateAction<ToDo[]>>;
}) {
    return (
        <>
            <Box>
                <Heading textAlign={"center"}>Tarefas</Heading>
            </Box>
            <Flex wrap={"wrap"} margin="2em" justifyContent={"center"}>
                {toDos.map((toDo: ToDo) => (
                    <SingleToDo toDo={toDo} key={toDo.id} setToDos={setToDos} />
                ))}
            </Flex>
        </>
    );
}
