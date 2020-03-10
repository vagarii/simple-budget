import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {StyleSheet} from "react-native";
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

  const [insertSpendingItem, {inserting, errorOnInserting}] = useMutation(
    INSERT_SPENDING_ITEMS
  );
  if (errorOnInserting)
    return <Text>`Error! ${errorOnInserting.message}`</Text>;

  useEffect(() => {
    Store.get("range").then(range => {
      setRange(range);
    });
  }, []);

  const onSave = () => {
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
  };

  const DollarIcon = () => (
    <FontAwesome5
      style={{marginLeft: 4, marginRight: 12, marginBottom: 4}}
      name="dollar-sign"
      color="#AEB6BF"
      size={18}
      solid
    />
  );

  const NoteIcon = () => (
    <FontAwesome5
      style={{marginLeft: 4, marginRight: 10, marginBottom: 4}}
      name="clipboard"
      color="#AEB6BF"
      size={18}
      light
    />
  );

  const SaveButton = () => (
    <Button
      style={styles.button}
      status="info"
      size="large"
      onPress={onSave}
      disabled={inserting || amount == null || categoryId == null}
    >
      Save
    </Button>
  );

  return (
    <Layout style={styles.container}>
      <Layout style={{...styles.row, marginTop: 20}}>
        <DollarIcon />
        <Input
          size="large"
          style={{width: 316}}
          placeholder="0.00"
          fontSize={20}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          textAlign="center"
          maxLength={8}
        />
      </Layout>
      <Layout style={{...styles.row, marginTop: 12}}>
        <NoteIcon />
        <Input
          style={{width: 316}}
          placeholder="Note"
          fontSize={13}
          value={description}
          onChangeText={setDescription}
          textAlign="center"
          maxLength={35}
        />
      </Layout>
      <SaveButton />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    marginTop: 12,
    width: 344
  }
});

AddSpendingItem.propTypes = {
  user: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func.isRequired
};

export default AddSpendingItem;
