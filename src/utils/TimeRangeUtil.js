import {WEEKS, MONTHS, QUARTERS, YEARS} from "../enums/TimeRange";

const moment = require("moment");

const getStatisticsFixedRange = text => {
  switch (text) {
    case WEEKS.week0:
      return {
        startDate: moment().startOf("week"),
        endDate: moment().endOf("week")
      };
    case WEEKS.week1:
      return {
        startDate: moment()
          .subtract(1, "week")
          .startOf("week"),
        endDate: moment()
          .subtract(1, "week")
          .endOf("week")
      };
    case MONTHS.month0:
      return {
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
      };
    case MONTHS.month1:
      return {
        startDate: moment()
          .subtract(1, "month")
          .startOf("month"),
        endDate: moment()
          .subtract(1, "month")
          .endOf("month")
      };
    case QUARTERS.quarter0:
      return {
        startDate: moment().startOf("quarter"),
        endDate: moment().endOf("quarter")
      };
    case QUARTERS.quarter1:
      return {
        startDate: moment()
          .subtract(1, "quarter")
          .startOf("quarter"),
        endDate: moment()
          .subtract(1, "quarter")
          .endOf("quarter")
      };
    case YEARS.year0:
      return {
        startDate: moment().startOf("year"),
        endDate: moment().endOf("year")
      };
    case YEARS.year1:
      return {
        startDate: moment()
          .subtract(1, "year")
          .startOf("year"),
        endDate: moment()
          .subtract(1, "year")
          .endOf("year")
      };
    default:
      return {
        startDate: moment(new Date()).startOf("day"),
        endDate: moment(new Date()).endOf("day")
      };
  }
};

export {getStatisticsFixedRange};
