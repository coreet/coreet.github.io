import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DataSharingService } from '../datasharingservice.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnDestroy {
  childData: any;
  private dataSubscription: Subscription;

  budget!: number;

  constructor(private dataSharingService: DataSharingService) {
    this.dataSubscription = this.dataSharingService.data$.subscribe(
      (data: any) => {
        console.log('data: ', data);
        this.childData = data;
        this.budget = this.childData?.categories[0].amount;
      }
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
