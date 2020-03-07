import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {Input, Layout, Text, Button} from "@ui-kitten/components";
import {INSERT_SPENDING_ITEMS} from "../../data/mutations";
import {
  GET_SPENDING_ITEMS,
  GET_SPENDING_ITEMS_AGGREGATE
} from "../../data/queries";
import Store from "../store/Store";

const moment = require("moment");

const AddSpendingItem = ({user, date, categoryId, setCategoryId}) => {
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);
  const [range, setRange] = useState(null);

  const [insertSpendingItem, {loading, error}] = useMutation(
    INSERT_SPENDING_ITEMS
  );

  if (error) return <Text>`Error! ${error.message}`</Text>;

  useEffect(() => {
    Store.get("range").then(range => {
      setRange(range);
    });
  }, []);

  console.warn(range);

  return (
    <Layout style={styles.container}>
      <TextInput
        style={{
          fontSize: 25,
          color: "white",
          marginTop: 12,
          width: 100,
          height: 50,
          borderColor: "white",
          borderWidth: 0,
          borderBottomWidth: 2
        }}
        textAlign="center"
        placeholder="$"
        placeholderTextColor="grey"
        onChangeText={setAmount}
        value={amount}
      />
      <TextInput
        style={{
          fontSize: 13,
          color: "gray",
          marginTop: 12,
          width: 344,
          height: 30,
          borderColor: "gray",
          borderWidth: 0,
          borderBottomWidth: 1
        }}
        textAlign="center"
        placeholder="Description"
        placeholderTextColor="grey"
        textColor="White"
        onChangeText={setDescription}
        value={description}
      />
      <Button
        style={styles.button}
        status="info"
        onPress={() => {
          insertSpendingItem({
            variables: {
              description: description ?? "",
              category_id: categoryId,
              amount: amount,
              user_id: user.id,
              spending_date: moment(date).startOf("day")
            },
            refetchQueries: [
              {
                query: GET_SPENDING_ITEMS,
                variables: {
                  user_id: user.id,
                  spending_date_start: moment(date).startOf("day"),
                  spending_date_end: moment(date).endOf("day")
                }
              },
              {
                query: GET_SPENDING_ITEMS_AGGREGATE,
                variables: {
                  category_id: categoryId,
                  spending_date_start: range?.startDate ?? 0,
                  spending_date_end: range?.endDate ?? 0
                }
              }
            ]
          });
          setAmount(null);
          setCategoryId(null);
          setDescription(null);
        }}
        disabled={loading || amount == null || categoryId == null}
      >
        Save
      </Button>
    </Layout>
  );
};

const textInputProps = {
  borderWidth: 0
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  button: {
    marginTop: 12,
    width: 344
    // backgroundColor: "blue",
    // padding: 13
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }
});

// AddSpendingItem.propTypes = {
//   user: PropTypes.object.isRequired,
//   date: PropTypes.date,
//   categoryId: PropTypes.number
// };

export default AddSpendingItem;
