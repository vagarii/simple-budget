import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet, ScrollView} from "react-native";
import {Layout, Calendar, Text} from "@ui-kitten/components";
import SpendingItemList from "./SpendingItemList";
import AddSpendingItem from "./AddSpendingItem";
import SpendingCategoriesWidget from "./SpendingCategoriesWidget";

const AddItemPage = ({user}) => {
  const [date, setDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState(null);

  return (
    <Fragment>
      <ScrollView>
        <Layout style={styles.calender}>
          <Calendar date={date} onSelect={setDate} />
        </Layout>
        <SpendingCategoriesWidget
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <AddSpendingItem user={user} date={date} categoryId={categoryId} />
        <SpendingItemList />
      </ScrollView>
    </Fragment>
  );
};

AddItemPage.propTypes = {
  user: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  calender: {
    alignItems: "center",
    justifyContent: "center"
    // minHeight: 376
  }
});

export default AddItemPage;
