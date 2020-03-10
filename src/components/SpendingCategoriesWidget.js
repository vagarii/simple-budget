import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "@apollo/react-hooks";
import {StyleSheet, ScrollView} from "react-native";
import {Layout, Avatar} from "@ui-kitten/components";
import {GET_SPENDING_CATEGORIES} from "../../data/queries";
import CategoryAvatar from "./CategoryAvatar";
import CategoryEditAvatar from "./CategoryEditAvatar.js";
import {useNavigation} from "@react-navigation/native";

const CATEGORY_NUMBER_PER_CARD = 7;

const SpendingCategoriesWidget = ({user, categoryId, setCategoryId}) => {
  const {loading, error, data} = useQuery(GET_SPENDING_CATEGORIES, {
    variables: {user_id: user.id}
  });
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  const navigation = useNavigation();
  const goToCategoriesPage = () => {
    navigation.navigate("CategoriesPage");
  };

  const items = data?.spending_category ?? [];
  const rows = [];
  for (var i = 0; i < items.length; i = i + 4) {
    rows.push(items.slice(i, i + 4));
  }

  const EditAvatar = () => (
    <CategoryEditAvatar
      onPress={goToCategoriesPage}
      text={items.length === 0 ? "Add Category" : "Edit"}
    />
  );

  return (
    <ScrollView style={{height: 204, marginTop: 20}}>
      <Layout style={styles.container}>
        {rows.map((row, index) => (
          <Layout style={styles.row} key={index}>
            {row.map(item => (
              <Layout key={item.id}>
                <CategoryAvatar
                  item={item}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                />
              </Layout>
            ))}
            {row.length < 4 && <EditAvatar />}
          </Layout>
        ))}
        {items.length % 4 === 0 && (
          <Layout style={styles.row}>
            <EditAvatar />
          </Layout>
        )}
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  user: PropTypes.object.isRequired,
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func.isRequired
};

export default SpendingCategoriesWidget;
