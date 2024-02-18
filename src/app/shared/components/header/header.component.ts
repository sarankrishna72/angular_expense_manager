import { Component } from '@angular/core';
import { CONST_IMAGES } from '../../../core/images';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constImages: any = CONST_IMAGES;
}
