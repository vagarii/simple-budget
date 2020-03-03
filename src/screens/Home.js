import React, {useState, useEffect} from "react";
import HomePage from "./HomePage";
import {StyleSheet, ActivityIndicator} from "react-native";
import {Layout, Text, ViewPager} from "@ui-kitten/components";

const Home = ({route}) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  const user = route.params;

  return (
    <ViewPager
      selectedIndex={selectedPageIndex}
      onSelect={setSelectedPageIndex}
    >
      <Layout style={styles.pager}>
        <HomePage user={user} />
      </Layout>
      <Layout style={styles.pager}>
        <Text category="h5">Welcome {user.name}!</Text>
      </Layout>
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  pager: {
    // height: 192,
    // width: "100%"
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Home;
