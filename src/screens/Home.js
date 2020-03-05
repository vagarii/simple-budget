import React, {useState, useEffect} from "react";
import HomePage from "./HomePage";
import * as SecureStore from "expo-secure-store";
import {StyleSheet, ActivityIndicator} from "react-native";
import {
  Layout,
  Text,
  ViewPager,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Button,
  OverflowMenu
} from "@ui-kitten/components";
import {ID_TOKEN_KEY} from "../../config";

const Home = ({route}) => {
  const {user, setToken} = route.params;

  const handleLogout = () => {
    SecureStore.deleteItemAsync(ID_TOKEN_KEY);
    setToken(null);
  };

  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = React.useState(null);

  const onMenuItemSelect = index => {
    setSelectedMenuIndex(index);
    setMenuVisible(false);
    if (index === 0) {
      handleLogout();
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const MenuIcon = style => <Icon {...style} name="more-horizontal" />;

  const ClickableMenu = () => (
    <Layout
      style={{
        height: 36,
        width: 344,
        flexDirection: "row",
        justifyContent: "flex-end"
      }}
    >
      <OverflowMenu
        style={{width: 200}}
        data={[{title: `Log Out -- ${user.name}`}]}
        visible={menuVisible}
        selectedIndex={selectedMenuIndex}
        onSelect={onMenuItemSelect}
        onBackdropPress={toggleMenu}
        placement="bottom"
      >
        <Button
          style={{width: 44, marginRight: 10, marginBottom: 10}}
          onPress={toggleMenu}
          icon={MenuIcon}
          status="basic"
          appearance="ghost"
        ></Button>
      </OverflowMenu>
    </Layout>
  );

  const MenuAction = props => (
    <TopNavigationAction {...props} icon={ClickableMenu} />
  );

  const renderRightControls = () => [<MenuAction />];

  return (
    <Layout>
      <TopNavigation
        title=""
        leftControl={() => {}}
        rightControls={renderRightControls()}
      />
      <ViewPager
        selectedIndex={selectedPageIndex}
        onSelect={setSelectedPageIndex}
      >
        <Layout style={styles.pager}>
          <HomePage user={user} />
        </Layout>
        <Layout style={styles.pager}>
          <Text category="h5">Welcome {user.name}!</Text>
        </Layout>
      </ViewPager>
    </Layout>
  );
};

const styles = StyleSheet.create({
  pager: {
    // height: 192,
    // width: "100%"
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Home;
