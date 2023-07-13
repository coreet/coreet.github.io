import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailed-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-expenses.component.html',
  styleUrls: ['./detailed-expenses.component.scss'],
})
export class DetailedExpensesComponent implements OnInit {
  @Input() expenses!: any;

  ngOnInit(): void {
    console.log('expenses: ', this.expenses);
  }
}
