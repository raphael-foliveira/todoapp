import {
    Heading,
    FormControl,
    Stack,
    Input,
    FormLabel,
    Button,
    Text,
    Link,
    Flex,
    Box,
} from "@chakra-ui/react";
import FormCard from "../UI/FormCard";
import { ChangeEvent, FormEvent, useState } from "react";
import { authenticateUser } from "../../services/user-services";
import { useRouter } from "next/router";
import Head from "next/head";

type LoginFormState = {
    username: string;
    password: string;
    formIsValid: boolean;
};

export default function LoginForm() {
    const formInitialState: LoginFormState = {
        username: "",
        password: "",
        formIsValid: true,
    };
    const [formState, setFormState] = useState<LoginFormState>(formInitialState);
    const router = useRouter();

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState((previousState: LoginFormState) => {
            return {
                ...previousState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await authenticateUser(formState);
        if (!user) {
            setFormState((previousState) => {
                return {
                    ...previousState,
                    formIsValid: false,
                };
            });
            return;
        }
        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);
        localStorage.setItem("userId", user.id.toString());
        localStorage.setItem("authenticated", "true");
        router.push("/tarefas");
    };

    return (
        <>
        <Head>
            <title>Login</title>
        </Head>
            <Flex justifyContent="center" padding={"5em 0"} width="100%">
                <FormCard>
                    <form action="" method="" onSubmit={handleSubmit}>
                        <Heading fontSize={"4xl"} textAlign="center" marginBottom={"1em"}>
                            Fazer Login
                        </Heading>
                        <Stack spacing={4}>
                            <FormControl id="username">
                                <FormLabel>Usuário</FormLabel>
                                <Input type="text" name="username" onChange={handleFormChange} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Senha</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    onChange={handleFormChange}
                                />
                            </FormControl>
                            {!formState.formIsValid && <Text color={"red.400"}>Credenciais inválidas</Text>}
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}
                                >
                                    <Text fontSize={"smaller"}>
                                        Ainda não tem uma conta?{" "}
                                        <Link color={"blue.400"} marginLeft="" href="/cadastrar">
                                            Registre-se
                                        </Link>
                                    </Text>
                                </Stack>
                                <Button type="submit" colorScheme={"blue"} color={"white"}>
                                    Login
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </FormCard>
            </Flex>
        </>
    );
}
