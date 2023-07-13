import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SettingsSharingService } from '../settingssharingservice.service';

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
  categorieOptions!: string;
  currency!: string;

  constructor(private settingsSharingService: SettingsSharingService) {}

  onSubmit() {
    this.settingsData = {
      income: +this.income,
      savings: +this.savings,
      categorieOptions: this.categorieOptions,
      currency: this.currency,
    };

    this.settingsSharingService.sendData(this.settingsData);
    this.settings.emit(this.settingsData);
    this.toggleModalEvent.emit(false);
  }

  closeModal() {
    this.toggleModalEvent.emit(false);
  }
}
