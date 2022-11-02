import { Stack, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function FormCard({ children }: { children: ReactNode }) {
    return (
        <Box rounded={"lg"} bg={"gray.50"} boxShadow={"xl"} p={8} maxWidth="lg" width={"100%"}>
            {children}
        </Box>
    );
}
