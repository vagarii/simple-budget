import React, {useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Layout, Button, Icon, Modal, Avatar, Text} from "@ui-kitten/components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const CATEGORY_ICON_SIZE = 35;

const CategoryAvatar = ({item, setCategoryId}) => {
  const {id, name, description, category_icon} = item;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center"
    },
    avatar: {
      backgroundColor: category_icon.color,
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: "center",
      justifyContent: "center",
      margin: 8,
      marginBottom: 4
    }
  });

  const onSelectThisCategory = () => {
    setCategoryId(id);
  };

  return (
    <Layout style={styles.container}>
      <TouchableOpacity style={styles.avatar} onPress={onSelectThisCategory}>
        <FontAwesome5
          name={category_icon.name}
          color="white"
          size={CATEGORY_ICON_SIZE}
          solid
        />
      </TouchableOpacity>
      <Text color="gray" category="c1">
        {name}
      </Text>
    </Layout>
  );
};

CategoryAvatar.propTypes = {
  item: PropTypes.object.isRequired,
  setCategoryId: PropTypes.func.isRequired
};

export default CategoryAvatar;
