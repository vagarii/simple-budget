import React, {useState, Fragment} from "react";
import PropTypes from "prop-types";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useQuery} from "@apollo/react-hooks";
import {Layout, Button, Icon, Modal, Avatar} from "@ui-kitten/components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CategoryAvatar from "./CategoryAvatar";
import CategoryEditAvatar from "./CategoryEditAvatar.js";
import {GET_SPENDING_CATEGORIES} from "../../data/queries";
import {useNavigation} from "@react-navigation/native";

const CATEGORY_NUMBER_PER_CARD = 7;

const SpendingCategoriesWidget = ({categoryId, setCategoryId}) => {
  const {loading, error, data} = useQuery(GET_SPENDING_CATEGORIES);

  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  const navigation = useNavigation();
  const goToCategoriesPage = () => {
    navigation.navigate("CategoriesPage");
  };

  const {spending_category} = data ?? {};

  const Categories = () => {
    if (data == null || data.length === 0) {
      return null;
    }

    const items = data.spending_category;
    const rows = [];
    for (var i = 0; i < items.length; i = i + 4) {
      rows.push(items.slice(i, i + 4));
    }

    return (
      <Layout style={styles.container}>
        {rows.map((row, index) => (
          <Layout style={styles.row} key={index}>
            {row.map(item => (
              <Fragment key={item.id}>
                <CategoryAvatar
                  item={item}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                />
              </Fragment>
            ))}
            {row.length < 4 && (
              <CategoryEditAvatar onPressEdit={goToCategoriesPage} />
            )}
          </Layout>
        ))}
        {items.length % 4 === 0 && (
          <Layout style={styles.row}>
            <CategoryEditAvatar onPressEdit={goToCategoriesPage} />
          </Layout>
        )}
      </Layout>
    );
  };

  return (
    <Layout>
      <Categories />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 344
  }
});

SpendingCategoriesWidget.propTypes = {
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func.isRequired
};

export default SpendingCategoriesWidget;
