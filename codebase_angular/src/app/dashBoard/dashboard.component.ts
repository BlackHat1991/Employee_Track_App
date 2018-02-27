import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './dashboard.component.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashBoard',
  templateUrl: './dashboard.component.html'
})

export class DashBoardComponent implements OnInit {

  constructor(public route: ActivatedRoute, public dashboardService: DashboardService) {
  }
	
  ngOnInit() {
  }
     
}
