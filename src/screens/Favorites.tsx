import { Box, Text } from "native-base";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function Favorites() {
  return (
    <Box flex={1} pt={getStatusBarHeight()}>
      <Text>Favorites</Text>
    </Box>
  );
}
