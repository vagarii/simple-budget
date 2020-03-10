import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "@apollo/react-hooks";
import {StyleSheet, Dimensions} from "react-native";
import {
  Layout,
  Button,
  Icon,
  Text,
  List,
  Spinner,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
import CategoryItem from "../components/CategoryItem";
import {GET_SPENDING_CATEGORIES} from "../../data/queries";
import {useNavigation} from "@react-navigation/native";

const BackIcon = style => <Icon {...style} name="arrow-back" />;
const AddIcon = style => <Icon {...style} name="plus" />;

const CategoriesPage = ({route}) => {
  const user = route.params;

  const {loading, error, data} = useQuery(GET_SPENDING_CATEGORIES, {
    variables: {user_id: user.id}
  });
  // TODO: formalize graphql erros, make a component for it and reuse
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  const navigation = useNavigation();
  const backAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  const CategoriesContent = () => (
    <Layout>
      <Layout style={styles.list}>
        <List
          style={{backgroundColor: "rgba(0,0,0,0)"}}
          data={data.spending_category}
          renderItem={({item}) => <CategoryItem item={item} user={user} />}
        />
      </Layout>
      <Layout style={styles.bottomBar}>
        <Button
          style={styles.addButton}
          icon={AddIcon}
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
        titleStyle={{fontSize: 18}}
        leftControl={backAction()}
        title="My Categories"
        alignment="center"
      />
      <Layout style={styles.container}>
        {loading ? <Spinner status="basic" /> : <CategoriesContent />}
      </Layout>
    </Layout>
  );
};

const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: winWidth,
    height: winHeight - 60,
    padding: 16
  },
  list: {
    height: winHeight - 170
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

CategoriesPage.propTypes = {
  route: PropTypes.object.isRequired
};

export default CategoriesPage;
