import { AgChartOptions } from 'ag-charts-community';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgChartsAngularModule } from 'ag-charts-angular';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    AgChartsAngularModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
 @Input() chartOptions!: AgChartOptions;
}
