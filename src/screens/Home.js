import React, {useState, useEffect} from "react";
import HomePage from "./HomePage";
import StatisticsPage from "./StatisticsPage";
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
import {logout} from "../utils/AuthUtils";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_USER_SETTINGS} from "../../data/queries";
import {UPDATE_USER_SETTINGS} from "../../data/mutations";

const Home = ({route}) => {
  const {user, setToken} = route.params;

  const handleLogout = () => {
    logout();
    setToken(null);
  };

  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = React.useState(null);

  const {
    loading: loadingUserSettings,
    error: errorUserSettings,
    data: userSettings
  } = useQuery(GET_USER_SETTINGS, {
    variables: {
      user_id: user.id
    }
  });
  if (errorUserSettings) return <Text>{`Error! ${error.message}`}</Text>;

  const [
    updateUserSettings,
    {loading: updatingUserSettings, error: errorUpdatingUserSettings}
  ] = useMutation(UPDATE_USER_SETTINGS);

  const lockCalendar = userSettings?.user_settings[0].lock_calendar;

  const onUpdateUserSettings = () => {
    updateUserSettings({
      variables: {
        user_id: user.id,
        lock_calendar: !lockCalendar
      },
      refetchQueries: [
        {
          query: GET_USER_SETTINGS,
          variables: {
            user_id: user.id
          }
        }
      ]
    });
  };

  const onMenuItemSelect = index => {
    setSelectedMenuIndex(index);
    setMenuVisible(false);
    if (index === 0) {
      handleLogout();
    } else if (index === 1) {
      onUpdateUserSettings();
    }
    setSelectedMenuIndex(null);
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
        data={[
          {title: `Log Out -- ${user.name}`},
          {title: lockCalendar ? "Unlock Calendar" : "Lock Calendar"}
        ]}
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
          <HomePage user={user} lockCalendar={lockCalendar} />
        </Layout>
        <Layout style={styles.pager}>
          <StatisticsPage user={user} />
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
