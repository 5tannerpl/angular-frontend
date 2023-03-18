import { Injectable } from '@angular/core';
import { IDashboardMockService } from './dashboard.service.interface';
import { Observable, of } from 'rxjs';
import { visitList} from "../models/dashboard.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardMockService implements IDashboardMockService {

  visitLists : visitList[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      lastVisit: '01/01/2023',
      nextVisit:'01/11/2023',
      address: '1 sydney st,Sydney,NSW 2000',
      healthRate: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      mobile: '0470090000',
      contactNurse:'Katty Rose'
    },
    {
      name: 'Tom Cruiss',
      state: 'New',
      lastVisit: '01/03/2023',
      nextVisit:'01/11/2023',
      address: '2 sydney st,Sydney,NSW 2000',
      healthRate: 30,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      mobile: '0470090001',
      contactNurse:'Katty Rose'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      lastVisit: '03/02/2023',
      nextVisit:'03/09/2023',
      address: '3 sydney st,Sydney,NSW 2000',
      healthRate: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      mobile: '0470090003',
      contactNurse:'Kammy Kesse'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      lastVisit: '11/01/2022',
      nextVisit:'11/08/2022',
      address: '4 sydney st,Sydney,NSW 2000',
      healthRate: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      mobile: '0470090004',
      contactNurse:'Dan Loop'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      lastVisit: '02/28/2023',
      nextVisit:'03/07/2023',
      address: '5 sydney st,Sydney,NSW 2000',
      healthRate: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      mobile: '0470090005',
      contactNurse:'Dan Loop'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      lastVisit: '01/03/2023',
      nextVisit:'01/10/2023',
      address: '6 sydney st,Sydney,NSW 2000',
      healthRate: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      mobile: '0470090006',
      contactNurse:'Dan Loop'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      lastVisit: '01/02/2023',
      nextVisit:'01/09/2023',
      address: '7 sydney st,Sydney,NSW 2000',
      healthRate: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      mobile: '0470090007',
      contactNurse:'Katty Rose'
    }
  ];

  private readonly _url = "users";

  getVisitList():Observable<visitList[]>{
    return of(this.visitLists)
  }
}
