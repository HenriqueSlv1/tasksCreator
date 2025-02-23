import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "../types/User";
import Toast from "react-native-root-toast";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

type UserContextProps = {
  token: string;
  setToken: (token: string) => void;
  getToken: () => void;
  user: UserDTO | null;
  setUser: (user: UserDTO) => void;
  getUser: () => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  googleSignIn: () => void;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserDTO | null>(null);

  const storeToken = async (value: string) => {
    try {
      await AsyncStorage.setItem("@token", value);
    } catch (e) {
      Toast.show("Não foi possível salvar o token", {
        duration: 5000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      Toast.show("Não foi possível recuperar o token", {
        duration: 5000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const storeUser = async (value: UserDTO) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user", jsonValue);
    } catch (e) {
      Toast.show("Não foi possível salvar os dados do usuário", {
        duration: 5000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUser(data);
    } catch (e) {
      Toast.show("Não foi possível buscar o usuário", {
        duration: 5000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const login = async (username: string, password: string) => {
    /*
    try {
      const url = "https://dummyjson.com/auth/login";
      const response = await axios.post<UserDTO>(url, {
        username,
        password,
      });

      if (response) {
        setUser(response.data);
        setToken(response.data.token);
        storeToken(response.data.token);
        storeUser(response.data);
      }
    } catch (error) {
      Toast.show("Não foi possível realizar o login", {
        duration: 5000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }*/

    const mock = {
      id: 1,
      username: "henriqu_slv",
      email: "henriquesilvarosa80@gmail.com",
      firstName: "henrique ",
      lastName: "da silva",
      gender: "male",
      image: "https://avatars.githubusercontent.com/u/107499899?s=400&u=4a234a192af7e1dec3c65f3ab65dc8bcf358c36a&v=4",
      token: "a1b2c3d4e5f6",
    };
    setUser(mock);
    setToken(mock.token);
    storeToken(mock.token);
    storeUser(mock);
  };

  const googleSignIn = async () => {
    console.log('entrou')
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
 //  await GoogleSignin.signOut();
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        getToken,
        user,
        setUser,
        getUser,
        login,
        googleSignIn,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
