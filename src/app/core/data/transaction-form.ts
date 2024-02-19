import { ListInterfaceModel } from "../models/form-input.model";



export const DEFAULT_DATA: any = {
  FOOD: "Food",
  TRAVEL: "Travel",
  BILL_PAYMENT: "Bill Payment",
  LOAN_PAYMENT: "Loan Payment",
  GROCERIES: "Groceries",
  FUND_TRANSFER: "Fund Transfer",
  RENTAL: "Rental",
  CREDIT_CARD_PAYMENT: "Credit Card Payment",
  ENTERTAINMENT: "Entertainment",
  OTHER: "Other",
  CANADA: "Canada",
  INDIA: "India",
  INCOME: "Income",
  EXPENSE: "Expense",
  SARATH: "Sarath",
  DEVIKA: "Devika",
  MISSISSUAGA: "Mississuaga",
  SUDBURY: "Sudbury",
  KERALA: "Kerala",
  SAVINGS: "Savings",
  CHEQUINGS: "Chequings",
  CREDIT_CARD: "Credit Card",
  SALARY: "Salary",
  last_month: "Last Month",
  last_2_months: "Last 2 Months",
  last_3_months: "Last 3 Months",
  last_4_months: "Last 4 Months"
}

export const CategoryTypeData: ListInterfaceModel[] = [
  new ListInterfaceModel({
    id: DEFAULT_DATA.SALARY,
    name: DEFAULT_DATA.SALARY,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.FOOD,
    name: DEFAULT_DATA.FOOD,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.TRAVEL,
    name: DEFAULT_DATA.TRAVEL,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.BILL_PAYMENT,
    name: DEFAULT_DATA.BILL_PAYMENT,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.LOAN_PAYMENT,
    name: DEFAULT_DATA.LOAN_PAYMENT,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.GROCERIES,
    name: DEFAULT_DATA.GROCERIES,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.FUND_TRANSFER,
    name: DEFAULT_DATA.FUND_TRANSFER,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.RENTAL,
    name: DEFAULT_DATA.RENTAL,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.CREDIT_CARD_PAYMENT,
    name: DEFAULT_DATA.CREDIT_CARD_PAYMENT,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.ENTERTAINMENT,
    name: DEFAULT_DATA.ENTERTAINMENT,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.OTHER,
    name: DEFAULT_DATA.OTHER,
  }),
];

export const CountryData: ListInterfaceModel[] = [
  new ListInterfaceModel({
    id: DEFAULT_DATA.CANADA,
    name: DEFAULT_DATA.CANADA,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.INDIA,
    name: DEFAULT_DATA.INDIA,
  })
];

export const TransactionTypeData: ListInterfaceModel[] = [
  new ListInterfaceModel({
    id: DEFAULT_DATA.INCOME,
    name: DEFAULT_DATA.INCOME,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.EXPENSE,
    name: DEFAULT_DATA.EXPENSE,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.FUND_TRANSFER,
    name: DEFAULT_DATA.FUND_TRANSFER,
  })
];

export const TransactionForData: ListInterfaceModel[] = [
  new ListInterfaceModel({
    id: DEFAULT_DATA.SARATH,
    name: DEFAULT_DATA.SARATH,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.DEVIKA,
    name: DEFAULT_DATA.DEVIKA,
  })
]

export const LocationData: ListInterfaceModel[] = [
  new ListInterfaceModel({
    id: DEFAULT_DATA.MISSISSUAGA,
    name: DEFAULT_DATA.MISSISSUAGA,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.SUDBURY,
    name: DEFAULT_DATA.SUDBURY,
  }),
  new ListInterfaceModel({
    id: DEFAULT_DATA.KERALA,
    name: DEFAULT_DATA.KERALA,
  })
];

export const AccountTypeData: ListInterfaceModel[] = [
  new ListInterfaceModel({
    id: DEFAULT_DATA.SAVINGS,
    name: DEFAULT_DATA.SAVINGS,
  }),
   new ListInterfaceModel( {
    id: DEFAULT_DATA.CHEQUINGS,
    name: DEFAULT_DATA.CHEQUINGS,
  }),
   new ListInterfaceModel({
    id: DEFAULT_DATA.CREDIT_CARD,
    name: DEFAULT_DATA.CREDIT_CARD,
  })
];

  // {
  //   id: DEFAULT_DATA.SALARY,
  //   name: DEFAULT_DATA.SALARY
  // },
  // {
  //   id: DEFAULT_DATA.FOOD,
  //   name: DEFAULT_DATA.FOOD
  // },{
  //   id: DEFAULT_DATA.TRAVEL,
  //   name: DEFAULT_DATA.TRAVEL
  // },{
  //   id: DEFAULT_DATA.BILL_PAYMENT,
  //   name: DEFAULT_DATA.BILL_PAYMENT
  // },{
  //   id: DEFAULT_DATA.LOAN_PAYMENT,
  //   name: DEFAULT_DATA.LOAN_PAYMENT
  // },{
  //   id: DEFAULT_DATA.GROCERIES,
  //   name: DEFAULT_DATA.GROCERIES
  // },{
  //   id: DEFAULT_DATA.FUND_TRANSFER,
  //   name: DEFAULT_DATA.FUND_TRANSFER
  // },{
  //   id: DEFAULT_DATA.RENTAL,
  //   name: DEFAULT_DATA.RENTAL
  // },{
  //   id: DEFAULT_DATA.CREDIT_CARD_PAYMENT,
  //   name: DEFAULT_DATA.CREDIT_CARD_PAYMENT
  // },{
  //   id: DEFAULT_DATA.ENTERTAINMENT,
  //   name: DEFAULT_DATA.ENTERTAINMENT
  // },{
  //   id: DEFAULT_DATA.OTHER,
  //   name: DEFAULT_DATA.OTHER
  // }

export const MonthList: ListInterfaceModel[] = [
  {id: 'all', name: 'All'},
  {id: DEFAULT_DATA.last_month, name: DEFAULT_DATA.last_month},
  {id: DEFAULT_DATA.last_2_months, name: DEFAULT_DATA.last_2_months},
  {id:  DEFAULT_DATA.last_3_months, name:  DEFAULT_DATA.last_3_months},
  {id:  DEFAULT_DATA.last_4_months, name:  DEFAULT_DATA.last_4_months}
]
