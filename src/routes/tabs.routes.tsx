import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alerts } from "../screens/Alerts";
import { Favorites } from "../screens/Favorites";
import { Home } from "../screens/Home";
import { User } from "../screens/User";
import { iconsMenu } from "../utils/icons";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const { Navigator, Screen } = createBottomTabNavigator();

export function Tabs() {
  const { modalIsOpen } = useSelector((state: RootState) => state.modalReducer);
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => iconsMenu(route.name, focused),
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: modalIsOpen ? { display: "none" } : {},
      })}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Favorites" component={Favorites} />
      <Screen name="Alerts" component={Alerts} />
      <Screen name="User" component={User} />
    </Navigator>
  );
}
