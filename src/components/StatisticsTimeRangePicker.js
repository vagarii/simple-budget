import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {Layout, Icon, RangeDatepicker, Select} from "@ui-kitten/components";
import {WEEKS, MONTHS, QUARTERS, YEARS} from "../enums/TimeRange";
import {
  getStatisticsRangeByWeek,
  getStatisticsRangeByMonth,
  getStatisticsRangeByQuarter,
  getStatisticsRangeByYear
} from "../utils/TimeRangeUtil";

const moment = require("moment");

const SELECT_DATA_WEEK = [{text: WEEKS.week0}, {text: WEEKS.week1}];
const SELECT_DATA_MONTH = [{text: MONTHS.month0}, {text: MONTHS.month1}];
const SELECT_DATA_QUARTER = [
  {text: QUARTERS.quarter0},
  {text: QUARTERS.quarter1}
];
const SELECT_DATA_YEAR = [{text: YEARS.year0}, {text: YEARS.year1}];

const StatisticsTimeRangePicker = ({setStatisticsRange}) => {
  const [week, setWeek] = useState(null);
  const [month, setMonth] = useState(null);
  const [quarter, setQuarter] = useState(null);
  const [year, setYear] = useState(null);
  const [randomRange, setRandomRange] = useState({});

  useEffect(() => {
    setMonthAndClear({text: MONTHS.month0});
  }, []);

  const setRandomRangeAndClear = data => {
    setRandomRange(data);
    if (data.endDate != null) {
      setWeek(null);
      setMonth(null);
      setQuarter(null);
      setYear(null);
      setStatisticsRange(data, true);
    }
  };

  const setWeekAndClear = data => {
    setWeek(data);
    setMonth(null);
    setQuarter(null);
    setYear(null);
    setRandomRange({});
    setStatisticsRange(getStatisticsRangeByWeek(data.text), false);
  };

  const setMonthAndClear = data => {
    setWeek(null);
    setMonth(data);
    setQuarter(null);
    setYear(null);
    setRandomRange({});
    setStatisticsRange(getStatisticsRangeByMonth(data.text), false);
  };

  const setQuarterAndClear = data => {
    setWeek(null);
    setMonth(null);
    setQuarter(data);
    setYear(null);
    setRandomRange({});
    setStatisticsRange(getStatisticsRangeByQuarter(data.text), false);
  };

  const setYearAndClear = data => {
    setWeek(null);
    setMonth(null);
    setQuarter(null);
    setYear(data);
    setRandomRange({});
    setStatisticsRange(getStatisticsRangeByYear(data.text), false);
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.pickersRow}>
        <Select
          style={styles.picker}
          data={SELECT_DATA_WEEK}
          placeholder="WEEK"
          status={week == null ? "basic" : "success"}
          selectedOption={week}
          onSelect={setWeekAndClear}
        />
        <Select
          style={styles.picker}
          data={SELECT_DATA_MONTH}
          status={month == null ? "basic" : "success"}
          placeholder="MONTH"
          selectedOption={month}
          onSelect={setMonthAndClear}
        />
      </Layout>
      <Layout style={styles.pickersRow}>
        <Select
          style={styles.picker}
          data={SELECT_DATA_QUARTER}
          status={quarter == null ? "basic" : "success"}
          placeholder="QUARTER"
          selectedOption={quarter}
          onSelect={setQuarterAndClear}
        />
        <Select
          style={styles.picker}
          data={SELECT_DATA_YEAR}
          status={year == null ? "basic" : "success"}
          placeholder="YEAR"
          selectedOption={year}
          onSelect={setYearAndClear}
        />
      </Layout>
      <RangeDatepicker
        style={styles.rangePicker}
        range={randomRange}
        status={randomRange?.endDate == null ? "basic" : "success"}
        onSelect={setRandomRangeAndClear}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
    alignItems: "center"
  },
  pickersRow: {
    flexDirection: "row",
    marginVertical: 4,
    width: 352
  },
  picker: {
    flex: 1,
    marginHorizontal: 4
  },
  rangePicker: {
    marginVertical: 4,
    width: 344
  }
});

StatisticsTimeRangePicker.propTypes = {
  setStatisticsRange: PropTypes.func.isRequired
};

export default StatisticsTimeRangePicker;
