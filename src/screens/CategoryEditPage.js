import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {StyleSheet, Dimensions, ScrollView} from "react-native";
import {
  Button,
  Icon,
  Input,
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
  INSERT_SPENDING_CATEGORY
} from "../../data/mutations";
import {
  GET_CATEGORY_MAX_ORDER,
  GET_SPENDING_CATEGORIES,
  GET_CATEGORY_SPENDING_ITEM_COUNT
} from "../../data/queries";
import {useNavigation} from "@react-navigation/native";
import IconInventory from "../components/IconInventory";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {getBudgetAmountPerDay} from "../utils/utils";

const BackIcon = style => <Icon {...style} name="arrow-back" />;
const SaveIcon = style => <Icon {...style} name="save" />;
const DeleteIcon = style => <Icon {...style} name="trash-2" />;
const InfoIcon = style => <Icon {...style} name="info" />;

const INFO_TEXT =
  "This is the target budget you would like to contribute to this category. " +
  "For example, if you'd like to spend $200 every quarter, " +
  'you can put "200" in the Target Budget cell and choose "QUARTER" in the selector.';

const INFO_TEXT_CANNOT_DELETE =
  "Sorry. You cannot delete this category because there are spending records under this category. \n\n" +
  "Please try editing this category to update the information. \n\n" +
  "If you still want to delete this category you would need to delete all the spending records under it first. \n\n" +
  "Thank you.";

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
  const [budgetAmountStr, setBudgetAmountStr] = useState(
    item?.budget_amount == null ? null : String(item?.budget_amount)
  );
  const [budgetDuration, setBudgetDuration] = useState(
    item?.budget_time_duration
  );
  const [iconId, setIconId] = useState(item?.category_icon?.id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [
    insertCategory,
    {loading: inserting, error: errorOnInserting}
  ] = useMutation(INSERT_SPENDING_CATEGORY);

  const [
    updateCategory,
    {loading: updating, error: errorOnUpdating}
  ] = useMutation(UPDATE_SPENDING_CATEGORY);

  const [
    deleteCategory,
    {loading: deleting, error: errorOnDeleting}
  ] = useMutation(DELETE_SPENDING_CATEGORY);

  const {
    data: spendingItemCount,
    loading: queryingSpendingItemCount,
    error: errorOnQueryingSpendingItemCount,
    refetch: refetchSpendingItemCount
  } = useQuery(GET_CATEGORY_SPENDING_ITEM_COUNT, {
    variables: {category_id: item?.id ?? 0}
  });

  const {
    data: cateMaxOrder,
    loading: queryingMaxOrder,
    error: errorOnQueryingMaxOrder
  } = useQuery(GET_CATEGORY_MAX_ORDER, {
    variables: {user_id: user.id}
  });
  const curMaxOrder =
    cateMaxOrder?.spending_category_aggregate?.aggregate?.max?.order;

  useEffect(() => {
    refetchSpendingItemCount();
  }, []);

  const mutationInProcess = inserting || updating || deleting;
  const validValues =
    name != null &&
    budgetAmountStr != null &&
    budgetDuration != null &&
    iconId != null;

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
      if (
        user?.id == null ||
        name == null ||
        budgetAmountStr == null ||
        budgetDuration == null ||
        iconId == null
      ) {
        return;
      }
      insertCategory({
        variables: {
          user_id: user.id,
          name: name,
          description: description ?? "",
          budget_amount: parseFloat(budgetAmountStr),
          budget_time_duration: budgetDuration,
          budget_amount_per_day: getBudgetAmountPerDay(
            budgetAmountStr,
            budgetDuration
          ),
          icon_id: iconId,
          order: curMaxOrder == null ? 1 : curMaxOrder + 1
        },
        refetchQueries: [
          {query: GET_SPENDING_CATEGORIES, variables: {user_id: user.id}},
          {query: GET_CATEGORY_MAX_ORDER, variables: {user_id: user.id}}
        ]
      });
    } else {
      if (
        item?.id == null ||
        name == null ||
        budgetAmountStr == null ||
        budgetDuration == null ||
        iconId == null
      ) {
        return;
      }
      updateCategory({
        variables: {
          id: item?.id,
          name: name,
          description: description ?? "",
          budget_amount: parseFloat(budgetAmountStr),
          budget_time_duration: budgetDuration,
          budget_amount_per_day: getBudgetAmountPerDay(
            budgetAmountStr,
            budgetDuration
          ),
          icon_id: iconId
        },
        refetchQueries: [
          {query: GET_SPENDING_CATEGORIES, variables: {user_id: user.id}}
        ]
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
    if (item?.id == null) {
      return;
    }
    deleteCategory({
      variables: {
        id: item?.id
      },
      refetchQueries: [
        {query: GET_SPENDING_CATEGORIES, variables: {user_id: user.id}},
        {query: GET_CATEGORY_MAX_ORDER, variables: {user_id: user.id}}
      ]
    });
    setShowDeleteModal(false);
    navigation.goBack();
  };

  const onInfoIconPress = () => {
    if (showInfo) {
      setShowInfo(false);
    } else {
      setShowInfo(true);
    }
  };

  const categoryStillHasSpendingItem =
    spendingItemCount != null &&
    spendingItemCount.spending_category.length > 0 &&
    spendingItemCount.spending_category[0]?.spending_items_aggregate?.aggregate
      ?.count > 0;

  const DeleteModal = () => (
    <Modal
      backdropStyle={styles.backdrop}
      onBackdropPress={onHideDeleteModal}
      visible={showDeleteModal}
    >
      {!categoryStillHasSpendingItem ? (
        <Layout style={styles.modalContainer}>
          <Text category="s1">{`Are you sure to delete category`}</Text>
          <Text category="h6">{`"${item?.name}" ?`}</Text>
          <Button
            icon={DeleteIcon}
            status="danger"
            style={styles.button}
            onPress={onDeleteCategoryItem}
            disabled={mutationInProcess}
          >
            Delete
          </Button>
        </Layout>
      ) : (
        <Layout style={styles.modalContainer}>
          <Text category="s1">{INFO_TEXT_CANNOT_DELETE}</Text>
        </Layout>
      )}
    </Modal>
  );

  const InfoButton = () => (
    <Tooltip
      style={{height: 84, width: 344}}
      visible={showInfo}
      text={INFO_TEXT}
      onBackdropPress={onInfoIconPress}
      backdropStyle={styles.infoBackdrop}
    >
      <Button
        style={{width: 30, height: 30, marginBottom: 4}}
        onPress={onInfoIconPress}
        icon={InfoIcon}
        status="basic"
        appearance="ghost"
      ></Button>
    </Tooltip>
  );

  const SaveButton = () => (
    <Button
      status="info"
      icon={SaveIcon}
      style={styles.button}
      onPress={onSaveCategoryItem}
      disabled={mutationInProcess || !validValues}
    >
      Save
    </Button>
  );

  const DeleteButtonOrPlaceholder = () =>
    !isNewCategory ? (
      <Button
        icon={DeleteIcon}
        status="danger"
        style={styles.button}
        onPress={onShowDeleteModal}
        disabled={mutationInProcess}
      >
        Delete
      </Button>
    ) : (
      <Layout style={{height: 52}} />
    );

  return (
    <Layout>
      <TopNavigation
        leftControl={backAction()}
        title="Edit Category"
        titleStyle={{fontSize: 18}}
        alignment="center"
      />
      <KeyboardAwareScrollView extraScrollHeight={92}>
        <Layout style={styles.container}>
          <IconInventory iconId={iconId} setIconId={setIconId} />
          <Input
            style={{
              width: 344,
              marginTop: 16
            }}
            fontSize={18}
            placeholder="Category Name"
            value={name}
            onChangeText={setName}
            maxLength={16}
          />
          <Input
            style={{
              width: 344,
              marginTop: 12
            }}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            maxLength={45}
          />
          <Layout style={styles.targetAmountRow}>
            <InfoButton />
            <Input
              style={{
                width: 144,
                marginRight: 8
              }}
              placeholder="Target Budget"
              value={budgetAmountStr}
              onChangeText={setBudgetAmountStr}
              keyboardType="numeric"
              maxLength={8}
            />
            <Text category="h5">/</Text>
            <Select
              style={styles.targetAmountDuration}
              data={DurationData}
              placeholder="Period"
              selectedOption={{text: budgetDuration}}
              onSelect={selectedItem => setBudgetDuration(selectedItem.text)}
            />
          </Layout>
          <SaveButton />
          <DeleteButtonOrPlaceholder />
        </Layout>
      </KeyboardAwareScrollView>
      <DeleteModal />
    </Layout>
  );
};

const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: winWidth,
    minHeight: winHeight - 260,
    marginBottom: 500
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
    marginTop: 16,
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

CategoryEditPage.propTypes = {
  route: PropTypes.object.isRequired
};

export default CategoryEditPage;
