import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable, Text } from "native-base";
import { Alert } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useAuth, UserAuthProps } from "../hooks/useAuth";

export function User() {
  const navigation = useNavigation();
  const {setUser} = useAuth();
  
  async function handleLogout(){
    try{
      await GoogleSignin.signOut();
      setUser({} as UserAuthProps);
      await AsyncStorage.removeItem("user");
    }catch(err){
      Alert.alert("Error", "Error to exit");
    } 
  }
  return (
    <Box flex={1} pt={getStatusBarHeight()}>
      <Text
        fontSize={16}
        color="black"
        fontFamily="Inter_600SemiBold"
        w="full"
        justifyContent="center"
        pb={2}
        textTransform="capitalize"
        textAlign="center"
      >
        User
      </Text>
      <Pressable
        flexDirection="row"
        p={2}
        alignItems="center"
        w="full"
        borderWidth={1}
        borderColor="gray.400"
        onPress={() => {
          navigation.navigate("RentalArea");
        }}
      >
        <MaterialIcons name="car-rental" size={34} color="#000000" />
        <Text
          fontSize={16}
          fontFamily="Inter_600SemiBold"
          fontWeight="black"
          ml={2}
        >
          Cars rental
        </Text>
      </Pressable>
      <Pressable
        flexDirection="row"
        p={2}
        alignItems="center"
        w="full"
        borderBottomWidth={1}
        borderColor="gray.400"
        onPress={handleLogout}
      >
        <MaterialIcons name="exit-to-app" size={34} color="#ff0000" />
        <Text
          fontSize={16}
          fontFamily="Inter_600SemiBold"
          fontWeight="black"
          ml={2}
        >
          Exit to app
        </Text>
      </Pressable>
    </Box>
  );
}
