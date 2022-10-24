import { Box, Button, Center, Image, Pressable, Text, View } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dimensions, Linking } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { Info } from "../Info";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  changeStatusModal,
  removeCarToModal,
} from "../../features/modalCar/modalCarSlice";
import { urlFor } from "../../../sanity";

export function Modal() {
  const { carSendedToModal, modalIsOpen } = useSelector(
    (state: RootState) => state.modalReducer
  );
  const dispatch = useDispatch();
  const modalRef = useRef<Modalize>();

  const { width, height } = Dimensions.get("screen");
  const [infos, setInfos] = useState([]);
  const navigation = useNavigation();

  const [valueFormattedWithSymbol] = formatCurrency({
    amount: carSendedToModal?.pricePerDay || 0,
    code: "USD",
  });

  function handleModalClosed() {
    dispatch(removeCarToModal());
  }

  function handleOpenModal() {
    modalRef.current.open();
  }

  function handleBookingOrder() {
    dispatch(changeStatusModal());
    navigation.navigate("Scheduling");
  }
  useEffect(() => {
    setInfos([
      { title: "Max Power", value: carSendedToModal?.maxPower || 0 },
      { title: "0-60 mph", value: carSendedToModal?.mph || 0 },
      { title: "Top Speed", value: carSendedToModal?.topSpeed || 0 },
    ]);
    if (modalIsOpen) {
      handleOpenModal();
    }
  }, [carSendedToModal]);
  return (
    <Modalize
      ref={modalRef}
      snapPoint={750}
      onClose={handleModalClosed}
      handlePosition="inside"
      disableScrollIfPossible={false}
      handleStyle={{ backgroundColor: "#161010" }}
      openAnimationConfig={{
        spring: { speed: 14, bounciness: 4 },
        timing: { duration: 280 },
      }}
    >
      <View w={width} h={height}>
        <Center pt={4}>
          {carSendedToModal?.photo && (
            <Image
              source={{ uri: urlFor(carSendedToModal?.photo).width(400).url() }}
              alt={carSendedToModal?.name || "Car offer"}
              w="96"
              resizeMode="cover"
              rounded="md"
              style={{ height: 228 }}
            />
          )}
        </Center>
        <Box
          flexDirection="column"
          borderBottomWidth={1}
          borderBottomColor="gray.300"
        >
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize={17} fontFamily="Inter_600SemiBold" px={5}>
              {carSendedToModal?.name}
            </Text>
            <Pressable px={5}>
              <Entypo name="heart-outlined" size={24} color="#000000" />
            </Pressable>
          </Box>
          <Box pt={2}>
            <Box flexDirection="row">
              <Text
                fontSize={17}
                fontWeight="bold"
                color="black"
                fontFamily="Inter_600SemiBold"
                pl={4}
              >
                <Entypo name="star" size={24} color="#FFD233" />
                {carSendedToModal?.stars?.slice(0, 3)}
              </Text>
              <Text
                fontSize={17}
                fontWeight="bold"
                fontFamily="Inter_600SemiBold"
                color="gray.500"
              >
                {carSendedToModal?.stars?.slice(3)}
              </Text>
            </Box>
            <Box
              flexDirection="row"
              alignItems="center"
              borderBottomWidth={1}
              w="full"
              borderBottomColor="gray.300"
              px={4}
              mt={4}
              pt={4}
              pb={4}
              shadow="2"
            >
              {carSendedToModal?.renter?.photo && (
                <Image
                  source={{
                    uri: urlFor(carSendedToModal?.renter?.photo)
                      .width(400)
                      .url(),
                  }}
                  alt={carSendedToModal?.renter?.name}
                  w="12"
                  h="12"
                  rounded="md"
                />
              )}
              <View
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                w="90%"
              >
                <Box
                  flexDirection="column"
                  justifyContent="space-between"
                  px={4}
                >
                  <Text fontSize={17} fontFamily="Inter_600SemiBold">
                    {carSendedToModal?.renter?.name}
                  </Text>
                  <Text
                    fontSize={17}
                    fontFamily="Inter_600SemiBold"
                    color="gray.400"
                  >
                    Renter
                  </Text>
                </Box>
                <Box flexDirection="row" justifyContent="space-between">
                  <Pressable
                    p={5}
                    borderWidth={1}
                    m={1}
                    rounded="2xl"
                    borderColor="gray.400"
                    onPress={() => {
                      Linking.openURL(
                        `tel:${carSendedToModal?.renter?.phoneNumber}`
                      );
                    }}
                  >
                    <Feather name="phone-call" size={24} color="#FF6F23" />
                  </Pressable>
                  <Pressable
                    p={5}
                    borderWidth={1}
                    m={1}
                    rounded="2xl"
                    borderColor="gray.400"
                    onPress={() => {
                      Linking.openURL(
                        `sms:${carSendedToModal?.renter?.phoneNumber}`
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name="message-processing"
                      size={24}
                      color="#FF6F23"
                    />
                  </Pressable>
                </Box>
              </View>
            </Box>
          </Box>
        </Box>
        <View flexDirection="column" px={4} pt={5}>
          <Text fontSize={20} fontFamily="Inter_600SemiBold">
            Car Info
          </Text>
          <Box flexDirection="column" pt={5} justifyItems="center">
            <Box flexDirection="row" alignItems="center">
              <Box flexDirection="row" mr={10} alignItems="center">
                <FontAwesome5 name="user-alt" size={30} color="#FF6F23" />
                <Text fontSize={15} ml={2}>
                  {carSendedToModal?.passangers} Passangers
                </Text>
              </Box>
              <Box flexDirection="row" alignItems="center">
                <MaterialCommunityIcons
                  name="car-door"
                  size={30}
                  color="#FF6F23"
                />
                <Text fontSize={15} ml={2}>
                  {carSendedToModal?.doors} Doors
                </Text>
              </Box>
            </Box>
            <Box flexDirection="row" pt={4}>
              {carSendedToModal?.airConditioning && (
                <Box flexDirection="row" mr={8} alignItems="center">
                  <FontAwesome name="snowflake-o" size={30} color="#FF6F23" />
                  <Text fontSize={15} ml={2}>
                    Air conditioning
                  </Text>
                </Box>
              )}
              <Box flexDirection="row" alignItems="center">
                <FontAwesome5 name="gas-pump" size={30} color="#FF6F23" />
                <Text fontSize={15} ml={2}>
                  Fuel info:
                  {carSendedToModal?.fuelFull ? "Full to Full" : "Empty"}
                </Text>
              </Box>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Pressable flexDirection="row" pt={4} alignItems="center" mr="24">
                <FontAwesome name="address-book" size={30} color="#FF6F23" />
                <Text fontSize={15} ml={2}>
                  Manual
                </Text>
              </Pressable>
              <Pressable flexDirection="row" pt={4} alignItems="center">
                <Ionicons name="ios-car-sport" size={30} color="#FF6F23" />
                <Text fontSize={15} ml={2}>
                  Type car:
                  {carSendedToModal?.isAutomatic ? "Automatic" : "Manual"}
                </Text>
              </Pressable>
            </Box>
          </Box>
        </View>
        <View flexDirection="column" px={4} pt={8}>
          <Text fontSize={20} fontFamily="Inter_600SemiBold" pb={2}>
            Car Specs
          </Text>
          <Box flexDirection="row" h="xl" pb={4}>
            {infos.map(({ title, value }) => (
              <Info key={title} title={title} value={value} />
            ))}
          </Box>
        </View>

        <Center w="full" px={4} position="absolute" bottom={0}>
          <Button
            w="full"
            backgroundColor="#F9864A"
            rounded="xl"
            flexDirection="row"
            p={4}
            onPress={handleBookingOrder}
          >
            <Text
              fontSize={20}
              color="white"
              fontFamily="Inter_600SemiBold"
              pr={4}
            >
              Booking Now {valueFormattedWithSymbol}
              <Text color="#ffffff99">/day</Text>
            </Text>
          </Button>
        </Center>
      </View>
    </Modalize>
  );
}
