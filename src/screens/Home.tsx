import {
  Box,
  HStack,
  Input,
  Text,
  VStack,
  Pressable,
  Image,
  ScrollView,
} from "native-base";
import Pin from "../assets/icons/pin.svg";
import ArrowDownSm from "../assets/icons/arrow_down_sm.svg";
import Search from "../assets/icons/search.svg";
import { CardCar } from "../components/CardCar";
import { BtnOpenAll } from "../components/BtnOpenAll";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { BrandTypes, CarTypes } from "../components/CardCar/types";
import { getDataFromServer } from "../utils/data";
import {
  getCarWithSpecificBrand,
  GET_ALL_BRANDS,
  GET_ALL_VEHICLES,
} from "../utils/typeRequests";
import { urlFor } from "../../sanity";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [cars, setCars] = useState<Array<CarTypes>>([]);
  const [brands, setBrands] = useState<Array<BrandTypes>>([]);
  const [brandChoosed, setBrandChoosed] = useState("");
  const [fetchIsLoading, setFetchIsLoading] = useState(false);
  const { user } = useAuth();
  const { modalIsOpen } = useSelector((state: RootState) => state.modalReducer);
  const navigation = useNavigation();
  
  async function handleGetDataFromServer() {
    setFetchIsLoading(true);
    const carsFetched = brandChoosed
      ? await getCarWithSpecificBrand(brandChoosed)
      : await getDataFromServer(GET_ALL_VEHICLES);
    const brandsFetched = await getDataFromServer(GET_ALL_BRANDS);

    setCars(carsFetched);
    setBrands(brandsFetched);
    setFetchIsLoading(false);
  }

  useEffect(() => {
    handleGetDataFromServer();
  }, [brandChoosed]);

  return (
    <>
      <VStack flex={1} bgColor="white">
        <HStack
          px={4}
          alignItems="center"
          justifyContent="space-between"
          mt={getStatusBarHeight()}
        >
          <Box p={4} shadow="8" rounded="2xl" background="white">
            <Pin />
          </Box>
          <Box flexDirection="column">
            <Text fontSize={16} fontFamily="Inter_600SemiBold">
              Your location
            </Text>
            <Box flexDirection="row" alignItems="center">
              <Text fontSize={18} fontFamily="Inter_600SemiBold" pr={2}>
                Your city
              </Text>
              <ArrowDownSm />
            </Box>
          </Box>
          <Pressable onPress={() => {navigation.navigate("User")}}>
            <Image
              source={{ uri: user.photo }}
              alt="User avatar"
              width={46}
              height={45}
              borderRadius={10}
            />
          </Pressable>
        </HStack>
        <Text fontSize={32} px={5} mt={4} color="gray.500">
          Find your favourite vechicle.
        </Text>
        <Input
          mt={4}
          rounded="full"
          placeholder="Search vechicle"
          width="3/4"
          h="20"
          alignSelf="center"
          placeholderTextColor="gray.500"
          fontSize={18}
          shadow="2"
          InputLeftElement={
            <Box ml={8}>
              <Search />
            </Box>
          }
          bgColor="white"
          zIndex={5}
        />
        {fetchIsLoading ? (
          <Box alignItems="center" justifyContent="center" pt={5}>
            <ActivityIndicator size="large" />
          </Box>
        ) : (
          <ScrollView
            borderWidth={2}
            w="99.8%"
            roundedTop="3xl"
            h="full"
            mt={-2}
            px={4}
            pt={2}
            borderColor="gray.400"
            borderBottomColor="white"
            showsVerticalScrollIndicator={false}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontSize={22} fontFamily="Inter_600SemiBold">
                Top Brands
              </Text>
              <BtnOpenAll
                onPress={() => {
                  setBrandChoosed("");
                }}
                disabled={fetchIsLoading}
              />
            </HStack>
            {brands.length !== 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                mt={1}
                w="full"
                minH="16"
              >
                <HStack>
                  {brands.map((item) => (
                    <Pressable
                      mr={4}
                      key={item?._id}
                      _pressed={{ opacity: 0 }}
                      onPress={() => {
                        setBrandChoosed(item.name);
                      }}
                      disabled={fetchIsLoading}
                    >
                      <Image
                        source={{ uri: urlFor(item?.logo).width(400).url() }}
                        alt={item?.name}
                        h="20"
                        w="24"
                        opacity={fetchIsLoading ? 0.5 : 1}
                      />
                    </Pressable>
                  ))}
                </HStack>
              </ScrollView>
            ) : (
              <Text pt={2}>There are no car brands at the moment!</Text>
            )}
            <HStack flexDirection="column" pt={8}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize={22} fontFamily="Inter_600SemiBold">
                  Available Near You
                </Text>
                <BtnOpenAll
                  onPress={() => {
                    setBrandChoosed("");
                  }}
                  disabled={fetchIsLoading}
                />
              </Box>
              {cars.length !== 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {cars.map(
                    ({
                      _id,
                      name,
                      photo,
                      stars,
                      pricePerDay,
                      renter,
                      airConditioning,
                      doors,
                      fuelFull,
                      maxPower,
                      topSpeed,
                      mph,
                      passangers,
                      isAutomatic,
                    }) => (
                      <CardCar
                        key={_id}
                        name={name}
                        photo={photo}
                        stars={stars}
                        pricePerDay={pricePerDay}
                        airConditioning={airConditioning}
                        renter={renter}
                        doors={doors}
                        fuelFull={fuelFull}
                        maxPower={maxPower}
                        topSpeed={topSpeed}
                        mph={mph}
                        passangers={passangers}
                        isAutomatic={isAutomatic}
                      />
                    )
                  )}
                </ScrollView>
              ) : (
                <Text pt={2}>No cars available!</Text>
              )}
            </HStack>
          </ScrollView>
        )}
      </VStack>
      {modalIsOpen ? <Modal /> : ""}
    </>
  );
}
