import { Box, Image, Input, Pressable, Select, Text, View } from "native-base";
import {  useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getDataFromServer, installments } from "../../utils/data";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addPaymentCreditCard,
  deleteCreditCard,
} from "../../features/carChoosed/carChoosedSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import { FlagType, FormDataType, ModalCreditCardProps } from "./types";
import { urlFor } from "../../../sanity";
import { GET_ALL_FLAGS } from "../../utils/typeRequests";

const schema = yup.object({
  fullName: yup.string().required("Full name is required."),
  cardNumber: yup.string().required("Card number is required."),
  validity: yup
    .string()
    .max(5, "Validity with max 4 characters")
    .required("Validity of card is required."),
  securityNumber: yup
    .string()
    .max(3, "Security numbers max 3 characters")
    .required("Security number is required."),
  installments: yup.string().required("Installments is required."),
  flag: yup.string().required("Flag of your card is required."),
});

export function ModalCreditCard({
  statusModal,
  setModalClose,
}: ModalCreditCardProps) {
  const modalRef = useRef<Modalize>(null);
  const [flags, setFlags] = useState<Array<FlagType>>([]);
  const { payment } = useSelector(
    (state: RootState) => state.carChoosedReducer
  );
  const dispatch = useDispatch();

  const defaultValues = {
    fullName: "",
    cardNumber: "",
    installments: "",
    securityNumber: "",
    validity: "",
    flag: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  function onSubmit(data: FormDataType) {
    dispatch(addPaymentCreditCard(data));
    return Alert.alert("Added", "Credit card added.");
  }
  function handleDeleteCreditCard() {
    dispatch(deleteCreditCard({}));
    reset(defaultValues);
    modalRef?.current.close();
    return Alert.alert("Deleted", "Credit card deleted.");
  }
  function onOpenModal() {
    modalRef?.current.open();
  }

  function onCloseModal() {
    setModalClose(false);
  }
  async function getFlags() {
    try {
      const allFlags = await getDataFromServer(GET_ALL_FLAGS);
      setFlags(allFlags);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (statusModal) {
      onOpenModal();
      getFlags();
    } else {
      onCloseModal();
    }
  }, [statusModal]);

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      handlePosition="inside"
      snapPoint={820}
      handleStyle={{ backgroundColor: "#161010" }}
      onClosed={onCloseModal}
    >
      <View
        w="full"
        alignItems="center"
        justifyContent="center"
        pt={10}
        px={4}
        pb={4}
      >
        <Image
          source={require("../../assets/card.gif")}
          alt="Credit Card"
          w={32}
          h={32}
        />
        <Text fontSize={20} pb={4} fontWeight="bold">
          Card Register
        </Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange } }) => (
            <Box flexDirection="column">
              <Input
                placeholder="Full name"
                w="full"
                value={value}
                onChangeText={onChange}
              />
              {errors && (
                <Text color="red.400" fontSize={12}>
                  {errors?.fullName?.message}
                </Text>
              )}
            </Box>
          )}
        />
        <Box flexDirection="row" pt={4} w="full">
          <Controller
            control={control}
            name="cardNumber"
            render={({ field: { value, onChange } }) => (
              <Box flexDirection="column" w="2/4" mr={0.5}>
                <MaskInput
                  placeholder="Card number"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  mask={Masks.CREDIT_CARD}
                  style={{
                    borderWidth: 1,
                    height: 45,
                    borderRadius: 5,
                    borderColor: "#d6d3d1",
                    paddingHorizontal: 10,
                  }}
                />
                {errors && (
                  <Text color="red.400" fontSize={12}>
                    {errors?.cardNumber?.message}
                  </Text>
                )}
              </Box>
            )}
          />

          <Controller
            control={control}
            name="validity"
            render={({ field: { value, onChange } }) => (
              <Box flexDirection="column" w="2/4">
                <MaskInput
                  placeholder="Validity"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  mask={[/\d/, /\d/, "/", /\d/, /\d/]}
                  style={{
                    borderWidth: 1,
                    height: 45,
                    borderRadius: 5,
                    borderColor: "#d6d3d1",
                    paddingHorizontal: 10,
                  }}
                />
                {errors && (
                  <Text color="red.400" fontSize={12}>
                    {errors?.validity?.message}
                  </Text>
                )}
              </Box>
            )}
          />
        </Box>
        <Box flexDirection="row" pt={4} w="full">
          <Controller
            control={control}
            name="securityNumber"
            render={({ field: { value, onChange } }) => (
              <Box flexDirection="column" w="2/4" mr={0.5}>
                <MaskInput
                  placeholder="Security numbers"
                  secureTextEntry={true}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  mask={[/\d/, /\d/, /\d/]}
                  style={{
                    borderWidth: 1,
                    height: 45,
                    borderRadius: 5,
                    borderColor: "#d6d3d1",
                    paddingHorizontal: 10,
                  }}
                />
                {errors && (
                  <Text color="red.400" fontSize={12}>
                    {errors?.securityNumber?.message}
                  </Text>
                )}
              </Box>
            )}
          />
          <Controller
            control={control}
            name="installments"
            render={({ field: { value, onChange } }) => (
              <Box flexDirection="column" w="2/4">
                <Select
                  minWidth="2/4"
                  onValueChange={onChange}
                  defaultValue={value}
                  placeholder="Installments"
                >
                  {installments.map((value) => (
                    <Select.Item
                      key={value}
                      label={
                        value +
                        "x" +
                        parseFloat(`${payment.total / value}`).toFixed(2)
                      }
                      value={`${value}`}
                      w="full"
                    />
                  ))}
                </Select>
                {errors && (
                  <Text color="red.400" fontSize={12}>
                    {errors?.installments?.message}
                  </Text>
                )}
              </Box>
            )}
          />
        </Box>
        <Controller
          control={control}
          name="flag"
          render={({ field: { value, onChange } }) => (
            <Select
              minWidth="full"
              onValueChange={onChange}
              defaultValue={value}
              placeholder="Flag credit card"
            >
              {flags.map(({ _id, label, name, photo }) => (
                <Select.Item
                  key={_id}
                  label={label}
                  value={name}
                  leftIcon={
                    <>
                      <Image
                        alt={name}
                        resizeMode="contain"
                        source={{ uri: urlFor(photo).width(400).url() }}
                        w={12}
                        h={12}
                      />
                    </>
                  }
                />
              ))}
            </Select>
          )}
        />
        <Box flexDirection="row" mt={4}>
          {payment?.creditCard?.fullName && (
            <Pressable
              bgColor="red.500"
              w="2/4"
              p={4}
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              rounded="lg"
              mr={2}
              onPress={handleDeleteCreditCard}
            >
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <MaterialIcons name="delete-forever" size={24} color="white" />
                <Text color="white" fontSize={15} fontWeight="bold">
                  Delete
                </Text>
              </Box>
            </Pressable>
          )}
          <Pressable
            bgColor="green.500"
            w="2/4"
            p={4}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            rounded="lg"
            onPress={handleSubmit(onSubmit)}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <MaterialIcons
                name={
                  payment?.creditCard?.cardNumber ? "save" : "app-registration"
                }
                size={24}
                color="white"
              />
              <Text color="white" fontSize={15} fontWeight="bold">
                {payment?.creditCard?.fullName ? "Save" : "Register"}
              </Text>
            </Box>
          </Pressable>
        </Box>
      </View>
    </Modalize>
  );
}
