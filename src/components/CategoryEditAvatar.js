import React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {Layout, Button, Icon, Text} from "@ui-kitten/components";

const EditIcon = style => <Icon {...style} name={"edit"} size={30} />;

const CategoryEditAvatar = ({onPress, text}) => {
  return (
    <Layout style={styles.container}>
      <Button
        style={styles.avatar}
        icon={EditIcon}
        size="large"
        onPress={onPress}
        appearance="ghost"
        status="basic"
      ></Button>
      <Text color="gray" category="c1">
        {text}
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
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default CategoryEditAvatar;
