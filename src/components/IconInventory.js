import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "@apollo/react-hooks";
import {StyleSheet, ScrollView} from "react-native";
import {Layout} from "@ui-kitten/components";
import {GET_CATEGORY_ICONS} from "../../data/queries";
import IconAvatar from "./IconAvatar";

const ROW_HEIGHT = 86;

const IconInventory = ({iconId, setIconId}) => {
  const {
    data: iconsData,
    loading: loadingIcons,
    error: errorOnLoadingIcons
  } = useQuery(GET_CATEGORY_ICONS);

  const icons = iconsData?.category_icon ?? [];

  const rows = [];
  for (var i = 0; i < icons.length; i = i + 4) {
    rows.push(icons.slice(i, i + 4));
  }

  return (
    <ScrollView style={{height: 260}}>
      <Layout style={{...styles.container, height: rows.length * ROW_HEIGHT}}>
        {rows.map((row, index) => (
          <Layout style={styles.row} key={index}>
            {row.map(item => (
              <Layout key={item.id}>
                <IconAvatar
                  icon={item}
                  isSelected={iconId === item.id}
                  onSelect={() => setIconId(item.id)}
                />
              </Layout>
            ))}
          </Layout>
        ))}
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 344
  }
});

IconInventory.propTypes = {
  iconId: PropTypes.number,
  setIconId: PropTypes.func.isRequired
};

export default IconInventory;
