const daysArray = [
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"],
  ["Sun", "Sunday"],
];

const longDay = (day) => {
  switch (day) {
    case "Mon":
      return "Monday";
    case "Tue":
      return "Tuesday";
    case "Wed":
      return "Wednesday";
    case "Thu":
      return "Thursday";
    case "Fri":
      return "Friday";
    case "Sat":
      return "Saturday";
    case "Sun":
      return "Sunday";
    default:
      break;
  }
  return "Day Not Found";
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
  if (longDay === "Saturday" || longDay === "Sunday") {
    return "weekend";
  } else {
    return "";
  }
};

const days = { longDay, daysArray, calculateOffset, getDay, isWeekend };

export default days;
