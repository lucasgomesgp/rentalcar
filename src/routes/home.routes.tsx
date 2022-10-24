import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Presentation } from "../screens/Presentation";
import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createNativeStackNavigator();

export function HomeRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false, statusBarTranslucent: true }}
    >
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
