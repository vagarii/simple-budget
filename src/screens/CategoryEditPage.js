import React, {useState} from "react";
import PropTypes from "prop-types";
import {useMutation, useQuery} from "@apollo/react-hooks";
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
  INSERT_SPENDING_ITEMS,
  INSERT_SPENDING_CATEGORY
} from "../../data/mutations";
import {
  GET_SPENDING_CATEGORIES,
  GET_SPENDING_ITEMS_FOR_CATEGORY
} from "../../data/queries";
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
  const {item, user} = route.params;
  const isNewCategory = item == null;

  const [name, setName] = useState(item?.name);
  const [description, setDescription] = useState(item?.description);
  const [budgetAmount, setBudgetAmount] = useState(item?.budget_amount);
  const [budgetTimeDuration, setBudgetTimeDuration] = useState({
    text: item?.budget_time_duration
  });
  const [categoryIconId, setCategoryIconId] = useState(
    item?.category_icon?.id ?? 3
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [updateCategory, {loading: saving, error: errorOnSaving}] = useMutation(
    UPDATE_SPENDING_CATEGORY
  );

  const [
    insertCategory,
    {loading: creating, error: errorOnCreating}
  ] = useMutation(INSERT_SPENDING_CATEGORY);

  const [
    deleteCategory,
    {loading: deleting, error: errorOnDeleting}
  ] = useMutation(DELETE_SPENDING_CATEGORY);

  const {
    data: spendingItems,
    loading: querying,
    error: errorQuerying
  } = useQuery(GET_SPENDING_ITEMS_FOR_CATEGORY, {
    variables: {user_id: user.id, category_id: item?.id ?? 0}
  });

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

  const onSaveCategoryItem = () => {
    if (isNewCategory) {
      insertCategory({
        variables: {
          user_id: user.id,
          name: name,
          description: description ?? "",
          budget_amount: budgetAmount,
          budget_time_duration: budgetTimeDuration.text,
          budget_amount_per_day: getBudgetAmountPerDay(),
          icon_id: categoryIconId
        },
        refetchQueries: [{query: GET_SPENDING_CATEGORIES}]
      });
    } else {
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
    }
    navigation.goBack();
  };

  const onShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const onHideDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const onDeleteCategoryItem = () => {
    deleteCategory({
      variables: {
        id: item?.id
      },
      refetchQueries: [{query: GET_SPENDING_CATEGORIES}]
    });
    navigation.goBack();
  };

  const SaveIcon = style => <Icon {...style} name="save" />;
  const DeleteIcon = style => <Icon {...style} name="trash-2" />;

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
            status="info"
            icon={SaveIcon}
            style={styles.button}
            onPress={onSaveCategoryItem}
            disabled={
              saving ||
              deleting ||
              name == null ||
              budgetAmount == null ||
              budgetTimeDuration.text == null ||
              categoryIconId == null
            }
          >
            Save
          </Button>
          {item != null && (
            <Button
              icon={DeleteIcon}
              status="danger"
              style={styles.button}
              onPress={onShowDeleteModal}
              disabled={saving || deleting}
            >
              Delete
            </Button>
          )}
        </Layout>
      </Layout>
      <Modal
        backdropStyle={styles.backdrop}
        onBackdropPress={onHideDeleteModal}
        visible={showDeleteModal}
      >
        {spendingItems?.spending_item == null ||
        spendingItems?.spending_item.length === 0 ? (
          <Layout style={styles.modalContainer}>
            <Text category="s1">{`Are you sure to delete category`}</Text>
            <Text category="h6">{`"${item?.name}" ?`}</Text>
            <Button
              icon={DeleteIcon}
              status="danger"
              style={styles.button}
              onPress={onDeleteCategoryItem}
              disabled={saving || deleting}
            >
              Delete
            </Button>
          </Layout>
        ) : (
          <Layout style={styles.modalContainer}>
            <Text category="s1">
              {`Sorry. You cannot delete this category because there are spending records under this category. `}
              {`Please try editing this category to update the information. `}
              {`If you still want to delete this category you would need to delete all the spending records under it first. `}
              {`Thank you.`}
            </Text>
          </Layout>
        )}
      </Modal>
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
  button: {
    marginTop: 12,
    width: 344
    // backgroundColor: "blue",
    // padding: 13
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 344,
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  }
});

export default CategoryEditPage;
