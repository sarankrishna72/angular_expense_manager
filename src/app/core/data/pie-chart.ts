export const getPieChartData = (data: any[] = [], title = "Category wise Expense", angleKey="amount", yAxis="category" ) => {
  return {
    autoSize: true,
    theme: "ag-polychroma",
    height: 400,
    data: data,
    title: {
      text: title,
    },
    legend: {
      position: 'bottom'
    },
    series: [
      {
        type: "pie",
        angleKey: angleKey,
        legendItemKey: yAxis,
        sectorLabelKey: angleKey,
        sectorLabel: {
          color: 'white',
          fontWeight: 'bold',
          formatter: ({ value = ''}) => `$${value}`,
        },
      },
    ],
  };
}
