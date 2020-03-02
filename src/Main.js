import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {ApolloProvider} from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import {StyleSheet, ActivityIndicator} from "react-native";
import {GRAPHQL_ENDPOINT} from "../config";
import {INSERT_USER} from "../data/mutations";
import AddItemPage from "./AddItemPage";
import {Layout, Text, ViewPager} from "@ui-kitten/components";

const Main = ({token, user}) => {
  const [client, setClient] = useState(null);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  useEffect(() => {
    const {id, name, isNewUser} = user;

    const client = new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`
      },
      onError: error => {
        console.warn(error);
      }
    });

    if (isNewUser) {
      client.mutate({
        mutation: INSERT_USER,
        variables: {id, name}
      });
    }

    setClient(client);
  }, []);

  if (!client) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return (
      <ApolloProvider client={client}>
        <ViewPager
          selectedIndex={selectedPageIndex}
          onSelect={setSelectedPageIndex}
        >
          <Layout style={styles.tab}>
            <AddItemPage user={user} />
          </Layout>
          <Layout style={styles.tab}>
            <Text category="h5">Welcome {user.name}!</Text>
          </Layout>
        </ViewPager>
      </ApolloProvider>
    );
  }
};

Main.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  tab: {
    // height: 192,
    // width: "100%"
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Main;
