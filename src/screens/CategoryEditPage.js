import React, {useState, Fragment} from "react";
import PropTypes from "prop-types";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
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
  TopNavigationAction,
  Tooltip
} from "@ui-kitten/components";
import {
  DELETE_SPENDING_CATEGORY,
  UPDATE_SPENDING_CATEGORY,
  INSERT_SPENDING_ITEMS,
  INSERT_SPENDING_CATEGORY
} from "../../data/mutations";
import {
  GET_SPENDING_CATEGORIES,
  GET_SPENDING_ITEMS_FOR_CATEGORY,
  GET_CATEGORY_ICONS
} from "../../data/queries";
import {useNavigation} from "@react-navigation/native";
import IconInventory from "../components/IconInventory";

/** TODO: use enum from the database **/
const DurationData = [
  {text: "YEAR"},
  {text: "QUARTER"},
  {text: "MONTH"},
  {text: "WEEK"},
  {text: "DAY"}
];

const INFO_TEXT =
  "This is the target budget you would like to contribute to this category. " +
  "For example, if you'd like to spend $200 every quarter, " +
  'you can put "200" in the Target Budget cell and choose "QUARTER" in the selector.';

const CategoryEditPage = ({route}) => {
  const {item, user} = route.params;
  const isNewCategory = item == null;

  const [name, setName] = useState(item?.name);
  const [description, setDescription] = useState(item?.description);
  const [budgetAmount, setBudgetAmount] = useState(item?.budget_amount);
  const [budgetTimeDuration, setBudgetTimeDuration] = useState({
    text: item?.budget_time_duration
  });
  const [iconId, setIconId] = useState(item?.category_icon?.id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
          icon_id: iconId
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
          icon_id: iconId
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
  const InfoIcon = style => <Icon {...style} name="info" />;

  const onInfoIconPress = () => {
    if (showInfo) {
      setShowInfo(false);
    } else {
      setShowInfo(true);
    }
  };

  return (
    <Layout>
      <TopNavigation leftControl={backAction()} title="Edit Category" />
      <Layout style={styles.container}>
        <IconInventory iconId={iconId} setIconId={setIconId} />
        <Input
          style={{
            width: 344,
            marginTop: 20
          }}
          fontSize={20}
          // size="large"
          placeholder="Category Name"
          value={name}
          onChangeText={setName}
        />
        <Input
          style={{
            width: 344,
            marginTop: 12
          }}
          fontSize={12}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Layout style={styles.targetAmountRow}>
          <Tooltip
            style={{height: 84, width: 344}}
            visible={showInfo}
            text={INFO_TEXT}
            onBackdropPress={onInfoIconPress}
            backdropStyle={styles.infoBackdrop}
          >
            <Button
              style={{width: 30, height: 30}}
              onPress={onInfoIconPress}
              icon={InfoIcon}
              status="basic"
              appearance="ghost"
            ></Button>
          </Tooltip>
          <Input
            style={{
              width: 144,
              marginRight: 8
            }}
            // icon={renderInfoIcon}
            // onIconPress={onInfoIconPress}
            placeholder="Target Budget"
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
            iconId == null
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
    minHeight: winHeight - 260,
    marginTop: 8,
    marginBottom: 300
  },
  targetAmountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12
  },
  targetAmountDuration: {
    width: 144,
    marginLeft: 8,
    paddingBottom: 4,
    marginRight: 8
  },
  button: {
    marginTop: 20,
    width: 344
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  },
  infoBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 344,
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  }
});

export default CategoryEditPage;
