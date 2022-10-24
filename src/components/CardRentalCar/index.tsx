import React from "react";
import { Box, Image, Text } from "native-base";
import { format, isPast } from "date-fns";

type CardRentalCarProps = {
  name: string;
  photo: string;
  payment: string;
  startDay: string;
  endDay: string;
};

export function CardRentalCar({
  name,
  photo,
  payment,
  startDay,
  endDay,
}: CardRentalCarProps) {
  const dateIsPast = isPast(new Date(endDay));
  return (
    <Box pt={4}>
      <Box flexDirection="row" alignItems="center" justifyContent="center">
        <Box flexDirection="column" alignItems="center">
          <Text fontSize={14} fontWeight="bold">{name}</Text>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/f6/71/7b/f6717b67f9b1a4c3c03527ed21837766.png",
            }}
            w="32"
            h="20"
            alt="Car rental"
          />
        </Box>

        <Box mt={4}>
          <Box flexDirection="column">
            <Box flexDirection="row">
              <Text fontSize={14} color="gray.500" >
                Payment:
              </Text>
              <Text fontSize={14}>{payment}</Text>
            </Box>
            <Box flexDirection="row">
              <Text>Status: </Text>
              <Text
                fontSize={14}
                color={dateIsPast ? "red.500" : "green.500"}
                fontWeight="bold"
              >
                {dateIsPast ? "Closed" : "Open"}
              </Text>
            </Box>
          </Box>
          <Box flexDirection="column">
            <Box flexDirection="row" mt={1}>
              <Text fontSize={14} color="black">
                Start:
              </Text>
              <Text fontSize={14} color="black">
                {format(new Date(startDay), "dd LLL yy")}
              </Text>
            </Box>
            <Box flexDirection="row">
              <Text fontSize={14} color="black">
                End:
              </Text>
              <Text fontSize={14} color="black">
                {format(new Date(endDay), "dd LLL yy")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
