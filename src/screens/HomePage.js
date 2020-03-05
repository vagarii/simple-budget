import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet, ScrollView} from "react-native";
import {Layout, Calendar, Text} from "@ui-kitten/components";
import SpendingItemList from "../components/SpendingItemList";
import AddSpendingItem from "../components/AddSpendingItem";
import SpendingCategoriesWidget from "../components/SpendingCategoriesWidget";

const HomePage = ({user}) => {
  const [date, setDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState(null);

  return (
    <Layout>
      <ScrollView>
        <Layout style={styles.calender}>
          <Calendar date={date} onSelect={setDate} />
        </Layout>
        <SpendingCategoriesWidget
          user={user}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <AddSpendingItem
          user={user}
          date={date}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <SpendingItemList user={user} date={date} />
      </ScrollView>
    </Layout>
  );
};

HomePage.propTypes = {
  user: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  calender: {
    alignItems: "center",
    justifyContent: "center"
    // minHeight: 376
  }
});

export default HomePage;
