import React, {useState} from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {
  Button,
  Icon,
  Input,
  List,
  ListItem,
  Text,
  Modal,
  Select,
  Layout,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
import {
  DELETE_SPENDING_CATEGORY,
  UPDATE_SPENDING_CATEGORY,
  INSERT_SPENDING_ITEMS
} from "../../data/mutations";
import {GET_SPENDING_CATEGORIES} from "../../data/queries";
import {useNavigation} from "@react-navigation/native";

/** TODO: use enum from the database **/
const DurationData = [
  {text: "YEAR"},
  {text: "QUARTER"},
  {text: "MONTH"},
  {text: "WEEK"},
  {text: "DAY"}
];

const CategoryEditPage = ({route}) => {
  const {item} = route.params;
  console.warn(item);

  const [name, setName] = useState(item?.name);
  const [description, setDescription] = useState(item?.description);
  const [budgetAmount, setBudgetAmount] = useState(item?.budget_amount);
  const [budgetTimeDuration, setBudgetTimeDuration] = useState({
    text: item?.budget_time_duration
  });
  const [categoryIconId, setCategoryIconId] = useState(item?.category_icon?.id);

  // const [deleteCategory, {loading, error}] = useMutation(
  //   DELETE_SPENDING_CATEGORY
  // );
  const [updateCategory, {loading, error}] = useMutation(
    UPDATE_SPENDING_CATEGORY
  );

  /** TODO: move to utils **/
  const getBudgetAmountPerDay = () => {
    if (budgetAmount == null || budgetTimeDuration == null) {
      return null;
    }
    var budgetPerDay;
    switch (budgetTimeDuration) {
      case "YEAR":
        return String(Number(budgetAmount) / 365);
      case "QUARTER":
        return String(Number(budgetAmount) / 91);
      case "MONTH":
        return String(Number(budgetAmount) / 30);
      case "WEEK":
        return String(Number(budgetAmount) / 7);
      default:
        return budgetAmount;
    }
  };

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

  // const DeleteIcon = style => <Icon {...style} name="trash-2" />;

  // const deleteCategoryItem = () => {
  //   deleteCategory({
  //     variables: {
  //       id: item.id
  //     },
  //     refetchQueries: [{query: GET_SPENDING_CATEGORIES}]
  //   });
  // };

  const CloseIcon = style => <Icon {...style} name="close" />;
  console.warn(budgetTimeDuration);
  return (
    <Layout>
      <TopNavigation leftControl={backAction()} title="Edit Category" />
      <Layout style={styles.container}>
        <Layout>
          <TextInput
            style={{
              fontSize: 25,
              color: "white",
              marginTop: 12,
              width: 344,
              height: 50,
              borderColor: "white",
              borderWidth: 0,
              borderBottomWidth: 2
            }}
            textAlign="center"
            placeholder="Name"
            placeholderTextColor="grey"
            onChangeText={setName}
            value={name}
          />

          <TextInput
            style={{
              fontSize: 20,
              color: "gray",
              marginTop: 12,
              width: 344,
              height: 30,
              borderColor: "gray",
              borderWidth: 0,
              borderBottomWidth: 1
            }}
            textAlign="center"
            placeholder="Description"
            placeholderTextColor="grey"
            textColor="White"
            onChangeText={setDescription}
            value={description}
          />
          <Layout style={styles.targetAmountRow}>
            <Input
              style={{
                width: 160,
                marginRight: 8
              }}
              placeholder="Target Budget Amount"
              value={budgetAmount}
              onChangeText={setBudgetAmount}
            />
            <Text category="h5">/</Text>
            <Select
              style={styles.targetAmountDuration}
              data={DurationData}
              placeholder="Time Duration"
              selectedOption={budgetTimeDuration}
              onSelect={setBudgetTimeDuration}
            />
          </Layout>
          <Button
            style={styles.saveButton}
            onPress={() => {
              updateCategory({
                variables: {
                  id: item?.id,
                  name: name,
                  description: description ?? "",
                  budget_amount: budgetAmount,
                  budget_time_duration: budgetTimeDuration.text,
                  budget_amount_per_day: getBudgetAmountPerDay(),
                  icon_id: categoryIconId
                },
                refetchQueries: [{query: GET_SPENDING_CATEGORIES}]
              });
            }}
            disabled={
              // loading ||
              item == null ||
              name == null ||
              budgetAmount == null ||
              budgetTimeDuration == null ||
              categoryIconId == null
            }
          >
            Save
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

const winWidth = Dimensions.get("window").width; //full width
const winHeight = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: winWidth,
    height: winHeight,
    padding: 16
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  targetAmountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12
  },
  targetAmountDuration: {
    width: 160,
    marginLeft: 8,
    paddingBottom: 4
  },
  saveButton: {
    marginTop: 12,
    width: 344
    // backgroundColor: "blue",
    // padding: 13
  }
});

export default CategoryEditPage;
