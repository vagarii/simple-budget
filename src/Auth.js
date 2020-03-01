import React from "react";
import PropTypes from "prop-types";
import {Alert, StyleSheet} from "react-native";
import {AuthSession} from "expo";
import * as Random from "expo-random";
import * as SecureStore from "expo-secure-store";
import jwtDecoder from "jwt-decode";
import queryString from "query-string";
import {
  AUTH_CLIENT_ID,
  AUTH_DOMAIN,
  AUTH_NAMESPACE,
  ID_TOKEN_KEY,
  NONCE_KEY
} from "../config";
import {Button, Icon} from "@ui-kitten/components";

const generateNonce = async () => {
  const nonce = String.fromCharCode.apply(
    null,
    await Random.getRandomBytesAsync(16)
  );
  await SecureStore.setItemAsync(NONCE_KEY, nonce);
  return nonce;
};

const StarIcon = style => <Icon {...style} name="star" />;

const Auth = ({token, onLogin, onLogout}) => {
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

  return token ? (
    <Button
      style={styles.button}
      onPress={onLogout}
      // icon={StarIcon}
    >
      Logout
    </Button>
  ) : (
    <Button
      style={styles.button}
      onPress={handleLoginPress}
      // icon={StarIcon}
    >
      Login
    </Button>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  button: {
    margin: 8
  }
});

export default Auth;
