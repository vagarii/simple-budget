import React from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {StyleSheet, Text, View} from "react-native";
import {UPDATE_TODO} from "../data/mutations";
import {Button, Icon, List, ListItem} from "@ui-kitten/components";
// import {DELETE_SPENDING_ITEM} from "../data/mutations";
import {GET_SPENDING_CATEGORIES} from "../data/queries";

const CategoryItem = ({item}) => {
  // const [insertCategoryItem, {loading, error}] = useMutation(
  //   DELETE_SPENDING_ITEM
  // );

  const {id, name, description, category_icon} = item;

  const renderItemIcon = style => <Icon {...style} name={category_icon.name} />;

  const renderItemAccessory = itemId => (
    <Button
      icon={DeleteIcon}
      size="small"
      onPress={{}}
      appearance="ghost"
      status="basic"
    ></Button>
  );

  const DeleteIcon = style => <Icon {...style} name="trash-2" />;
  //
  // const deleteItem = () => {
  //   insertCategoryItem({
  //     variables: {
  //       id: item.id
  //     },
  //     refetchQueries: [{query: GET_SPENDING_CATEGORIES}]
  //   });
  // };

  return (
    <View style={styles.container}>
      <ListItem
        title={name}
        description={description}
        icon={renderItemIcon}
        accessory={renderItemAccessory}
      />
    </View>
  );
};

CategoryItem.propTypes = {
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

export default CategoryItem;
