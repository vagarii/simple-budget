import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {StyleSheet, ScrollView} from "react-native";
import {Layout, Calendar, Datepicker, Icon} from "@ui-kitten/components";
import SpendingItemList from "../components/SpendingItemList";
import AddSpendingItem from "../components/AddSpendingItem";
import SpendingCategoriesWidget from "../components/SpendingCategoriesWidget";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const moment = require("moment");

const CalendarIcon = style => <Icon {...style} name="calendar" />;

const HomePage = ({user, lockCalendar}) => {
  const [date, setDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState(null);

  return (
    <KeyboardAwareScrollView>
      <Layout>
        <ScrollView>
          <Layout style={styles.calenderContainer}>
            {lockCalendar ? (
              <Calendar
                style={styles.calender}
                date={date}
                onSelect={setDate}
                icon={CalendarIcon}
              />
            ) : (
              <Datepicker
                size="large"
                style={styles.calender}
                date={date}
                onSelect={setDate}
                icon={CalendarIcon}
              />
            )}
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
    </KeyboardAwareScrollView>
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
