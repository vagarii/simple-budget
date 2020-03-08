import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {ApolloProvider} from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import {StyleSheet, ActivityIndicator, Alert, Dimensions} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {GRAPHQL_ENDPOINT} from "../config";
import {INSERT_USER, INSERT_USER_SETTINGS} from "../data/mutations";
import Home from "./screens/Home";
import CategoriesPage from "./screens/CategoriesPage";
import CategoryEditPage from "./screens/CategoryEditPage";
import {Layout, Text, ViewPager} from "@ui-kitten/components";
import {AsyncStorage} from "react-native";
import Store from "./store/Store";

const NavStack = createStackNavigator();

const LOCK_CALENDAR_MIN_WIN_HEIGHT = 800;

const Main = ({user, token, setToken}) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const {id, name, isNewUser} = user;

    const client = new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`
      },
      onError: error => {
        Alert.alert("Error", error);
      }
    });

    if (isNewUser) {
      client.mutate({
        mutation: INSERT_USER,
        variables: {id, name}
      });

      client.mutate({
        mutation: INSERT_USER_SETTINGS,
        variables: {
          user_id: id,
          lock_calendar:
            Dimensions.get("window").height > LOCK_CALENDAR_MIN_WIN_HEIGHT
        }
      });
    }

    setClient(client);
  }, []);

  if (!client) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  Store.save("user", user).then();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <NavStack.Navigator initialRouteName="Home">
          <NavStack.Screen
            name="Home"
            component={Home}
            initialParams={{user, setToken}}
            options={{
              headerStyle: {
                height: 0
              }
            }}
          />
          <NavStack.Screen
            name="CategoriesPage"
            component={CategoriesPage}
            initialParams={user}
            options={{
              headerStyle: {
                height: 0
              }
            }}
          />
          <NavStack.Screen
            name="CategoryEditPage"
            component={CategoryEditPage}
            options={{
              headerStyle: {
                height: 0
              }
            }}
          />
        </NavStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

Main.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default Main;
