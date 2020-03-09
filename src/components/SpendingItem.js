import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Button, Icon, ListItem, Layout} from "@ui-kitten/components";
import {
  GET_SPENDING_ITEMS,
  GET_SPENDING_ITEMS_AGGREGATE,
  GET_SPENDING_ITEMS_FOR_CATEGORY
} from "../../data/queries";
import {DELETE_SPENDING_ITEM} from "../../data/mutations";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Store from "../store/Store";

const moment = require("moment");

const DeleteIcon = style => <Icon {...style} name="trash-2" />;

const SpendingItem = ({item, user, date}) => {
  const [range, setRange] = useState(null);

  useEffect(() => {
    Store.get("range").then(range => {
      setRange(range);
    });
  }, []);

  const [deleteSpendingItem, {deleting, errorOnDeleting}] = useMutation(
    DELETE_SPENDING_ITEM
  );

  const {id, amount, description, category_id, spending_category} = item;
  const {category_icon} = spending_category ?? {};

  const renderItemIcon = style => {
    return (
      <TouchableOpacity
        style={{
          ...styles.avadar,
          backgroundColor: category_icon.color
        }}
      >
        <FontAwesome5 name={category_icon.name} color="white" size={22} solid />
      </TouchableOpacity>
    );
  };

  const renderItemAccessory = () => (
    <Button
      icon={DeleteIcon}
      style={{width: 40}}
      onPress={deleteItem}
      appearance="ghost"
      status="basic"
    ></Button>
  );

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
        },
        {
          query: GET_SPENDING_ITEMS_FOR_CATEGORY,
          variables: {
            user_id: user.id,
            category_id: category_id ?? 0
          }
        }
      ]
    });
  };

  return (
    <Layout style={styles.container}>
      <ListItem
        title={`\$${item.amount}`}
        titleStyle={{fontSize: 15}}
        description={item.description}
        icon={renderItemIcon}
        accessory={renderItemAccessory}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 368
  },
  avadar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  }
});

SpendingItem.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};

export default SpendingItem;
