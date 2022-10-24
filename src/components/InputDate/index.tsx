import { Box, IInputProps, Input, Text } from "native-base";

type InputDateProps = IInputProps & {
  title: string;
};
export function InputDate({ title, ...rest }: InputDateProps) {
  return (
    <Box position="relative" w="2/4" p={2}>
      <Text position="absolute" color="gray.400" fontSize={18} top={2} left={4}>
        {title}
      </Text>
      <Input type="text" p={2} h={16} borderWidth={2} rounded="xl" {...rest}/>
    </Box>
  );
}
