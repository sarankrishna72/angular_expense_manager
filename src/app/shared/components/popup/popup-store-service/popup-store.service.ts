import {  Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PopupStoreService {
  private active: WritableSignal<boolean> = signal(false)
  readonly show = this.active.asReadonly();
  private popupConfig: WritableSignal<PopupInterface> = signal(null);
  readonly config = this.popupConfig.asReadonly();
  constructor() { }

  open(configuration: PopupInterface) {
    this.active.set(true);
    this.popupConfig.set(configuration);
  }

  dismiss() {
    this.active.set(false);
    this.popupConfig.set(null);
  }

}


interface PopupInterface {
  modelContentClass ?: string;
  popupClass ?: string;
  popupHeaderClass ?: string;
  title ?: string;
  component ?: any,
  componentProps ?: any;
}
