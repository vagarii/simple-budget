import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "@apollo/react-hooks";
import {StyleSheet, Dimensions} from "react-native";
import {
  Layout,
  Button,
  Icon,
  Modal,
  Text,
  List,
  Spinner,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
import CategoryItem from "../components/CategoryItem";
import {GET_SPENDING_CATEGORIES} from "../../data/queries";
import {useNavigation} from "@react-navigation/native";

const CategoriesPage = ({route}) => {
  const user = route.params;

  const {loading, error, data} = useQuery(GET_SPENDING_CATEGORIES, {
    variables: {user_id: user.id}
  });
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  const BackIcon = style => <Icon {...style} name="arrow-back" />;

  const navigation = useNavigation();
  const backAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  const AddIcon = style => <Icon {...style} name="plus" />;

  const CategoriesContent = () => (
    <Layout>
      <Layout style={styles.list}>
        <List
          style={{backgroundColor: "#242B43"}}
          data={data.spending_category}
          renderItem={({item}) => <CategoryItem item={item} user={user} />}
        />
      </Layout>
      <Layout style={styles.bottomBar}>
        <Button
          style={styles.addButton}
          icon={AddIcon}
          size="medium"
          onPress={() => {
            navigation.navigate("CategoryEditPage", {user});
          }}
          status="info"
        >
          New Category
        </Button>
      </Layout>
    </Layout>
  );

  return (
    <Layout>
      <TopNavigation
        style={{height: 60}}
        leftControl={backAction()}
        title="My Categories"
      />
      <Layout style={styles.container}>
        {loading ? <Spinner status="basic" /> : <CategoriesContent />}
      </Layout>
    </Layout>
  );
};

const winWidth = Dimensions.get("window").width; //full width
const winHeight = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: winWidth,
    height: winHeight - 60,
    padding: 16
  },
  list: {
    height: winHeight - 190
  },
  bottomBar: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 60
  },
  addButton: {
    width: 344
  }
});

export default CategoriesPage;
