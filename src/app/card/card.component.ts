import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges {
  @Input() headline!: string;
  @Input() amount!: number;
  amountArray: any = [];
  cardData!: any;
  leftovers!: number;

  ngOnChanges(changes: SimpleChanges): void {}
}
