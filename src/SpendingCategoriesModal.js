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
  Spinner
} from "@ui-kitten/components";
import CategoryItem from "./CategoryItem";
import {GET_SPENDING_CATEGORIES} from "../data/queries";

const SpendingCategoriesModal = ({
  showCategoriesModal,
  setShowCategoriesModal
}) => {
  const {loading, error, data} = useQuery(GET_SPENDING_CATEGORIES);

  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  const CloseIcon = style => <Icon {...style} name="close" />;
  const AddIcon = style => <Icon {...style} name="plus" />;

  const closeCategoriesModal = () => {
    setShowCategoriesModal(false);
  };

  const CategoriesPage = () => (
    <Layout>
      <Layout style={styles.header}>
        <Text category="h5">My Categories</Text>
        <Button
          style={styles.cancelButton}
          icon={CloseIcon}
          size="large"
          onPress={closeCategoriesModal}
          appearance="ghost"
          status="basic"
        ></Button>
      </Layout>
      <Layout style={styles.list}>
        <List
          style={{backgroundColor: "#242B43"}}
          data={data.spending_category}
          renderItem={({item}) => <CategoryItem item={item} />}
        />
      </Layout>
      <Layout style={styles.bottomBar}>
        <Button
          style={styles.addButton}
          icon={AddIcon}
          size="medium"
          onPress={closeCategoriesModal}
          status="info"
        >
          New Category
        </Button>
      </Layout>
    </Layout>
  );

  return (
    <Modal visible={showCategoriesModal}>
      <Layout style={styles.modalContainer}>
        {loading ? <Spinner status="basic" /> : <CategoriesPage />}
      </Layout>
    </Modal>
  );
};

const winWidth = Dimensions.get("window").width; //full width
const winHeight = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
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
  list: {
    height: winHeight - 140
  },
  bottomBar: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  cancelButton: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  addButton: {
    width: 344
  }
});

SpendingCategoriesModal.propTypes = {
  showCategoriesModal: PropTypes.bool.isRequired,
  setShowCategoriesModal: PropTypes.func.isRequired
};

export default SpendingCategoriesModal;
