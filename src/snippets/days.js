import { en } from "../services/textService";

const daysArray = [
  [en.days.short.monday, en.days.long.monday],
  [en.days.short.tuesday, en.days.long.tuesday],
  [en.days.short.wednesday, en.days.long.wednesday],
  [en.days.short.thursday, en.days.long.thursday],
  [en.days.short.friday, en.days.long.friday],
  [en.days.short.saturday, en.days.long.saturday],
  [en.days.short.sunday, en.days.long.sunday],
];

const longDay = (day) => {
  let result = "Not Found";
  daysArray.forEach((item) => {
    if (day === item[0]) {
      result = item[1];
    }
  });
  return result;
};

const calculateOffset = (shortDay) => {
  let index = -1;

  daysArray.forEach((day) => {
    if (day[0] === shortDay) {
      index = daysArray.indexOf(day);
    }
  });
  return index;
};

const getDay = (dayNumber, startDay) => {
  const offset = calculateOffset(startDay);

  const position = dayNumber + offset - 1;
  const length = daysArray.length;

  const result = position % length;

  return daysArray[result][0];
};

const isWeekend = (longDay) => {
  if (longDay === en.days.long.saturday || longDay === en.days.long.sunday) {
    return "weekend";
  } else {
    return "";
  }
};

const days = { longDay, daysArray, calculateOffset, getDay, isWeekend };

export default days;
