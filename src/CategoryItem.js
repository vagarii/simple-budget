import React from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {UPDATE_TODO} from "../data/mutations";
import {
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Layout
} from "@ui-kitten/components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import {DELETE_SPENDING_CATEGORY} from "../data/mutations";
import {GET_SPENDING_CATEGORIES} from "../data/queries";

const CategoryItem = ({item}) => {
  // const [deleteCategory, {loading, error}] = useMutation(
  //   DELETE_SPENDING_CATEGORY
  // );

  const {
    id,
    name,
    description,
    budget_amount,
    budget_time_duration,
    category_icon
  } = item;

  const renderItemIcon = style => (
    <TouchableOpacity
      style={{
        backgroundColor: category_icon.color,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <FontAwesome5 name={category_icon.name} color="white" size={22} solid />
    </TouchableOpacity>
  );

  const renderItemAccessory = () => (
    <Layout>
      <Text category="c2">{`${budget_amount} / ${budget_time_duration}`}</Text>
    </Layout>
  );

  // const DeleteIcon = style => <Icon {...style} name="trash-2" />;

  // const deleteCategoryItem = () => {
  //   deleteCategory({
  //     variables: {
  //       id: item.id
  //     },
  //     refetchQueries: [{query: GET_SPENDING_CATEGORIES}]
  //   });
  // };

  return (
    <Layout style={styles.container}>
      <ListItem
        title={name}
        description={description}
        icon={renderItemIcon}
        accessory={renderItemAccessory}
      />
    </Layout>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default CategoryItem;
