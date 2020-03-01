import React, {useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {useQuery} from "@apollo/react-hooks";
import {Layout, Button, Icon, Modal} from "@ui-kitten/components";
import SpendingCategoriesModal from "./SpendingCategoriesModal";

const SpendingCategoriesWidget = ({categoryId, setCategoryId}) => {
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  // 1. list all the categories
  // 2. edit button

  const openCategoriesModal = () => {
    setShowCategoriesModal(true);
  };
  const closeCategoriesModal = () => {
    setShowCategoriesModal(false);
  };

  const EditCategoriesButton = () => {
    return (
      <Button
        icon={EditIcon}
        size="large"
        onPress={openCategoriesModal}
        appearance="ghost"
        status="basic"
      ></Button>
    );
  };

  const EditIcon = style => <Icon {...style} name="edit" />;

  return (
    <Layout>
      <EditCategoriesButton />
      <SpendingCategoriesModal
        showCategoriesModal={showCategoriesModal}
        setShowCategoriesModal={setShowCategoriesModal}
      />
    </Layout>
  );
};

SpendingCategoriesWidget.propTypes = {
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func.isRequired
};

export default SpendingCategoriesWidget;
