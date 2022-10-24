import { getDataFromServer } from "./data";

export const GET_ALL_VEHICLES = `*[_type == 'vehicle']{
        ...,
        renter->
      }`;
export const GET_ALL_BRANDS = `*[_type == 'brand']{
    ...,
  }`;

export const GET_ALL_FLAGS = `*[_type == 'flags']{
    ...,
  }`;

export async function getSpecificFlag(flag: string) {
  try {
    const query = `*[_type == 'flags' && name == "${flag}"]{
      ...,
    }[0]`;
    const data = await getDataFromServer(query);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getCarWithSpecificBrand(brand: string) {
  try {
    const query = `*[_type == 'vehicle' && brand->name=="${brand}"]{
      ...,
    renter->,
    }`;
    const carList = await getDataFromServer(query);
    return carList;
  } catch (err) {
    console.log(err);
    return [];
  }
}
