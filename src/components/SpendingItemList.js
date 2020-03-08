import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "@apollo/react-hooks";
import {StyleSheet} from "react-native";
import {Layout, List, Text, Spinner} from "@ui-kitten/components";
import {GET_SPENDING_ITEMS} from "../../data/queries";
import SpendingItem from "./SpendingItem";

const moment = require("moment");

const SpendingItemList = ({user, date}) => {
  const {loading, error, data} = useQuery(GET_SPENDING_ITEMS, {
    variables: {
      user_id: user.id,
      spending_date_start: moment(date).startOf("day"),
      spending_date_end: moment(date).endOf("day")
    }
  });

  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  return (
    <Layout style={styles.container}>
      {loading ? (
        <Spinner status="basic" />
      ) : (
        <List
          {...flatlistProps}
          data={data.spending_item}
          renderItem={({item}) => (
            <SpendingItem item={item} user={user} date={date} />
          )}
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
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 150
  }
});

SpendingItemList.propTypes = {
  user: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};

export default SpendingItemList;
