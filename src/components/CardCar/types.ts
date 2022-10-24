import { ImageSourcePropType } from "react-native";

export type CarTypes = {
  _id?: string;
  name?: string;
  stars?: string;
  photo?: ImageSourcePropType;
  pricePerDay?: number;
  renter?: {
    _id?: string;
    name?: string;
    phoneNumber?: string;
    photo?: string;
  };
  passangers?: number;
  doors?: number;
  airConditioning?: boolean;
  fuelFull?: boolean;
  isAutomatic?: boolean;
  topSpeed?: number;
  maxPower?: number;
  mph?: number;
};

export type BrandTypes = {
  _id?: string;
  logo?: string;
  name?: string;
};
