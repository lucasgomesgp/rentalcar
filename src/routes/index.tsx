import { NavigationContainer } from "@react-navigation/native";
import { HomeRoutes } from "./home.routes";
import { LoggedRoutes } from "./logged.routes";

export function AppRoutes() {
  const user = false;
  return (
    <NavigationContainer>
      {user ? <LoggedRoutes /> : <HomeRoutes />}
    </NavigationContainer>
  );
}
