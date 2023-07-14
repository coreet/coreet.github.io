import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private dataSubject = new Subject<any>();
  public data$ = this.dataSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }
}


// If you were a Professional Angular engineer, how would you send Data from a Child Component to a Parent Component using rxjs?