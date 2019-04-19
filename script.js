const element = {
  textArea: document.querySelector('textarea'),
  result: document.querySelector('.result'),
}

const sortArr = arr =>
  arr.sort((a, b) => a['day'] - b['day']);

const calculateDaysMatchIncome = inputData => {
  // Turn inputData to arr
  const rawArr = inputData.split(' ');

  // Initialize array of A and C
  const records = {
    A: [],
    C: [],
  };

  // Push day and income into records
  rawArr.map((item, index) => {
    const dayRecord = {};

    if (records.hasOwnProperty(item)) {
      dayRecord.day = rawArr[index + 1];
      dayRecord.income = rawArr[index + 2];
      records[item].push(dayRecord);
    }
  });

  // Sort arr A and C
  sortArr(records.A);
  sortArr(records.C);

  // Calculate unmatch days
  const unmatchedDayNumber = records.A.reduce(
    (accummulator, currentItem, index) => {
      if (
        records.C[index] &&
        currentItem.income !== records.C[index]['income']
      ) {
        accummulator += 1;
      }
      return accummulator;
    },
    0,
  );

  return unmatchedDayNumber;
};

element.textArea.addEventListener('keyup', () => {
  const inputData = element.textArea.value;

  element.result.innerHTML = `
    The number of days the calculated and actual incomes didn't match is: ${calculateDaysMatchIncome(inputData)} days
  `;
})

