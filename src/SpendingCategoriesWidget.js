import React, {useState, Fragment} from "react";
import PropTypes from "prop-types";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useQuery} from "@apollo/react-hooks";
import {
  Layout,
  Button,
  Icon,
  Modal,
  Avatar,
  ViewPager
} from "@ui-kitten/components";
import SpendingCategoriesModal from "./SpendingCategoriesModal";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CategoryAvatar from "./CategoryAvatar";
import CategoryEditAvatar from "./CategoryEditAvatar.js";
import {GET_SPENDING_CATEGORIES} from "../data/queries";

const CATEGORY_NUMBER_PER_CARD = 7;

const SpendingCategoriesWidget = ({categoryId, setCategoryId}) => {
  const {loading, error, data} = useQuery(GET_SPENDING_CATEGORIES);

  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [selectedPageIdx, setSelectedPageIdx] = React.useState(0);

  const {spending_category} = data ?? {};

  const Categories = () => {
    if (data == null || data.length === 0) {
      return null;
    }
    const pageIdxList = [];
    const pageCount =
      spending_category.length % 7 === 0
        ? spending_category.length / 7
        : spending_category.length / 7 + 1;
    for (var i = 0; i < pageCount; i++) {
      pageIdxList.push(i);
    }
    return (
      <ViewPager selectedIndex={selectedPageIdx} onSelect={setSelectedPageIdx}>
        {pageIdxList.map(idx => (
          <Fragment key={idx}>
            <CategoriesCard
              style={styles.categoryPage}
              pageIdx={selectedPageIdx}
            />
          </Fragment>
        ))}
      </ViewPager>
    );
  };

  const CategoriesCard = ({pageIdx}) => {
    const startIdx = CATEGORY_NUMBER_PER_CARD * pageIdx;
    const entIdx =
      CATEGORY_NUMBER_PER_CARD * (pageIdx + 1) <= spending_category.length
        ? CATEGORY_NUMBER_PER_CARD * (pageIdx + 1)
        : spending_category.length;
    const items = data.spending_category.slice(startIdx, entIdx);
    const itemsRow1 = items.slice(0, 4);
    const itemsRow2 = items.slice(4, 7);

    return (
      <Layout style={styles.container}>
        <Layout style={styles.row}>
          {itemsRow1.map(item => (
            <Fragment key={item.id}>
              <CategoryAvatar item={item} setCategoryId={setCategoryId} />
            </Fragment>
          ))}
          {itemsRow1.length < 4 && (
            <CategoryEditAvatar onPressEdit={openCategoriesModal} />
          )}
        </Layout>
        <Layout style={styles.row}>
          {itemsRow2.map(item => (
            <Fragment key={item.id}>
              <CategoryAvatar item={item} setCategoryId={setCategoryId} />
            </Fragment>
          ))}
          {itemsRow1.length >= 4 && (
            <CategoryEditAvatar onPressEdit={openCategoriesModal} />
          )}
        </Layout>
      </Layout>
    );
  };

  const openCategoriesModal = () => {
    setShowCategoriesModal(true);
  };
  const closeCategoriesModal = () => {
    setShowCategoriesModal(false);
  };

  return (
    <Layout>
      <Categories />
      <SpendingCategoriesModal
        showCategoriesModal={showCategoriesModal}
        setShowCategoriesModal={setShowCategoriesModal}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  categoryPage: {
    height: 200,
    width: 344
  }
});

SpendingCategoriesWidget.propTypes = {
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func.isRequired
};

export default SpendingCategoriesWidget;
