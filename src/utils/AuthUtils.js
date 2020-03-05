import * as SecureStore from "expo-secure-store";
import {ID_TOKEN_KEY} from "../../config";

const logout = () => {
  SecureStore.deleteItemAsync(ID_TOKEN_KEY);
};

export {logout};
