import React, {useState} from "react";
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";

const CategoryItem = ({item, user}) => {
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
      <Text category="c2">{`\$${budget_amount} / ${budget_time_duration}`}</Text>
    </Layout>
  );

  const navigation = useNavigation();

  return (
    <Layout style={styles.container}>
      <ListItem
        title={name}
        description={description}
        icon={renderItemIcon}
        accessory={renderItemAccessory}
        onPress={() => {
          navigation.navigate("CategoryEditPage", {item, user});
        }}
      />
    </Layout>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default CategoryItem;
