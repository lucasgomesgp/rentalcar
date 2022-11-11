import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { HomeRoutes } from "./home.routes";
import { LoggedRoutes } from "./logged.routes";

export function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <NavigationContainer>
      {user.email ? <LoggedRoutes /> : <HomeRoutes />}
    </NavigationContainer>
  );
}
