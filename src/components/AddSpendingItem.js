import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {StyleSheet} from "react-native";
import {Input, Layout, Text, Button} from "@ui-kitten/components";
import {INSERT_SPENDING_ITEMS} from "../../data/mutations";
import {GET_SPENDING_ITEMS} from "../../data/queries";
import {getIfValidNumber} from "../utils/utils";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const moment = require("moment");

const AddSpendingItem = ({user, date, categoryId, setCategoryId}) => {
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);

  const [insertSpendingItem, {inserting, errorOnInserting}] = useMutation(
    INSERT_SPENDING_ITEMS
  );
  if (errorOnInserting)
    return <Text>`Error! ${errorOnInserting.message}`</Text>;

  const onSave = () => {
    const startOfDate = moment(date).startOf("day");
    const endOfDate = moment(date).endOf("day");
    if (
      categoryId == null ||
      amount == null ||
      user?.id == null ||
      date == null ||
      startOfDate == null
    ) {
      return;
    }
    insertSpendingItem({
      variables: {
        description: description ?? "",
        category_id: categoryId,
        amount: amount,
        user_id: user.id,
        spending_date: startOfDate
      },
      refetchQueries: [
        {
          query: GET_SPENDING_ITEMS,
          variables: {
            user_id: user.id,
            spending_date_start: startOfDate,
            spending_date_end: endOfDate
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
      disabled={
        inserting || amount == null || amount.length === 0 || categoryId == null
      }
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
          size="large"
          style={{width: 316}}
          placeholder="Note"
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
