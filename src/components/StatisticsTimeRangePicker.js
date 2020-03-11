import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {Layout, Icon, RangeDatepicker, Select} from "@ui-kitten/components";
import {WEEKS, MONTHS, QUARTERS, YEARS} from "../enums/TimeRange";
import {getStatisticsFixedRange} from "../utils/TimeRangeUtil";

const moment = require("moment");

const SELECT_DATA_WEEK = [{text: WEEKS.week0}, {text: WEEKS.week1}];
const SELECT_DATA_MONTH = [{text: MONTHS.month0}, {text: MONTHS.month1}];
const SELECT_DATA_QUARTER = [
  {text: QUARTERS.quarter0},
  {text: QUARTERS.quarter1}
];
const SELECT_DATA_YEAR = [{text: YEARS.year0}, {text: YEARS.year1}];

const SELECT_DATA = [
  {text: WEEKS.week0},
  {text: WEEKS.week1},
  {text: MONTHS.month0},
  {text: MONTHS.month1},
  {text: QUARTERS.quarter0},
  {text: QUARTERS.quarter1},
  {text: YEARS.year0},
  {text: YEARS.year1}
];

const StatisticsTimeRangePicker = ({setStatisticsRange}) => {
  const [fixedRange, setFixedRange] = useState(null);

  const [randomRange, setRandomRange] = useState({});

  useEffect(() => {
    setFixedRangeAndClear({text: MONTHS.month0});
  }, []);

  const setRandomRangeAndClear = data => {
    setRandomRange(data);
    if (data.endDate != null) {
      setFixedRange(null);
      setStatisticsRange(data, true);
    }
  };

  const setFixedRangeAndClear = data => {
    setFixedRange(data);
    setRandomRange({});
    setStatisticsRange(getStatisticsFixedRange(data.text), false);
  };

  return (
    <Layout>
      <Select
        style={styles.rangePicker}
        data={SELECT_DATA}
        placeholder="Recommended Time Range"
        status={fixedRange == null ? "basic" : "danger"}
        selectedOption={fixedRange}
        onSelect={setFixedRangeAndClear}
      />
      <RangeDatepicker
        style={styles.rangePicker}
        range={randomRange}
        status={randomRange?.endDate == null ? "basic" : "danger"}
        onSelect={setRandomRangeAndClear}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  rangePicker: {
    marginVertical: 6,
    width: 344
  }
});

StatisticsTimeRangePicker.propTypes = {
  setStatisticsRange: PropTypes.func.isRequired
};

export default StatisticsTimeRangePicker;
