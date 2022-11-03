import { Stack, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type ToDoFormState = {
    name: string;
    description: string;
};

/**Formulário genérico contendo campos referentes a uma tarefa */
export default function ToDoForm({
    formState,
    setFormState,
    buttonText,
}: {
    formState: ToDoFormState;
    setFormState: Dispatch<SetStateAction<ToDoFormState>>;
    buttonText: string
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState((previousState: ToDoFormState) => {
            return { ...previousState, [event.target.name]: event.target.value };
        });
    };
    return (
        <>
            <Stack spacing={4} marginBottom={"1em"}>
                <FormControl>
                    <FormLabel>Nome: </FormLabel>
                    <Input name="name" onChange={handleChange} value={formState.name} />
                </FormControl>
                <FormControl>
                    <FormLabel>Descrição: </FormLabel>
                    <Textarea
                        name="description"
                        rows={4}
                        onChange={handleChange}
                        value={formState.description}
                    />
                </FormControl>
            </Stack>
            <Button type="submit" colorScheme="blue">
                {buttonText}
            </Button>
        </>
    );
}
