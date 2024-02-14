import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { PopupComponent } from './shared/components/popup/popup.component';
import { AuthorizationService } from './core/services/authorization/authorization.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidenavComponent,
    PopupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    public _authorizationService: AuthorizationService
  ) {

  }
}
