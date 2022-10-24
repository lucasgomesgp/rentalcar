import { client } from "../../sanity";

export async function getDataFromServer(query: string) {
  try {
    const result = await client.fetch(query);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

type MutationCarProps = {
  name: string;
  paymentMethod: string;
  statusComplete: boolean;
  start: string;
  end: string; 
}

export async function createRentalCar(mutation: MutationCarProps) {
  try {
    const result = await client.fetch(
      `https://${process.env.SANITY_STUDIO_API_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/rental`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN_READ_WRITE}`,
        },
        body: JSON.stringify({mutation}),
      }
    );
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}
export const openingHours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "11:30",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const installments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
