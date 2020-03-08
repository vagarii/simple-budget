import React, {useState, Fragment} from "react";
import PropTypes from "prop-types";
import {useQuery} from "@apollo/react-hooks";
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
  TopNavigationAction
} from "@ui-kitten/components";
import {GET_CATEGORY_ICONS} from "../../data/queries";
import IconAvatar from "./IconAvatar";

const IconInventory = ({iconId, setIconId}) => {
  const {
    data: iconsData,
    loading: loadingIcons,
    error: loadingIconsError
  } = useQuery(GET_CATEGORY_ICONS);
  const icons = iconsData?.category_icon ?? [];

  const rows = [];
  for (var i = 0; i < icons.length; i = i + 4) {
    rows.push(icons.slice(i, i + 4));
  }

  const styles = StyleSheet.create({
    container: {
      // marginTop: 12
      alignItems: "center",
      justifyContent: "center",
      // height: 300
      height: rows.length * 87
    },
    row: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      width: 344
    }
  });

  return (
    <ScrollView style={{height: 260}}>
      <Layout style={styles.container}>
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

export default IconInventory;
