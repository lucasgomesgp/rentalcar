import React from "react";
import { HStack, Text, VStack } from "native-base";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { BackBtn } from "../components/BackBtn";
import { data } from "../utils/car";
import { CardRentalCar } from "../components/CardRentalCar";

export function RentalArea() {
  return (
    <VStack pt={getStatusBarHeight()} backgroundColor="white" flex={1}>
      <BackBtn pl={2}>
        <Text fontSize={18}>Rental cars</Text>
      </BackBtn>
      <HStack flexDirection="column" alignItems="center">
        {data.map((car) => (
          <CardRentalCar
            key={car.name}
            name={car.name}
            payment={car.payment}
            photo={car.photo}
            startDay={car.startDay}
            endDay={car.endDay}
          />
        ))}
      </HStack>
    </VStack>
  );
}
