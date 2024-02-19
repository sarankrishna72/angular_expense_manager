export const  TRANSACTION_TABLE_COLUMNS = [

  {
    columnName: "Transaction Date",
    key: "transaction_date_formatted",
  },{
    columnName: "Category Type",
    key: "category_type",
  },{
    columnName: "Account Type",
    key: "account_type",
  },{
    columnName: "Transaction Type",
    key: "transaction_type",
  },{
    columnName: "Made by",
    key: "transaction_for",
  },{
    columnName: "City",
    key: "location",
  },{
    columnName: "Comments",
    key: "comment",
  },{
    columnName: "Amount",
    key: "amount_in_cad",
    innerHtml: true,
    pinColumn: "right"
  }, {
    columnName: "Actions",
    key: "actions",
    actions: ['edit', 'delete'],
    pinColumn: "right"
  },
]
