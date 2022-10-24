export default {
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
    },
    {
      name: "isAutomatic",
      title: "Automatic",
      type: "boolean",
    },
    {
      name: "renter",
      title: "Renter",
      type: "reference",
      to: [{type: "renter"}]
    },
    {
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{type: "brand"}]
    },
    {
      name: "pricePerDay",
      title: "Price per Day",
      type: "number",
    },
    {
      name: "stars",
      title: "Stars",
      type: "string",
    },
    {
      name: "passangers",
      title: "Passangers",
      type: "number",
    },
    {
      name: "airConditioning",
      title: "Air Conditioning",
      type: "boolean",
    },
    {
      name: "doors",
      title: "Doors",
      type: "number"
    },
    {
      name: "fuelFull",
      title: "Fuel Full",
      type: "boolean",
    },
    {
      name: "maxPower",
      title: "Max Power",
      type: "number",
    },
    {
      name: "mph",
      title: "0-60 Mph",
      type: "number",
    },
    {
      name: "topSpeed",
      title: "Top Speed",
      type: "number",
    },
  ],
};
