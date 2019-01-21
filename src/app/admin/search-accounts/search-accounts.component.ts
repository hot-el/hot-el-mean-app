import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-accounts',
  templateUrl: './search-accounts.component.html',
  styleUrls: ['./search-accounts.component.scss']
})
export class SearchAccountsComponent implements OnInit {

  @Input() accountsArray = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  fastRoute(id: string) {
    // this.url = this.url + id;
    this.router.navigateByUrl('/accounts/detail/' + id);
  }

}

