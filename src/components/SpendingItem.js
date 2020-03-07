import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Layout
} from "@ui-kitten/components";
import {DELETE_SPENDING_ITEM} from "../../data/mutations";
import {
  GET_SPENDING_ITEMS,
  GET_SPENDING_ITEMS_AGGREGATE
} from "../../data/queries";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Store from "../store/Store";

const moment = require("moment");

const SpendingItem = ({item, user, date}) => {
  const [range, setRange] = useState(null);

  useEffect(() => {
    Store.get("range").then(range => {
      setRange(range);
    });
  }, []);

  const [deleteSpendingItem, {loading, error}] = useMutation(
    DELETE_SPENDING_ITEM
  );

  const {id, amount, description, category_id, spending_category} = item;
  const {category_icon} = spending_category ?? {};

  const renderItemIcon = style => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: category_icon.color,
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center"
          // marginLeft: 20
        }}
      >
        <FontAwesome5 name={category_icon.name} color="white" size={20} solid />
      </TouchableOpacity>
    );
  };

  const renderItemAccessory = () => (
    <Button
      icon={DeleteIcon}
      style={{width: 30}}
      size="small"
      onPress={deleteItem}
      appearance="ghost"
      status="basic"
    ></Button>
  );

  // TODO: have a library for all the icons
  const DeleteIcon = style => <Icon {...style} name="trash-2" />;

  const deleteItem = () => {
    deleteSpendingItem({
      variables: {
        id: item.id
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
            category_id: category_id ?? 0,
            spending_date_start: range?.startDate ?? 0,
            spending_date_end: range?.endDate ?? 0
          }
        }
      ]
    });
  };

  return (
    <Layout style={styles.container}>
      <ListItem
        title={`\$${item.amount}`}
        description={item.description}
        icon={renderItemIcon}
        accessory={renderItemAccessory}
      />
    </Layout>
  );
};

SpendingItem.propTypes = {
  item: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default SpendingItem;
