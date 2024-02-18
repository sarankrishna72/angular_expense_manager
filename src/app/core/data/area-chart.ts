export const totalAccountTypeExpenseCalculation = (data: any []) => {
  return {
    title: {
      text: "Account Expense By Month",
    },
    autoSize: true,
    data: data,
    series: [
      {
        type: "area",
        xKey: "month",
        yKey: "chequings_account",
        yName: "Chequings",
      },
      {
        type: "area",
        xKey: "month",
        yKey: "savings_account",
        yName: "Savings",
      },
      {
        type: "area",
        xKey: "month",
        yKey: "credits_account",
        yName: "Credits",
      },
    ],
  }
};
