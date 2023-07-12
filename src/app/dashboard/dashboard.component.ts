import { ExpenseComponent } from './../expense/expense.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { TableComponent } from '../table/table.component';
import { SettingsComponent } from '../settings/settings.component';
import { MatButtonModule } from '@angular/material/button';
import { DataSharingService } from '../datasharingservice.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    TableComponent,
    SettingsComponent,
    ExpenseComponent,
    MatButtonModule,
    ModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public settings: boolean = false;
  public expenses: boolean = false;
  public cardData!: any;

  parentData: any;

  constructor(private dataSharingService: DataSharingService) {}

  public toggleViews(type: string | boolean) {
    switch (type) {
      case 'settings':
        this.settings = true;
        break;
      case 'expenses':
        this.expenses = true;
        break;
      case false:
        this.expenses = type;
        this.settings = type;
        break;
    }
  }

  public setData($event: any) {
    if ($event?.categories) {
      this.updateParentData($event);
    } else {
      this.cardData = Object.keys($event).map((key) => [key, $event[key]]);
    }
  }

  updateParentData(newData: any) {
    this.parentData = newData;
    this.dataSharingService.sendData(newData);
  }

  updateCard(amount: number) {
    // this.cardData.push([])
  }
}
