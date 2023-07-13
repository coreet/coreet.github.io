import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailed-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-expenses.component.html',
  styleUrls: ['./detailed-expenses.component.scss'],
})
export class DetailedExpensesComponent {
  @Input() expenses!: any;
}
