import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {FlatList, StyleSheet, View, ActivityIndicator} from "react-native";
import {
  Layout,
  Button,
  Icon,
  List,
  ListItem,
  Text
} from "@ui-kitten/components";
import SpendingItem from "./SpendingItem";
import {GET_SPENDING_ITEMS} from "../../data/queries";

const SpendingItemList = () => {
  const {loading, error, data} = useQuery(GET_SPENDING_ITEMS);

  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  return (
    <Layout style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <List
          style={styles.list}
          {...flatlistProps}
          data={data.spending_item}
          renderItem={({item}) => <SpendingItem item={item} />}
        />
      )}
    </Layout>
  );
};

const flatlistProps = {
  scrollEnabled: false
};

const styles = StyleSheet.create({
  container: {
    // width: 300,
    // height: 500
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 150
  },
  list: {
    // height: 5000
  }
});

export default SpendingItemList;
