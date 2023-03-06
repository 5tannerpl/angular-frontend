import { Component, OnInit } from '@angular/core';
import { cilChartPie, cilArrowRight } from '@coreui/icons';
import { DashboardMockService } from '../../service/dashboard.mock.service';
import { visitList } from 'src/app/models/dashboard.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  icons = { cilChartPie, cilArrowRight };
  constructor(
    private service: DashboardMockService) {
  }
  contactOverdue: number = 0;
  totalContact: number = 0;
  result: any;
  showVar: any;
  today: Date = new Date();
  selectedNurse: string = "";
  showList: boolean = false;
  listForFilter: visitList[] = [];
  contactNurseList: string[] = [];
  visitLists: visitList[] = [];

  ngOnInit(): void {
    this.service.getVisitList().subscribe((visitLists) => this.visitLists = visitLists);
    this.listForFilter = this.visitLists;
    for (let item of this.visitLists) {
      this.contactNurseList.push(item.contactNurse);
      var dateObject = new Date(item.nextVisit);
      if (dateObject < this.today) {
        this.contactOverdue++;
      }
    }
    this.totalContact = this.visitLists.length;
    this.contactNurseList = Array.from(new Set(this.contactNurseList));
  }

  onChange(input: any) {
    this.listForFilter = this.visitLists;
    this.selectedNurse = input.target.value;
    if (this.selectedNurse != 'all') {
      this.listForFilter = this.listForFilter.filter(item => item.contactNurse == this.selectedNurse);
    }
  }
  onChangeShow(input: any) {
    this.showList = input;
  }

  isOverDue(appointment: string, dueDate: Date) {
    var appdate = new Date(appointment);
    return appdate < dueDate ? true : false;
  }
}
