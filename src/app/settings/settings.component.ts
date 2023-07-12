import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  @Output() toggleModalEvent = new EventEmitter();
  @Output() settings = new EventEmitter();

  settingsData: Object = {};
  income!: number;
  savings!: number;

  onSubmit() {
    this.settingsData = {
      income: +this.income,
      savings: +this.savings,
    };

    this.settings.emit(this.settingsData);
    this.toggleModalEvent.emit(false);
  }
}