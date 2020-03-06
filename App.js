import React, {useState, useEffect, Fragment} from "react";
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
import {logout} from "./src/utils/AuthUtils";

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
    logout();
    setToken(null);
  };

  return (
    <Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <Layout style={styles}>
          {token && user ? (
            <Main user={user} token={token} setToken={setToken} />
          ) : (
            <Auth token={token} onLogin={handleLogin} />
          )}
        </Layout>
      </ApplicationProvider>
    </Fragment>
  );
};

const styles = {
  flex: 1,
  paddingTop: 30
};

export default App;
