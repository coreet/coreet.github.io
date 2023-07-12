import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private dataSubject = new Subject<any>();
  public data$ = this.dataSubject.asObservable();

  sendData(data: any, component?: string) {
    this.dataSubject.next(data);
  }
}
