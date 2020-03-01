import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {StyleSheet, ScrollView} from "react-native";
import {Layout, Calendar, Text} from "@ui-kitten/components";
import SpendingItemList from "./SpendingItemList";
import AddSpendingItem from "./AddSpendingItem";

const AddItemPage = ({user}) => {
  const [date, setDate] = React.useState(new Date());

  return (
    <Fragment>
      <ScrollView>
        <Layout style={styles.calender}>
          <Calendar date={date} onSelect={setDate} />
        </Layout>
        <AddSpendingItem user={user} date={date} />
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
