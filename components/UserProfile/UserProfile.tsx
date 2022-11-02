import { Heading } from "@chakra-ui/react";
import {
    Button,
    Spinner,
    Box,
    Flex,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToDo, User } from "prisma/prisma-client";
import CreateToDoForm from "../Forms/ToDo/CreateToDoForm";
import ToDosList from "../../components/ToDo/ToDosList";
import { getUserInfo } from "../../services/user-services";
import Head from "next/head";

export interface UserWithToDos extends User {
    toDos: ToDo[];
}

export default function UserProfile() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserWithToDos>();
    const [toDos, setToDos] = useState<ToDo[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchUserInfo = async () => {
        const authenticatedUserId = localStorage.getItem("userId");
        if (authenticatedUserId) {
            const dbUserInfo = await getUserInfo(authenticatedUserId);
            setUserInfo(dbUserInfo);
            setToDos(dbUserInfo.toDos);
            localStorage.setItem("tarefas", JSON.stringify(dbUserInfo.toDos));
        } else {
            router.push("/login", "/login?error=nao-autenticado");
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleSignOut = () => {
        localStorage.clear();
        router.push("/");
    };

    return (
        <Box>
            <Head>
                <title>Lista de Tarefas</title>
            </Head>
            <Flex justifyContent={"flex-end"} padding="1em">
                <Button onClick={handleSignOut} colorScheme="blue">
                    Sair
                </Button>
            </Flex>
            {userInfo ? (
                <Box>
                    <Heading textAlign={"center"} margin="2em 0 1em">
                        Bem vindo {userInfo.username}
                    </Heading>
                    <Flex justifyContent="center" marginBottom={"3em"}>
                        <Button colorScheme={"blue"} onClick={onOpen}>
                            Criar nova tarefa
                        </Button>
                    </Flex>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalCloseButton />
                            <CreateToDoForm
                                toDoAuthor={userInfo.id}
                                setToDos={setToDos}
                                onClose={onClose}
                            />
                        </ModalContent>
                    </Modal>
                    {toDos && toDos.length > 0 ? (
                        <ToDosList toDos={toDos} setToDos={setToDos} />
                    ) : null}
                </Box>
            ) : (
                <Center marginTop="40vh">
                    <Spinner />
                </Center>
            )}
        </Box>
    );
}
