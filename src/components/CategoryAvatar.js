import React, {useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Layout, Button, Icon, Modal, Avatar, Text} from "@ui-kitten/components";
import IconAvatar from "./IconAvatar";

const CategoryAvatar = ({item, categoryId, setCategoryId}) => {
  const {id, name, category_icon} = item;

  return (
    <Layout style={styles.container}>
      <IconAvatar
        icon={category_icon}
        isSelected={id === categoryId}
        onSelect={() => setCategoryId(id)}
      />
      <Text
        style={{width: 80, textAlign: "center", fontSize: 11}}
        color="gray"
        category="c1"
      >
        {name}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
});

CategoryAvatar.propTypes = {
  item: PropTypes.object.isRequired,
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func.isRequired
};

export default CategoryAvatar;
