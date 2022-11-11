import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "native-base";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AntDesign } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { ActivityIndicator, Alert } from "react-native";
import { useAuth } from "../hooks/useAuth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
      forceCodeForRefreshToken: true,
    });
  }, []);
  async function handleSignIn() {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const {
        user: { id, email, name, familyName, givenName, photo },
      } = await GoogleSignin.signIn();
      setUser({
        id,
        email,
        name,
        photo,
        familyName,
        givenName,
      });
      const value = JSON.stringify({
        id,
        email,
        name,
        photo,
        familyName,
        givenName,
      })
      await AsyncStorage.setItem("user",value);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Image
        source={require("../assets/car.png")}
        h="full"
        w="full"
        position="absolute"
        alt="Car"
        top={0}
        flex={1}
      />
      <Text
        pt={getStatusBarHeight() + 10}
        fontSize={32}
        fontWeight="bold"
        fontFamily="Inter_600SemiBold"
        color="#FFFFFF"
      >
        Welcome to Rental App
      </Text>
      <Pressable
        mt={80}
        width={300}
        borderRadius={10}
        backgroundColor="red.800"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        padding={4}
        onPress={handleSignIn}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="large" />
        ) : (
          <>
            <AntDesign name="google" size={32} color="white" />
            <Text color="#FFFFFF" fontSize={18} fontWeight="bold" ml={4}>
              Login with Google
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
