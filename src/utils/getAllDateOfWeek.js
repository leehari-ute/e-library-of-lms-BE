const getDateOfCurrentWeek = () => {
  const curr = new Date(); // get current date
  const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week (+1 if firstday is Monday)

  const monday = new Date(curr.setDate(first)).toLocaleDateString();
  const tuesday = new Date(curr.setDate(first + 1)).toLocaleDateString();
  const wednesday = new Date(curr.setDate(first + 2)).toLocaleDateString();
  const thursday = new Date(curr.setDate(first + 3)).toLocaleDateString();
  const friday = new Date(curr.setDate(first + 4)).toLocaleDateString();
  const saturday = new Date(curr.setDate(first + 5)).toLocaleDateString();
  const sunday = new Date(curr.setDate(first + 6)).toLocaleDateString();

  return { monday, tuesday, wednesday, thursday, friday, saturday, sunday };
};

module.exports = getDateOfCurrentWeek;
