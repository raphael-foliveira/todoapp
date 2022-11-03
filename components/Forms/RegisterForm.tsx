import FormCard from "../UI/FormCard";
import { ChangeEvent, FormEvent, useState } from "react";
import {
    Heading,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    FormErrorMessage,
    Spinner,
} from "@chakra-ui/react";
import { createUser } from "../../services/user-services";
import { useRouter } from "next/router";
import Link from "next/link";

type RegisterFormState = {
    username: string;
    password: string;
    confirmPassword: string;
    usernameIsValid: boolean;
    passwordsMatch: boolean;
};

export default function RegisterForm() {
    const formInitialState: RegisterFormState = {
        username: "",
        password: "",
        confirmPassword: "",
        usernameIsValid: true,
        passwordsMatch: true,
    };
    const [formState, setFormState] = useState<RegisterFormState>(formInitialState);
    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState((previousState: RegisterFormState) => {
            return {
                ...previousState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const formIsValid = () => {
        let valid = true;
        setUserAlreadyExists(false);
        if (userAlreadyExists) {
            setFormState((previousState) => {
                return { ...previousState, usernameIsValid: false };
            });
            valid = false;
        } else {
            setFormState((previousState) => {
                return { ...previousState, usernameIsValid: true };
            });
        }
        if (formState.password !== formState.confirmPassword) {
            setFormState((previousState) => {
                return { ...previousState, passwordsMatch: false };
            });
            valid = false;
        } else {
            setFormState((previousState) => {
                return { ...previousState, passwordsMatch: true };
            });
        }
        return valid;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formIsValid()) {
            const userInfo = {
                username: formState.username,
                password: formState.password,
            };
            const newUser = await createUser(userInfo);
            if (!newUser) {
                setUserAlreadyExists(true);
            } else {
                localStorage.setItem("username", newUser.username);
                localStorage.setItem("password", formState.password);
                localStorage.setItem("userId", newUser.id.toString());
                router.push("/tarefas");
            }
        }
        setLoading(false);
    };

    return (
        <Flex justifyContent="center" padding={"5em 0"} width="100&">
            <FormCard>
                <form action="" onSubmit={handleSubmit}>
                    <Heading fontSize={"4xl"} textAlign="center" marginBottom={"1em"}>
                        Cadastre-se
                    </Heading>
                    <Stack spacing={4}>
                        <FormControl id="username" isInvalid={userAlreadyExists}>
                            <FormLabel>Login</FormLabel>
                            <Input type="username" name="username" onChange={handleChange} />
                            <FormErrorMessage>Este usuário já existe</FormErrorMessage>
                        </FormControl>
                        <FormControl id="password" isInvalid={!formState.passwordsMatch}>
                            <FormLabel>Senha</FormLabel>
                            <Input type="password" name="password" onChange={handleChange} />
                            <FormErrorMessage>As senhas não coincidem!</FormErrorMessage>
                        </FormControl>
                        <FormControl id="passwordConfirm" isInvalid={!formState.passwordsMatch}>
                            <FormLabel>Confirmar senha</FormLabel>
                            <Input type="password" name="confirmPassword" onChange={handleChange} />
                        </FormControl>
                        <Flex justifyContent={"space-between"} wrap="wrap" gap={4}>
                            <Button
                                type="submit"
                                width="120px"
                                colorScheme={"blue"}
                                onClick={() => setLoading(true)}
                            >
                                {!loading ? "Cadastrar" : <Spinner />}
                            </Button>
                            <Link href={"/"}>
                                <Button colorScheme={"blue"} width="120px">
                                    Voltar
                                </Button>
                            </Link>
                        </Flex>
                    </Stack>
                </form>
            </FormCard>
        </Flex>
    );
}
