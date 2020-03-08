import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Keyboard,
  UIManager
} from "react-native";
import {Input, Layout, Text, Button} from "@ui-kitten/components";
import {INSERT_SPENDING_ITEMS} from "../../data/mutations";
import {
  GET_SPENDING_ITEMS,
  GET_SPENDING_ITEMS_AGGREGATE
} from "../../data/queries";
import Store from "../store/Store";
import {getIfValidNumber} from "../utils/utils";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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

  return (
    <Layout style={styles.container}>
      <Layout
        style={{flexDirection: "row", alignItems: "center", marginTop: 30}}
      >
        <FontAwesome5
          style={{marginLeft: 4, marginRight: 8, marginBottom: 4}}
          name="dollar-sign"
          color="white"
          size={18}
          solid
        />
        <Input
          size="large"
          style={{width: 320}}
          placeholder="0.00"
          fontSize={20}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          textAlign="center"
          maxLength={8}
        />
      </Layout>
      <Layout
        style={{flexDirection: "row", alignItems: "center", marginTop: 12}}
      >
        <FontAwesome5
          style={{marginLeft: 4, marginRight: 8, marginBottom: 4}}
          name="clipboard"
          color="white"
          size={18}
          light
        />
        <Input
          style={{width: 320}}
          placeholder="Note"
          fontSize={13}
          value={description}
          onChangeText={setDescription}
          textAlign="center"
          maxLength={35}
        />
      </Layout>
      <Button
        style={styles.button}
        status="info"
        size="large"
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
