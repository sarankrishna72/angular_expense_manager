import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, effect } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PopupStoreService } from './popup-store-service/popup-store.service';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ButtonComponent } from '../forms/button/button.component';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CardComponent,
    NgComponentOutlet,
    ButtonComponent,
    CommonModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit{
  popupEffect: any;
  @ViewChild('model') model: ElementRef;
  constructor(
    public _popupStoreService: PopupStoreService,
  ) {
    this.popupEffect = effect(() => {
      if (this._popupStoreService.show()) {
        if (this.model) {
          this.model.nativeElement.ownerDocument.body.style.overflow = 'hidden'
          this.model.nativeElement.style.display = "flex";
        }
      } else {
        if ( this.model) {
          this.model.nativeElement.ownerDocument.body.style.overflow = 'auto'
          this.model.nativeElement.style.display = "none";
        }
      }
    })
  }

  ngOnInit() {

  }
}
