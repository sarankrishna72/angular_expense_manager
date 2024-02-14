export class DashboardSummaryCardModel {
  public title: string = '';
  public id: string = '';
  public currentMonth: number = 0;
  public lastMonth: number = 0;
  public isIncome: boolean = false;
  constructor(title: string, currentMonth: number, lastMonth: number, isIncome: boolean) {
    this.title = title;
    this.id = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Date.now()}`;
    this.currentMonth = currentMonth;
    this.lastMonth = lastMonth;
    this.isIncome = isIncome;
  }

  getIncomePercentage(): number {
    return (((this.currentMonth - this.lastMonth) / this.lastMonth))
  }

}
