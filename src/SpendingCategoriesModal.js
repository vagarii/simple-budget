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

  const closeCategoriesModal = () => {
    setShowCategoriesModal(false);
  };

  return (
    <Modal backdropStyle={styles.backdrop} visible={showCategoriesModal}>
      <Layout level="1" style={styles.modalContainer}>
        {loading ? (
          <Spinner status="basic" />
        ) : (
          <Layout>
            <Button
              icon={CloseIcon}
              size="medium"
              onPress={closeCategoriesModal}
              appearance="ghost"
              status="basic"
            ></Button>
            <List
              data={data.spending_category}
              renderItem={({item}) => <CategoryItem item={item} />}
            />
          </Layout>
        )}
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  }
});

SpendingCategoriesModal.propTypes = {
  showCategoriesModal: PropTypes.bool.isRequired,
  setShowCategoriesModal: PropTypes.func.isRequired
};

export default SpendingCategoriesModal;
