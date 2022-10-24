import { Dispatch, SetStateAction } from "react";

export type ModalCreditCardProps = {
  statusModal: boolean;
  setModalClose: Dispatch<SetStateAction<boolean>>;
};

export type FormDataType = {
  fullName: string;
  cardNumber: string;
  validity: string;
  securityNumber: string;
  installments: string;
  flag: string;
};
export type FlagType = {
  _id: string;
  name: string;
  label: string;
  photo: string;
};
