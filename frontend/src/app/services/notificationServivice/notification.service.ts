import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

   setNotification(message: string): void {
        this.notificationSubject.next(message);
    }

    getNotification(): BehaviorSubject<string> {
        return this.notificationSubject;
    }
}
