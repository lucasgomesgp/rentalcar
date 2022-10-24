import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable, Text } from "native-base";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function User() {
  const navigation = useNavigation();
  return (
    <Box flex={1} pt={getStatusBarHeight()}>
      <Text
        fontSize={16}
        color="black"
        fontFamily="Inter_600SemiBold"
        w="full"
        justifyContent="center"
        pb={2}
        textTransform="capitalize"
        textAlign="center"
      >
        User
      </Text>
      <Pressable
        flexDirection="row"
        p={2}
        alignItems="center"
        w="full"
        borderWidth={1}
        borderColor="gray.400"
        onPress={() => {
          navigation.navigate("RentalArea");
        }}
      >
        <MaterialIcons name="car-rental" size={34} color="#000000" />
        <Text
          fontSize={16}
          fontFamily="Inter_600SemiBold"
          fontWeight="black"
          ml={2}
        >
          Cars rental
        </Text>
      </Pressable>
    </Box>
  );
}
