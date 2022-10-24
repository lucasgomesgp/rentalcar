import { Box, Center, Pressable, Image, Text } from "native-base";
import { formatCurrency } from "react-native-format-currency";
import { useDispatch } from "react-redux";
import { urlFor } from "../../../sanity";
import Star from "../../assets/icons/star.svg";
import { addCarToModal } from "../../features/modalCar/modalCarSlice";
import { CarTypes } from "./types";

export function CardCar({
  name,
  stars,
  photo,
  pricePerDay,
  ...rest
}: CarTypes) {
  const [valueFormattedWithSymbol] = formatCurrency({
    amount: pricePerDay,
    code: "USD",
  });
  const dispatch = useDispatch();
  
  function onOpenModal() {
    dispatch(addCarToModal({ name, stars, photo, pricePerDay, ...rest }));
  }

  return (
    <>
      <Pressable
        w={300}
        h={240}
        p={4}
        mr={4}
        bgColor="gray.100"
        mt={2}
        rounded="md"
        onPress={onOpenModal}
      >
        <Center>
          <Image
            source={{ uri: urlFor(photo).width(400).url() }}
            alt={name}
            w="full"
            h="32"
            resizeMode="cover"
            rounded="lg"
/>
        </Center>
        <Box flexDirection="column" justifyContent="center">
          <Text fontSize={17} fontWeight="bold" mb={2} ml={4} mt={2}>
            {name}
          </Text>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize={17} fontWeight="bold">
              <Star />
              {stars}
            </Text>
            <Text fontSize={17} fontWeight="bold">
              {valueFormattedWithSymbol}
              <Text color="#0000007A">/day</Text>
            </Text>
          </Box>
        </Box>
      </Pressable>
    </>
  );
}
