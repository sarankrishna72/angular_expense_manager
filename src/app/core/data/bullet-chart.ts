export const bulletForUserIncomeChartData = (data: any[] = []) => {
  return {
      title: {
        text: "Income Earned By",
      },
      theme: "ag-polychroma",
      data: data,
      series: [
        {
          type: "line",
          xKey: "month",
          yKey: "totalSarathIncomes",
          yName: "Sarath",
        },
        {
          type: "line",
          xKey: "month",
          yKey: "totalDevikaIncomes",
          yName: "Devika",
        },
      ],
    };
}
