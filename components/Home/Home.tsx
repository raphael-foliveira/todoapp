import Head from "next/head";
import { Heading, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { authenticateUser } from "../../services/user-services";
import { useEffect } from "react";

export default function HomePage() {
    const router = useRouter();

    const checkAuthentication = async () => {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        if (username && password) {
            const userAuthenticated = await authenticateUser({
                username: username,
                password: password,
            });
            if (!userAuthenticated) {
                return;
            }
            localStorage.setItem("userId", userAuthenticated.id.toString());
            router.push("/tarefas");
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <>
            <Head>
                <title>Lista de Tarefas</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Heading as={"h1"} textAlign="center" width={"100%"} marginTop="8em">
                Lista de Tarefas
            </Heading>
            <Flex margin="10vh 20vh" wrap={"wrap"} justifyContent="center" gap={10}>
                <Link href="/login">
                    <Button colorScheme={"blue"} width="150px">
                        Login
                    </Button>
                </Link>
                <Link href="/cadastrar">
                    <Button colorScheme={"blue"} width="150px">
                        Cadastre-se
                    </Button>
                </Link>
            </Flex>
        </>
    );
}
