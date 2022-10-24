import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrderCompleted } from "../screens/OrderCompleted";
import { Payment } from "../screens/Payment";
import { Presentation } from "../screens/Presentation";
import { RentalArea } from "../screens/RentalArea";
import { Scheduling } from "../screens/Scheduling";
import { Tabs } from "./tabs.routes";

const { Navigator, Screen } = createNativeStackNavigator();

export function LoggedRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false, statusBarTranslucent: true }}
    >
      <Screen name="Presentation" component={Presentation} />
      <Screen name="Tabs" component={Tabs} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="Payment" component={Payment} />
      <Screen name="OrderCompleted" component={OrderCompleted} />
      <Screen name="RentalArea" component={RentalArea} />
    </Navigator>
  );
}
