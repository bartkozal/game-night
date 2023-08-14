import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

export const humanizeDateTime = (datetime?: string) => {
  dayjs.extend(advancedFormat);

  return dayjs(datetime).format("dddd, MMMM Do [at] HH:mm");
};

export const getDateTimeOneDayFromNow = () =>
  dayjs().add(1, "day").hour(20).minute(0).format("YYYY-MM-DDTHH:mm");
