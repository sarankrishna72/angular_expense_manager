export const getPieChartData = () => {
    return {
      autoSize: true,
      theme: "ag-polychroma",
      height: 400,
      data: [
        { category: 'Food', amount: 60000 },
        { category: 'Travels', amount: 40000 },
        { category: 'Other', amount: 7000 },
        { category: 'Entertainment', amount: 5000 },
        { category: 'Bill', amount: 3000 },
      ],
      title: {
        text: "Category wise Expense",
      },
      legend: {
        position: 'bottom'
      },
      series: [
        {
          type: "pie",
          angleKey: "amount",
          legendItemKey: "category",
          sectorLabelKey: 'amount',
          sectorLabel: {
            color: 'white',
            fontWeight: 'bold',
            formatter: ({ value }) => `$${value}`,
          },
        },
      ],
    }; ;
}
