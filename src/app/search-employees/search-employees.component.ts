import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.scss']
})
export class SearchEmployeesComponent implements OnInit {

 @Input() employeesArray = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  fastRoute(id: string) {
    // this.url = this.url + id;
    this.router.navigateByUrl('/detail/' + id);
  }

}
