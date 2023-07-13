import { ExpenseComponent } from './../expense/expense.component';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { TableComponent } from '../table/table.component';
import { SettingsComponent } from '../settings/settings.component';
import { MatButtonModule } from '@angular/material/button';
import { DataSharingService } from '../datasharingservice.service';
import { ModalComponent } from '../modal/modal.component';
import { SettingsSharingService } from '../settingssharingservice.service';
import { DetailedExpensesComponent } from '../detailed-expenses/detailed-expenses.component';
import { NavigationComponent } from '../navigation/navigation.component';

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
    DetailedExpensesComponent,
    NavigationComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnChanges {
  public settings: boolean = false;
  public expenses: boolean = false;
  public detailedExpenses: boolean = false;
  public cardData!: any;
  public leftover!: number;
  public settingsData!: any;
  dataSubscription: any;
  parentData: any; // Expenses Data without unifyication

  constructor(
    private dataSharingService: DataSharingService,
    private settingsSharingService: SettingsSharingService
  ) {
    this.dataSubscription = this.settingsSharingService.data$.subscribe(
      (data: any) => {
        data.whatsLeft = data.income - data.savings;
        data.spent = data.savings;
        this.settingsData = data;
        this.handleCardData(data);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('this.parentData: ', this.parentData);
  }

  public toggleViews(type: string | boolean) {
    switch (type) {
      case 'settings':
        this.settings = true;
        break;
      case 'expenses':
        this.expenses = true;
        break;
      case 'detailedExpenses':
        this.detailedExpenses = true;
        break;
      case false:
        this.expenses = type;
        this.settings = type;
        this.detailedExpenses = type;
        break;
    }
  }

  public setData($event: any) {
    if ($event?.fields) {
      this.updateParentData($event);
    } else {
      this.cardData = Object.keys($event).map((key) => [key, $event[key]]);
    }
  }

  async updateParentData(newData: any) {
    this.parentData = newData;
    newData.settingsData = this.settingsData;
    await this.dataSharingService.sendData(this.unifiedExpenses(newData));
  }

  unifiedExpenses(data: any) {
    let result = data;

    result.fields.forEach((item: any) => {
      if (result[item.selectedOption]) {
        result[item.selectedOption] += item.numberValue;
      } else {
        result[item.selectedOption] = item.numberValue;
      }
    });

    if (!result.unifiedExpenses) {
      result.unifiedExpenses = [];
    }

    for (let key in result) {
      if (!isNaN(+result[key])) {
        result.unifiedExpenses.push({
          categorie: key,
          numberValue: result[key],
        });
        delete result[key];
      }
    }

    return this.calculateMoney(result);
  }

  calculateMoney(data: any) {
    data.unifiedExpenses.forEach((e: any) => {
      data.settingsData.whatsLeft -= e.numberValue;
      data.settingsData.spent += e.numberValue;
    });
    this.handleCardData(data.settingsData);
    return data;
  }

  handleCardData(data: any) {
    this.cardData = Object.entries(data).filter(
      ([key, value]) => key !== 'categorieOptions'
    );
  }
}
