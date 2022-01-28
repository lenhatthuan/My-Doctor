import { LocaleConfig } from "react-native-calendars";

const dayNames = ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"];
const monthNames = [
  "1/",
  "2/",
  "3/",
  "4/",
  "5/",
  "6/",
  "7/",
  "8/",
  "9/",
  "10/",
  "11/",
  "12/",
];
LocaleConfig.locales["vi"] = {
  monthNames: monthNames,
  monthNamesShort: monthNames,
  dayNames: dayNames,
  dayNamesShort: dayNames,
  today: "Hôm nay",
};
LocaleConfig.defaultLocale = "vi";

export { LocaleConfig };
