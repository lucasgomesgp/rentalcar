import { Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export function BtnOpenAll({...rest}: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...rest}>
      <Text color="orange.500" fontSize={16} fontFamily="Inter_600SemiBold">
        See All
      </Text>
    </TouchableOpacity>
  );
}
