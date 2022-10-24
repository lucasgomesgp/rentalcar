import { Image, View } from "native-base";

export function SignIn() {
  return (
    <View flex={1}>
      <Image
        source={require("../assets/car.png")}
        h="full"
        w="full"
        position="absolute"
        top={0} 
        alt="Car"
      />
    </View>
  );
}
