import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  @Output() toggleModalEvent = new EventEmitter();
  @Output() expenseDataEvent = new EventEmitter();
  @Input() inputOptions!: any;
  currentDate!: any;
  formGroup: any;
  options!: string[];

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      fields: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.options = this.inputOptions.categorieOptions.split(',');
    this.addField();
  }

  onSubmit() {
    this.expenseDataEvent.emit(this.formGroup.value);
  }

  addField() {
    const fields = this.formGroup.get('fields') as FormArray;
    this.currentDate = new Date();
    fields.push(
      this.fb.group({
        selectedOption: [''],
        numberValue: [''],
        day: this.convertDay(
          this.currentDate.toLocaleString('default', { weekday: 'long' })
        ),
        time: this.currentDate.toLocaleTimeString(),
      })
    );
  }

  removeField(index: number) {
    const fields = this.formGroup.get('fields') as FormArray;
    fields.removeAt(index);
  }

  closeModal() {
    this.toggleModalEvent.emit(false);
  }

  convertDay(day: string) {
    switch (day) {
      case 'Montag':
        return 'Monday';
      case 'Dienstag':
        return 'Tuesday';
      case 'Mittwoch':
        return 'Wednesday';
      case 'Donnerstag':
        return 'Thursday';
      case 'Freitag':
        return 'Friday';
      case 'Samstag':
        return 'Saturday';
      default:
        return 'Sunday';
    }
  }
}
