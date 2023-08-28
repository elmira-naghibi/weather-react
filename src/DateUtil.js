export default function DateUtil(date) {
  const day = (short = false) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (short) {
      return days[date.getDay()].substring(0, 3);
    } else {
      return days[date.getDay()];
    }
  };

  const time = () => {
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;

    return `${date.getHours()}:${minutes}`;
  };

  const dayTime = () => {
    return `${day()} ${time()}`;
  };

  return {
    day,
    time,
    dayTime,
  };
}
