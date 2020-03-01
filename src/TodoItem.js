import React from "react";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";
import {StyleSheet, Text, View} from "react-native";
import {UPDATE_TODO} from "../data/mutations";

const TodoItem = ({item}) => {
  const {id, description} = item;

  // const [
  //   updateTodo,
  //   {loading: updateLoading, error: updateError}
  // ] = useMutation(UPDATE_TODO);
  //
  // if (updateError) return <Text>`Error! ${error.message}`</Text>;

  // <Text
  //   style={[styles.icon, is_completed ? styles.completed : {}]}
  //   onPress={() => {
  //     if (!updateLoading) {
  //       updateTodo({
  //         variables: {id, isCompleted: !is_completed}
  //       });
  //     }
  //   }}
  // >
  //   {is_completed ? "â˜‘" : "â˜’"}
  // </Text>

  return (
    <View style={styles.container}>
      <Text style={styles.item}>{description}</Text>
    </View>
  );
};

TodoItem.propTypes = {
  item: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  item: {
    padding: 10,
    fontSize: 24
  }
});

export default TodoItem;
