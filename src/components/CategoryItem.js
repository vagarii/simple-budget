import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, TouchableOpacity} from "react-native";
import {ListItem, Text, Layout} from "@ui-kitten/components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";

const CategoryItem = ({item, user}) => {
  const {
    name: cateName,
    description,
    budget_amount: budgetAmount,
    budget_time_duration: budgetTimeDuration,
    category_icon: cateIcon
  } = item;
  const {name: iconName, color: iconColor} = cateIcon;

  const renderItemIcon = style => (
    <TouchableOpacity
      style={{
        ...styles.icon,
        backgroundColor: iconColor
      }}
    >
      <FontAwesome5 name={iconName} color="white" size={26} solid />
    </TouchableOpacity>
  );

  const renderItemAccessory = () => (
    <Layout style={{alignItems: "flex-end"}}>
      <Text category="s1">{`\$${budgetAmount}`}</Text>
      <Text category="s2">{`/ ${budgetTimeDuration}`}</Text>
    </Layout>
  );

  const navigation = useNavigation();

  return (
    <Layout style={styles.container}>
      <ListItem
        title={cateName}
        titleStyle={{fontSize: 17}}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  }
});

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default CategoryItem;
