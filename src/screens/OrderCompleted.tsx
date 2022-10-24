import { useNavigation } from "@react-navigation/native";
import { Box, Button, Text, View } from "native-base";
import Lottie from "lottie-react-native";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { removeCarToModal } from "../features/modalCar/modalCarSlice";

export function OrderCompleted() {
  const animationRef = useRef(null);
  const checkAnimationRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleGoToHome() {
    navigation.navigate("Tabs");
    dispatch(removeCarToModal());
  }
  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
    >
      <Box flexDirection="row" alignItems="center" justifyContent="center">
        <Text fontSize={18}>
          Your order has ben completed!
        </Text>
        <Lottie
          source={require("../animations/87263-check-verde.json")}
          style={{ width: 60, left: -4 }}
          autoPlay
          ref={checkAnimationRef}
        />
      </Box>
      <Lottie
        source={require("../animations/car.json")}
        autoPlay
        style={{ height: 250 }}
        ref={animationRef}
      />
      <Button bgColor="blue.500" onPress={handleGoToHome}>
        <Text color="white">Back to home</Text>
      </Button>
    </View>
  );
}
