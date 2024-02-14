export const bulletChartData = () => {
  return {
      title: {
        text: "Target v/s Achievements",
      },
      theme: "ag-polychroma",
      data:[
        {
            month: 'Jan',
            target: 7200,
            achieve: 6500,
        },
        {
            month: 'Feb',
            target: 7300,
            achieve: 6800,
        },
        {
            month: 'Mar',
            target: 7400,
            achieve: 6300,
        },

    ],
      series: [
        {
          type: "line",
          xKey: "month",
          yKey: "target",
          yName: "Target",
        },
        {
          type: "line",
          xKey: "month",
          yKey: "achieve",
          yName: "Achieve",
        },
      ],
    };
}
