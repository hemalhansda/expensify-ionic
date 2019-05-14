import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CenterCoreService {
  public activeTab = {
    home: true,
    account: false,
    settings: false
  };
  constructor() { }
}
