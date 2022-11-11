import {
  useFonts,
  Inter_700Bold,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { THEME } from "./src/utils/theme";
import { AppRoutes } from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { ActivityIndicator } from "react-native";
import { UserProvider } from "./src/hooks/useAuth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={32} />;
  }

  return (
    <UserProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NativeBaseProvider theme={THEME}>
            <StatusBar style="light" translucent />
            <AppRoutes />
          </NativeBaseProvider>
        </GestureHandlerRootView>
      </Provider>
    </UserProvider>
  );
}
