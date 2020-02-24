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
  
  private _srvCore : CoreService;
  public get srvCore() : CoreService {
    return this._srvCore;
  }
  public set srvCore(v : CoreService) {
    this._srvCore = v;
  }
  
  constructor(private srvCore1: CoreService) { 
    this._srvCore = srvCore1;
  }

  ngOnInit() {
    init_plugins();
  }

}
