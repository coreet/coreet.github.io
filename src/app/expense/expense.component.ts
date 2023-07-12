import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-expense',
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
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent {
  @Output() toggleModalEvent = new EventEmitter();
  @Output() settingsDataEvent = new EventEmitter();

  public settings: boolean = false;
  public expenses: boolean = false;

  formGroup: FormGroup;
  expensesGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      categories: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.addObject();
  }

  get categories() {
    return this.formGroup.get('categories') as FormArray;
  }

  addObject() {
    const objectGroup = this.formBuilder.group({
      name: '',
      amount: '',
    });
    this.categories.push(objectGroup);
  }

  deleteObject(index: number) {
    this.categories.removeAt(index);
  }

  onSubmit() {
    this.settingsDataEvent.emit(this.formGroup.value);
  }

  closeModal() {
    this.toggleModalEvent.emit(false);
  }
}
