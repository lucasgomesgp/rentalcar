import { useNavigation } from "@react-navigation/native";
import { Button, Image, Text, VStack } from "native-base";
import { Dimensions } from "react-native";

export function Presentation() {
  const navigation = useNavigation();
  const {height} = Dimensions.get("screen");
  return (
    <VStack flex={1} alignItems="center" justifyContent="space-between">
      <Image
        source={require("../assets/car.png")}
        h={height}
        w="full"
        position="absolute"
        top={0}
        alt="Car"
        flex={1}
      />
      <Text
        fontSize={48}
        w="sm"
        px={4}
        color="white"
        fontWeight="medium"
        mb={40}
      >
        Find and rent car in easy steps.
      </Text>
      <Button
        background="orange.500"
        w="4/5"
        rounded="lg"
        mb={10}
        onPress={() => {
          navigation.navigate("Tabs");
        }}
      >
        <Text color="white" fontSize={26}>
          Let's Go!
        </Text>
      </Button>
    </VStack>
  );
}
