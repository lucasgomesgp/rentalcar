import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, Pressable, ScrollView, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { SelectHour } from "../components/SelectHour";
import { useNavigation } from "@react-navigation/native";
import { Alert, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusModal } from "../features/modalCar/modalCarSlice";
import { addCarToPayment } from "../features/carChoosed/carChoosedSlice";
import { RootState } from "../app/store";
import {
  DAY_NAMES,
  DAY_NAMES_SHORT,
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
} from "../utils/datesName";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { BackBtn } from "../components/BackBtn";

interface MarkedDates {
  [object: string]: {
    startingDay?: boolean;
    color: string;
    endingDay?: boolean;
    selected?: boolean;
  };
}

export function Scheduling() {
  const [daysSelected, setDaysSelected] = useState<Array<string>>([]);
  const [datesMarked, setDatesMarked] = useState({});
  const [hourOfPickUp, setHourOfPickUp] = useState("");
  const [hourOfReturn, setHourOfReturn] = useState("");
  const [toggleWithDriver, setToggleWithDriver] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const today = new Date();

  const { height } = Dimensions.get("screen");
  const { carSendedToModal } = useSelector(
    (state: RootState) => state.modalReducer
  );

  LocaleConfig.locales["en"] = {
    monthNames: MONTH_NAMES,
    monthNamesShort: MONTH_NAMES_SHORT,
    dayNames: DAY_NAMES,
    dayNamesShort: DAY_NAMES_SHORT,
  };
  LocaleConfig.defaultLocale = "en";

  function markedDates() {
    const markedDatesFormatted: MarkedDates = {
      [daysSelected[0]]: {
        startingDay: true,
        color: "#f9864ab5",
      },
    };
    const lastDayOfDates = daysSelected[daysSelected.length - 1];
    // for (let i = initialDay; i <= endDay; i++) {
    //   if (i !== initialDay && i !== endDay) {
    //     markedDatesFormatted[`${customDate[0]}-${customDate[1]}-${i}`] = {
    //       selected: true,
    //       color: "#f9864ab5",
    //     };
    //   }
    // }
    markedDatesFormatted[lastDayOfDates] = {
      endingDay: true,
      color: "#f9864ab5",
    };
    setDatesMarked(markedDatesFormatted);
  }

  function addDayToList(date: string) {
    const index = daysSelected.indexOf(date);
    if (index === -1) {
      setDaysSelected([...daysSelected, date]);
    } else {
      const datesFiltered = daysSelected.filter((current) => current !== date);
      setDaysSelected(datesFiltered);
    }
  }
  function handleGoToPayment() {
    if (daysSelected.length === 0) {
      return Alert.alert("Dates", "Choose your rental dates to proceed.");
    } else if (!hourOfPickUp || !hourOfReturn) {
      return Alert.alert("Required fields", "Fill in the times to continue.");
    } else {
      const initialDay = daysSelected[0];
      const endDay = daysSelected[1];
      const daysRental = Math.abs(
        parseInt(initialDay.split("-")[2]) - parseInt(endDay.split("-")[2])
      );
      dispatch(
        addCarToPayment({
          car: {
            ...carSendedToModal,
            withDriver: toggleWithDriver,
          },
          payment: {
            choosenDays: markedDates.length,
            total: carSendedToModal.pricePerDay * daysRental,
            rentalDays: daysRental,
            initialRental: initialDay,
            endRental: endDay,
          },
        })
      );
      navigation.navigate("Payment");
    }
  }
  useEffect(() => {
    dispatch(changeStatusModal());
    markedDates();
  }, [daysSelected]);
  return (
    <ScrollView backgroundColor="#ffffff">
      <View flex={1} px={4} h={height} mt={getStatusBarHeight()}>
        <BackBtn>
          <Text fontSize={24}>Date & Time</Text>
        </BackBtn>
        <Box
          pb={10}
          borderWidth={1}
          borderColor="#00000033"
          rounded="2xl"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
          pt={4}
          px={1}
        >
          <View flexDirection="column">
            <Text fontSize={22} fontFamily="Inter_500Medium">
              Booking with driver
            </Text>
            <Text fontSize={14} fontFamily="Inter_600SemiBold">
              Don’t have a driver? book with the driver.
            </Text>
          </View>
          <Pressable
            backgroundColor="#00000080"
            rounded="full"
            h={5}
            w={12}
            position="relative"
            onPress={() => {
              setToggleWithDriver(!toggleWithDriver);
            }}
          >
            <Box
              backgroundColor="white"
              borderColor="#00000080"
              borderWidth={2}
              h={7}
              w={7}
              rounded="full"
              position="absolute"
              top={-4}
              right={toggleWithDriver ? 0 : 5}
            />
          </Pressable>
        </Box>
        <Calendar
          style={{ borderWidth: 1, borderColor: "#00000033", marginTop: 24 }}
          initialDate={today.toLocaleDateString()}
          minDate={today.toDateString()}
          monthFormat={"MMMM yyyy"}
          hideArrows={false}
          renderArrow={(direction) => (
            <MaterialIcons
              name={direction === "left" ? "navigate-before" : "navigate-next"}
              size={30}
              color="black"
            />
          )}
          hideExtraDays={true}
          disableMonthChange={true}
          hideDayNames={false}
          showWeekNumbers={false}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          markedDates={datesMarked}
          markingType="period"
          onDayPress={({ dateString }) => {
            addDayToList(dateString);
          }}
          theme={{
            selectedDayBackgroundColor: "#f9864ab5",
            todayTextColor: "#f9864ab5",
          }}
        />
        <View flexDirection="column" pt={8}>
          <Box flexDirection="row" justifyContent="space-between">
            <SelectHour title="Pick-up time" onChangeValue={setHourOfPickUp} />
            <SelectHour title="Return time" onChangeValue={setHourOfReturn} />
          </Box>
          <Button
            bgColor="#f9864a"
            rounded="2xl"
            w="full"
            position="absolute"
            bottom={-80}
            onPress={handleGoToPayment}
            zIndex={50}
          >
            <Text color="#ffffff" fontSize={24} fontFamily="Inter_500Medium">
              Booking
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
