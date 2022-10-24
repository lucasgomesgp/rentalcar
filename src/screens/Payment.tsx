import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Image,
  Input,
  Pressable,
  ScrollView,
  Select,
  Text,
  View,
} from "native-base";
import {
  Dimensions,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import { InputDate } from "../components/InputDate";
import { useEffect, useState } from "react";
import { ModalCreditCard } from "../components/ModalCreditCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { formatCurrency } from "react-native-format-currency";
import { format, parseISO } from "date-fns";
import {
  deleteCar,
  deleteCreditCard,
} from "../features/carChoosed/carChoosedSlice";
import { FlagType, FormDataType } from "../components/ModalCreditCard/types";
import { getSpecificFlag } from "../utils/typeRequests";
import { urlFor } from "../../sanity";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  location: string;
  paymentMethod: string;
};
export function Payment() {
  const [modalCreditCardStatus, setModalCreditCardStatus] = useState(false);
  const [flagChoosed, setFlagChoosed] = useState<FlagType>();
  const { carSendedToModal } = useSelector(
    (state: RootState) => state.modalReducer
  );
  const { payment } = useSelector(
    (state: RootState) => state.carChoosedReducer
  );
  const start = payment?.rentalDays[0];
  const end = payment.rentalDays[payment?.rentalDays?.length - 1];

  const [valueFormattedWithSymbol] = formatCurrency({
    amount: carSendedToModal?.pricePerDay || 0,
    code: "USD",
  });
  const [datesRental, setDatesRental] = useState({
    start: parseISO(start) || 0,
    end: parseISO(end) || 0,
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width } = Dimensions.get("screen");
  const defaultValues = {
    location: "",
    paymentMethod: "",
  };
  const schema = yup.object({
    location: yup.string().required("Location is required"),
    paymentMethod: yup.string().required("Choose one method of payment"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  function handleOpenRegisterCard() {
    setModalCreditCardStatus(true);
  }

  function getPermissionLocation() {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    } catch (err) {
      console.log(err);
    }
  }
  function onSubmit({ location, paymentMethod }: FormData) {
    if (location && paymentMethod) {
      dispatch(deleteCar());
      navigation.navigate("OrderCompleted");
    }
  }
  async function getFlag() {
    const result = await getSpecificFlag(payment?.creditCard?.flag);
    setFlagChoosed(result);
  }
  useEffect(() => {
    if (payment?.creditCard?.flag) {
      getFlag();
    }
  }, [payment?.creditCard?.flag]);
  return (
    <>
      <View flex={1} backgroundColor="white" position="relative">
        <Pressable
          p={2}
          borderWidth={1}
          rounded="xl"
          borderColor="#00000066"
          top={10}
          left={4}
          zIndex={99}
          position="absolute"
          backgroundColor="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </Pressable>
        <MapView
          onMapReady={() => {
            Platform.OS === "android" ? getPermissionLocation : "";
          }}
          initialRegion={{
            latitude: 37.77026837819554,
            longitude: -122.44527837757673,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="mutedStandard"
          showsUserLocation={true}
          style={{ width: width, height: 300 }}
          loadingEnabled={true}
        >
          <Marker
            title="Get your car here!"
            description="Go to point, for get your car!"
            coordinate={{
              latitude: 37.77026837819554,
              longitude: -122.44527837757673,
            }}
          ></Marker>
        </MapView>
        <View w="full" position="relative" backgroundColor="white">
          <Box
            backgroundColor="#f9864a"
            w="full"
            top={-10}
            pb={12}
            pt={4}
            roundedTop="2xl"
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="space-between"
            px={8}
          >
            <Text
              fontSize={18}
              fontFamily="Inter_600SemiBold"
              color="white"
              w="4/6"
            >
              {carSendedToModal?.name || "Car name area"}
            </Text>
            <View
              flexDirection="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <Entypo name="star" size={24} color="#ffe604" mr={12} />
              <Text fontSize={15} fontFamily="Inter_600SemiBold" color="white">
                {carSendedToModal?.stars}
              </Text>
            </View>
          </Box>
          <Box
            position="absolute"
            backgroundColor="white"
            w="full"
            h={8}
            bottom={2}
            roundedTop="3xl"
          />
        </View>
        <ScrollView px={8} backgroundColor="white" w="full" h="full">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <Text fontSize={24} fontFamily="Inter_600SemiBold">
              Overview
            </Text>
            <Box flexDirection="row" justifyContent="space-between">
              <InputDate
                title="Start"
                isDisabled={true}
                value={format(datesRental.start, "d LLL yy")}
              />
              <InputDate
                title="End"
                isDisabled={true}
                value={format(datesRental.end, "d LLL yy")}
              />
            </Box>
            <Box flexDirection="column">
              <Text fontSize={20} fontFamily="Inter_600SemiBold" pt={2} pb={2}>
                Pick-up location
              </Text>
              <Controller
                name="location"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    type="text"
                    borderColor="gray.300"
                    rounded="xl"
                    value={value}
                    onChangeText={onChange}
                    leftElement={
                      <Box pl={4}>
                        <Entypo name="location-pin" size={30} color="#FFD233" />
                      </Box>
                    }
                  />
                )}
              />
              {errors && (
                <Text color="red.400" fontSize={12}>
                  {errors?.location?.message}
                </Text>
              )}
            </Box>
            <Box flexDirection="column">
              <Text fontSize={24} fontFamily="Inter_600SemiBold">
                Payment
              </Text>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    borderColor="gray.300"
                    rounded="xl"
                    p={4}
                    defaultValue={value}
                    onValueChange={onChange}
                  >
                    <Select.Item
                      startIcon={
                        <Ionicons name="cash-outline" size={24} color="green" />
                      }
                      label="Cash"
                      value="cash"
                    />
                    <Select.Item
                      startIcon={
                        payment?.creditCard?.flag && flagChoosed?.photo ? (
                          <>
                            <Image
                              source={{
                                uri: urlFor(flagChoosed?.photo)
                                  .width(400)
                                  .url(),
                              }}
                              alt={"Flag credit card"}
                              w="12"
                              h="12"
                              resizeMode="contain"
                            />
                          </>
                        ) : (
                          <Entypo name="credit-card" size={24} color="blue" />
                        )
                      }
                      label={
                        payment?.creditCard?.fullName
                          ? `Credit Card:  ${payment?.creditCard?.cardNumber?.slice(
                              0,
                              4
                            )} **** `
                          : "Register new credit card"
                      }
                      value="creditCard"
                      endIcon={
                        payment?.creditCard?.cardNumber ? (
                          <Pressable
                            onPress={() => {
                              dispatch(deleteCreditCard({}));
                            }}
                            w="1/4"
                          >
                            <MaterialCommunityIcons
                              name="close-box"
                              size={32}
                              color="red"
                              style={{ textAlign: "right" }}
                            />
                          </Pressable>
                        ) : (
                          <></>
                        )
                      }
                      onPressIn={handleOpenRegisterCard}
                    />
                  </Select>
                )}
              />
              {errors && (
                <Text color="red.400" fontSize={12}>
                  {errors?.paymentMethod?.message}
                </Text>
              )}
            </Box>
            <Button
              rounded="2xl"
              backgroundColor="#f9864a"
              px={4}
              onPress={handleSubmit(onSubmit)}
            >
              <Text color="white" fontSize={20}>
                Pay |{valueFormattedWithSymbol || 0} /day
              </Text>
            </Button>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      <ModalCreditCard
        statusModal={modalCreditCardStatus}
        setModalClose={setModalCreditCardStatus}
      />
    </>
  );
}
