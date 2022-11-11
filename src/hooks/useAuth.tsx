import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface UserAuthProps {
  email: string;
  id: string;
  name: string;
  photo: string;
  familyName: string;
  givenName: string;
}

interface User {
  user: UserAuthProps;
  setUser: Dispatch<SetStateAction<UserAuthProps>>;
}

interface Props {
  children: ReactNode;
}
const UserContext = createContext({} as User);
function UserProvider({ children }: Props) {
  const [user, setUser] = useState({} as UserAuthProps);

  async function getUserLogged() {
    try {
      const userLogged: UserAuthProps = JSON.parse(
        await AsyncStorage.getItem("user")
      );
      if (userLogged?.email) {
        setUser(userLogged);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserLogged();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useAuth() {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
}

export { UserContext, UserProvider, useAuth };
