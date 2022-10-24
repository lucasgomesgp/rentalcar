import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import { ReactNode } from "react";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

type BackBtn = InterfaceBoxProps & {
  children?: ReactNode;
};
export function BackBtn({ children, ...rest }: BackBtn) {
  const navigation = useNavigation();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      position="relative"
      justifyContent="center"
      mb={8}
      {...rest}
    >
      <Pressable
        position="absolute"
        left={2}
        p={2}
        top={0}
        borderWidth={1}
        rounded="xl"
        borderColor="#00000066"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </Pressable>
      {children}
      <Box />
    </Box>
  );
}
