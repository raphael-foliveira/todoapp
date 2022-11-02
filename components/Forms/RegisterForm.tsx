import FormCard from "../UI/FormCard";
import { ChangeEvent, FormEvent, useState } from "react";
import { Heading, Stack, FormControl, FormLabel, Input, Button, Flex } from "@chakra-ui/react";
import { createUser } from "../../services/user-services";
import { useRouter } from "next/router";

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
    const router = useRouter();

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState((previousState: RegisterFormState) => {
            return {
                ...previousState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const formIsValid = () => {
        let valid = true;
        if (formState.username.length < 3) {
            setFormState((previousState) => {
                return { ...previousState, usernameIsValid: false };
            });
            valid = false;
        }
        if (formState.password !== formState.confirmPassword) {
            setFormState((previousState) => {
                return { ...previousState, passwordsMatch: false };
            });
            valid = false;
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
            await createUser(userInfo);
            router.push("/");
        }
    };

    return (
        <Flex justifyContent="center" padding={"5em 0"} width="100&">
            <FormCard>
                <form action="" onSubmit={handleSubmit}>
                    <Heading fontSize={"4xl"} textAlign="center" marginBottom={"1em"}>
                        Cadastre-se
                    </Heading>
                    <Stack spacing={4}>
                        <FormControl id="username">
                            <FormLabel>Login</FormLabel>
                            <Input type="username" name="username" onChange={handleFormChange} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Senha</FormLabel>
                            <Input type="password" name="password" onChange={handleFormChange} />
                        </FormControl>
                        <FormControl id="passwordConfirm">
                            <FormLabel>Confirmar senha</FormLabel>
                            <Input
                                type="password"
                                name="confirmPassword"
                                onChange={handleFormChange}
                            />
                        </FormControl>
                        <Flex justifyContent={"space-between"} wrap="wrap" gap={4}>
                            <Button
                                type="submit"
                                width={{ base: "100%", lg: "40%" }}
                                colorScheme={"blue"}
                            >
                                Cadastrar
                            </Button>
                            <Button
                                width={{ base: "100%", lg: "40%" }}
                                colorScheme={"blue"}
                                onClick={() => router.push("/")}
                            >
                                Voltar
                            </Button>
                        </Flex>
                    </Stack>
                </form>
            </FormCard>
        </Flex>
    );
}
