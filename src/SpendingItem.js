import React from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {StyleSheet, Text, View} from "react-native";
import {UPDATE_TODO} from "../data/mutations";
import {Button, Icon, List, ListItem} from "@ui-kitten/components";
import DeleteIcon from "../assets/close-circle-outline.png";
import {DELETE_SPENDING_ITEM} from "../data/mutations";
import {GET_SPENDING_ITEMS} from "../data/queries";

const SpendingItem = ({item}) => {
  const [insertSpendingItem, {loading, error}] = useMutation(
    DELETE_SPENDING_ITEM
  );

  const {id, description} = item;

  const renderItemIcon = style => <Icon {...style} name="person" />;

  const renderItemAccessory = itemId => (
    <Button
      style={{}}
      icon={DeleteIcon}
      size="small"
      onPress={deleteItem}
    ></Button>
  );

  const DeleteIcon = style => <Icon {...style} name="home" />;

  const deleteItem = () => {
    insertSpendingItem({
      variables: {
        id: item.id
      },
      refetchQueries: [{query: GET_SPENDING_ITEMS}]
    });
  };

  return (
    <View style={styles.container}>
      <ListItem
        title={item.amount}
        description={item.description}
        icon={renderItemIcon}
        accessory={renderItemAccessory}
      />
    </View>
  );
};

SpendingItem.propTypes = {
  item: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  item: {
    padding: 10,
    fontSize: 24
  }
});

export default SpendingItem;
