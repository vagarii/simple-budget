import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet, ScrollView} from "react-native";
import {Layout, Calendar, Text, Datepicker, Icon} from "@ui-kitten/components";
import SpendingItemList from "../components/SpendingItemList";
import AddSpendingItem from "../components/AddSpendingItem";
import SpendingCategoriesWidget from "../components/SpendingCategoriesWidget";

const HomePage = ({user}) => {
  const [date, setDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState(null);

  const CalendarIcon = style => <Icon {...style} name="calendar" />;

  return (
    <Layout>
      <ScrollView>
        <Layout style={styles.calenderContainer}>
          <Datepicker
            style={styles.calender}
            date={date}
            onSelect={setDate}
            icon={CalendarIcon}
          />
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
  calenderContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  calender: {
    width: 344
  }
});

export default HomePage;
