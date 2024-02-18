export const barChartForIncomeVsExpenseConfiguration = (data: any []) => {
  return  {
      autoSize: true,
      height: 400,
      theme: "ag-polychroma",
      title: {
        text: "Income v/s Expenses",
      },
      axes: [
        {
          type: "category",
          position: "bottom",
        } ,
        {
          type: "number",
          position: "left",
          keys: ["totalIncome", "totalExpense" ],
          tick: {
            interval: 1000,

          },
          label: {
            formatter: (params) => {
              return `$${parseFloat(params.value).toFixed(2)}`;
            },
          },
        } ,
      ],
      data: data,
      series: [
        { type: 'bar', xKey: 'month', yKey: 'totalIncome', legendItemName: "Total Income",
          highlightStyle: {
            item: {
              strokeWidth: 0,
              stroke: ""
            }
          },
          // tooltip: {
          //   renderer: (params) => {return `<div class="bg-white p-1 rounded-sm flex items-center justify-center">$${params.datum.totalIncome.toFixed(2)}</div>`;},
          //   showArrow: false,
          // }
        },
        { type: 'bar', xKey: 'month',  yKey: 'totalExpense', legendItemName: "Total Expense",
          highlightStyle: {
            item: {
              strokeWidth: 0,
            }
          },
          // tooltip: {
          //   renderer: (params) => {return `<div class="bg-white p-1 rounded-sm flex items-center justify-center">$${params.datum.totalExpense.toFixed(2)}</div>`},
          //   showArrow: false,
          // }
        }
      ]
    }
};
