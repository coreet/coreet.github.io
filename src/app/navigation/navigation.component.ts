import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    AngularSvgIconModule,
    MatButtonModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public smallModal: boolean = false;
  @Output() toggleDashboardViews = new EventEmitter();

  public toggleSmallModal(type: boolean) {
    this.smallModal = type;
  }

  public navigation(string: string | boolean) {
    switch (string) {
      case 'settings':
        this.smallModal = false;
        this.toggleDashboardViews.emit(string);
        break;
      default:
        this.toggleDashboardViews.emit(string);
        break;
    }
  }
}
