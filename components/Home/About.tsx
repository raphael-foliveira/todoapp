import {
    ModalBody,
    Text,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Box,
    Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import styled from "@emotion/styled";

const ParagraphSpacing = styled.div`
    p {
        margin: 10px 0;
    }
    a {
        color: #4299e1;
    }
`;

export default function About() {
    return (
        <ModalContent>
            <ModalHeader>Sobre o App</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Link href="https://github.com/raphael-foliveira/todoapp">
                    <Text color={"blue.400"}>Github</Text>
                </Link>
                <Link href="/api-docs">
                    <Text color={"blue.400"}>API</Text>
                </Link>
                <Link href="https://todoapp-blue-nine.vercel.app/">
                    <Text color={"blue.400"}>App</Text>
                </Link>
                <ParagraphSpacing>
                    <Text>Olá!</Text>
                    <Text>
                        Sou Raphael! Trabalho com desenvolvimento de software e websites. Durante
                        boa parte da minha experiência profissional, trabalhei utilizando o
                        framework Django para desenvolver soluções, mas utilizo (e gosto muito) de
                        várias outras tecnologias, frameworks e linguagens de programação.
                    </Text>
                    <Text>
                        Desenvolvi esse projeto utilizando{" "}
                        <Link href="https://nextjs.org/">NextJs</Link>, que é um framework que
                        oferece excelentes ferramentas para os requisitos solicitados.
                    </Text>
                    <Text>
                        O NextJs me dá a possibilidade de construir o front end em React, além de me
                        dar um diretório para construir uma API Rest com facilidade, permitindo a
                        integração do meu projeto com um banco de dados. Tudo isso utilizando TypeScript.
                    </Text>
                    <Text>
                        Usar o React no front end me deu também a possibilidade de utilizar a
                        biblioteca de componentes{" "}
                        <Link href="https://chakra-ui.com/">Chakra UI</Link> para me auxiliar com a
                        estilização e layout dos elementos visuais do app.
                    </Text>
                    <Text>
                        Para fazer a integração com o banco de dados, faço uso do orm{" "}
                        <Link href="https://www.prisma.io/">Prisma</Link>. O banco de dados
                        utilizado é o <Link href="https://www.postgresql.org/">PostgreSQL</Link>,
                        que está hospedado no serviço RDS da AWS.
                    </Text>
                    <Text>Este app está sendo hospedado através da Vercel.</Text>
                    <Text fontSize={"xs"} textAlign="end">Salvador, 2022.</Text>
                </ParagraphSpacing>
            </ModalBody>
        </ModalContent>
    );
}
