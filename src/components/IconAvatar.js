import React, {useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Layout, Button, Icon, Modal, Avatar, Text} from "@ui-kitten/components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ICON_SIZE = 35;

const IconAvatar = ({icon, isSelected, onSelect}) => {
  const {id, name, color, color2} = icon;

  const styles = StyleSheet.create({
    avatar: {
      borderWidth: isSelected ? 4 : 0,
      borderColor: color2,
      backgroundColor: color,
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: "center",
      justifyContent: "center",
      margin: 8,
      marginBottom: 4
    }
  });

  const onSelectThisCategory = () => {
    setCategoryId(id);
  };

  return (
    <TouchableOpacity style={styles.avatar} onPress={onSelect}>
      <FontAwesome5 name={name} color="white" size={ICON_SIZE} solid />
    </TouchableOpacity>
  );
};

IconAvatar.propTypes = {
  icon: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default IconAvatar;
