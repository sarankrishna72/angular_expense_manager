import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CONST_IMAGES } from '../../../core/images';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  logo: string = CONST_IMAGES.cash_money;
  sidenavItems: any [] = [
    {
      id: 1,
      name: 'Dashboard',
      icon: CONST_IMAGES.home
    },{
      id: 2,
      name: 'Transactions',
      icon: CONST_IMAGES.transaction
    }
  ]
}
