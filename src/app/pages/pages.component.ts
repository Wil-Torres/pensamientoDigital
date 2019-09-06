import { Component, OnInit } from '@angular/core';
import { CoreService } from '../services/service.index';
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  bsInlineValue = new Date();
  constructor(private srvCore: CoreService) { }

  ngOnInit() {
    init_plugins();
  }

}
