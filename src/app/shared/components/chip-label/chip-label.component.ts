import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip-label',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './chip-label.component.html',
  styleUrl: './chip-label.component.scss'
})
export class ChipLabelComponent {
  @Input() title: string = '';
}
