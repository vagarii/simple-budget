import React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {Layout, Text} from "@ui-kitten/components";
import IconAvatar from "./IconAvatar";

const CategoryAvatar = ({item, categoryId, setCategoryId}) => {
  const {id, name, category_icon: cateIcon} = item;

  return (
    <Layout style={styles.container}>
      <IconAvatar
        icon={cateIcon}
        isSelected={id === categoryId}
        onSelect={() => setCategoryId(id)}
      />
      <Text style={styles.text} color="gray" category="c1">
        {name}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    width: 80,
    textAlign: "center",
    fontSize: 11
  }
});

CategoryAvatar.propTypes = {
  item: PropTypes.object.isRequired,
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func.isRequired
};

export default CategoryAvatar;
