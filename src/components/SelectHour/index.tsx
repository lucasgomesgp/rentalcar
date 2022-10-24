import { Box, Select, Text } from "native-base";
import { Dispatch, SetStateAction } from "react";
import { openingHours } from "../../utils/data";

type SelectHourProps = {
  title: string;
  onChangeValue: Dispatch<SetStateAction<string>>;
};

export function SelectHour({ title, onChangeValue }: SelectHourProps) {
  return (
    <Box flexDirection="column">
      <Text fontSize={17} fontFamily="Inter_500Medium">
        {title}
      </Text>
      <Box>
        <Select
          placeholder="Choose"
          onValueChange={(value) => onChangeValue(value)}
          rounded="2xl"
        >
          {openingHours.map((hour) => (
            <Select.Item label={hour} value={hour} key={hour} />
          ))}
        </Select>
      </Box>
    </Box>
  );
}
