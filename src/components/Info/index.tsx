import { Box, Text } from "native-base";

type InfoProps ={
    title: string;
    value: number;
};

export function Info({title, value}: InfoProps){
    return(
        <Box borderWidth={1} borderColor="gray.300" rounded="xl" h="18%" w="30%" mr={4} px={2}>
            <Text fontSize="sm" color="gray.300">{title}</Text>
            <Text fontSize={32}>{value}</Text>
        </Box>
    );
}