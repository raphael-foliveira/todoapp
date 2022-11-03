import { ToDo } from "prisma/prisma-client";
import {
    Box,
    Text,
    Heading,
    Flex,
    Button,
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { deleteToDo, updateToDo } from "../../services/todo-services";
import UpdateToDoForm from "../Forms/ToDo/UpdateToDoForm";

/**Renderiza uma única tarefa */
export default function SingleToDo({
    toDo,
    setToDos,
}: {
    toDo: ToDo;
    setToDos: Dispatch<SetStateAction<ToDo[]>>;
}) {
    const [toDoState, setToDoState] = useState<ToDo>(toDo);
    const [boxBg, setBoxBg] = useState<"green.100" | "red.100">();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleRemove = () => {
        deleteToDo(toDo.id);
        setToDos((previousState) => {
            const newState = previousState.filter((element) => element !== toDo);
            return newState;
        });
    };

    const handleCheckboxToggle = () => {
        setToDoState((previousState) => {
            const newState = previousState;
            newState.done = !previousState.done;
            return newState;
        });
        setBoxBg(toDoState.done ? "green.100" : "red.100");
        updateToDo(toDoState);
    };

    useEffect(() => {
        setBoxBg(toDoState.done ? "green.100" : "red.100");
    }, []);

    return (
        <Box
            backgroundColor={boxBg}
            width="300px"
            margin={"1em"}
            padding="1em"
            borderRadius={"15px"}
            boxShadow={"lg"}
        >
            <Box minHeight={"250px"}>
                <Text>
                    <em>
                        <strong> ID: {toDo.id} </strong>{" "}
                    </em>
                </Text>
                <Heading as="h3" fontSize={"2xl"} textAlign="center" margin={"1em"}>
                    {toDoState.name}
                </Heading>
                <Text>{toDoState.description}</Text>
            </Box>
            <Flex justifyContent={"flex-end"} padding="1em">
                <Checkbox
                    onChange={handleCheckboxToggle}
                    width="20%"
                    borderColor={"blue.400"}
                    colorScheme="green"
                    defaultChecked={toDoState.done}
                >
                    Feito
                </Checkbox>
            </Flex>
            <Flex marginTop={"1em"} wrap="wrap" justifyContent={"space-between"}>
                <Button colorScheme={"blue"} onClick={onOpen}>
                    Atualizar
                </Button>
                <Button colorScheme={"red"} onClick={handleRemove}>
                    Remover
                </Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={{base: "xs", lg:"md"}} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <UpdateToDoForm
                        toDoState={toDoState}
                        setToDoState={setToDoState}
                        onClose={onClose}
                    />
                </ModalContent>
            </Modal>
        </Box>
    );
}
