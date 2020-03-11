import React from "react";
import PropTypes from "prop-types";
import {AuthSession} from "expo";
import * as Random from "expo-random";
import * as SecureStore from "expo-secure-store";
import jwtDecoder from "jwt-decode";
import queryString from "query-string";
import {Alert, StyleSheet, Dimensions, Image} from "react-native";
import {
  AUTH_CLIENT_ID,
  AUTH_DOMAIN,
  AUTH_NAMESPACE,
  ID_TOKEN_KEY,
  NONCE_KEY
} from "../config";
import {Button, Icon, Layout, Text} from "@ui-kitten/components";

const generateNonce = async () => {
  const nonce = String.fromCharCode.apply(
    null,
    await Random.getRandomBytesAsync(16)
  );
  await SecureStore.setItemAsync(NONCE_KEY, nonce);
  return nonce;
};

const Auth = ({token, onLogin}) => {
  const handleLoginPress = async () => {
    const nonce = await generateNonce();
    AuthSession.startAsync({
      authUrl:
        `${AUTH_DOMAIN}/authorize?` +
        queryString.stringify({
          client_id: AUTH_CLIENT_ID,
          response_type: "id_token",
          scope: "openid profile email",
          redirect_uri: AuthSession.getRedirectUrl(),
          nonce
        })
    }).then(result => {
      if (result.type === "success") {
        decodeToken(result.params.id_token);
      } else if (result.params && result.params.error) {
        Alert.alert(
          "Error",
          result.params.error_description ||
            "Something went wrong while logging in."
        );
      }
    });
  };

  const decodeToken = token => {
    const decodedToken = jwtDecoder(token);
    const {nonce, sub, name, exp} = decodedToken;

    SecureStore.getItemAsync(NONCE_KEY).then(storedNonce => {
      if (nonce == storedNonce) {
        SecureStore.setItemAsync(
          ID_TOKEN_KEY,
          JSON.stringify({
            id: sub,
            name,
            exp,
            token
          })
        ).then(() => onLogin(decodedToken[AUTH_NAMESPACE].isNewUser));
      } else {
        Alert.alert("Error", "Nonces don't match");
        return;
      }
    });
  };

  return (
    <Layout style={styles.container}>
      <Image
        source={require("./assets/transPiggy.png")}
        style={{width: 221, height: 271, marginBottom: 32}}
      />
      <Button
        style={styles.button}
        onPress={handleLoginPress}
        status="basic"
        size="large"
      >
        Login
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height
  },
  text: {
    marginBottom: 30
  },
  button: {
    width: 148
  }
});

Auth.propTypes = {
  token: PropTypes.string,
  onLogin: PropTypes.func.isRequired
};

export default Auth;
