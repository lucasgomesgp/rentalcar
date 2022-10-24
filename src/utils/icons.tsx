import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export function iconsMenu(route: string, focused: boolean) {
  const color = focused ? "#FFD233" : "gray";

  switch (route) {
    case "Home":
      return <MaterialIcons name="location-pin" size={32} color={color} />;
    case "Favorites":
      return (
        <MaterialCommunityIcons name="heart-outline" size={32} color={color} />
      );
    case "Alerts":
      return <Ionicons name="notifications" size={32} color={color} />;
    case "User":
      return <Octicons name="person-fill" size={32} color={color} />;
    case "Modal":
      return null;
    default:
      return;
  }
}
