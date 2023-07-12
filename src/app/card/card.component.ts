import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DataSharingService } from '../datasharingservice.service';
import * as $ from 'jquery';

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
  @Output() shareMoneyStatus = new EventEmitter();
  public element!: JQuery;
  amountArray: any = [];
  cardData!: any;
  leftovers!: number;
  private dataSubscription: Subscription;

  constructor(
    private dataSharingService: DataSharingService,
    private elementRef: ElementRef
  ) {
    this.element = $(this.elementRef.nativeElement);
    this.dataSubscription = this.dataSharingService.data$.subscribe(
      (data: any) => {
        if (!data?.categories) {
          this.cardData = Object.keys(data).map((key) => [key, data[key]]);
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.amountArray.push(this.amount);
    
    // this.shareMoneyStatus.emit(this.leftovers);
  }
}
