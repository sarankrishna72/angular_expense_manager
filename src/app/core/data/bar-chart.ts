export const barChartConfiguration = () => {
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
              return `$${parseFloat(params.value)}`;
            },
          },
        } ,
      ],
      data: [
        { month: 'Jan', totalIncome: 5014, totalExpense: 3250 },
        { month: 'Mar', totalIncome: 6012, totalExpense: 3015 },
        { month: 'May', totalIncome: 4688, totalExpense: 2987 },
        { month: 'Jul', totalIncome: 4569, totalExpense: 3600 },
        { month: 'Sep', totalIncome: 5642, totalExpense: 3200 },
        { month: 'Nov', totalIncome: 6321, totalExpense: 3605 },
      ],
      series: [
        { type: 'bar', xKey: 'month', yKey: 'totalIncome', legendItemName: "Total Income",
          highlightStyle: {
            item: {
              strokeWidth: 0,
              stroke: ""
            }
          },
          tooltip: {
            renderer: (params) => {return `<div class="bg-white p-1 rounded-sm flex items-center justify-center">$${params.datum.totalIncome}</div>`;},
            showArrow: false,
          }
        },
        { type: 'bar', xKey: 'month',  yKey: 'totalExpense', legendItemName: "Total Expense",
          highlightStyle: {
            item: {
              strokeWidth: 0,
            }
          },
          tooltip: {
            renderer: (params) => {return `<div class="bg-white p-1 rounded-sm flex items-center justify-center">$${params.datum.totalExpense}</div>`},
            showArrow: false,
          }
        }
      ]
    }
};
