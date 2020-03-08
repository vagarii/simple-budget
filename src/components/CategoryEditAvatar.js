import React, {useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Layout, Button, Icon, Modal, Avatar, Text} from "@ui-kitten/components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const CategoryEditAvatar = ({onPressEdit}) => {
  const EditIcon = style => <Icon {...style} name={"edit"} size={30} />;

  return (
    <Layout style={styles.container}>
      <Button
        style={styles.avatar}
        icon={EditIcon}
        size="large"
        onPress={onPressEdit}
        appearance="ghost"
        status="basic"
      ></Button>
      <Text color="gray" category="c1">
        Edit
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    marginBottom: 4
  }
});

CategoryEditAvatar.propTypes = {
  onPressEdit: PropTypes.func.isRequired
};

export default CategoryEditAvatar;
