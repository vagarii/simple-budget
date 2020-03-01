import React, {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import * as SecureStore from "expo-secure-store";
import Auth from "./src/Auth";
import Main from "./src/Main";
import {ID_TOKEN_KEY} from "./config";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text
} from "@ui-kitten/components";
import {mapping, dark as darkTheme} from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = (isNewUser = false) => {
    SecureStore.getItemAsync(ID_TOKEN_KEY).then(session => {
      if (session) {
        const sessionObj = JSON.parse(session);
        const {exp, token, id, name} = sessionObj;

        if (exp > Math.floor(new Date().getTime() / 1000)) {
          setToken(token);
          setUser({id, name, isNewUser});
        } else {
          handleLogout();
        }
      }
    });
  };

  const handleLogout = () => {
    SecureStore.deleteItemAsync(ID_TOKEN_KEY);
    setToken(null);
  };

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <Layout style={styles}>
          <Auth token={token} onLogin={handleLogin} onLogout={handleLogout} />
          {token && user && <Main token={token} user={user} />}
        </Layout>
      </ApplicationProvider>
    </React.Fragment>
  );
};

const styles = {
  flex: 1,
  paddingTop: 30
};

export default App;
