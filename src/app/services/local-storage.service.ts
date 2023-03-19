import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  public saveData(key: string, value: string) {
    if (key === undefined) {
      console.log('KEY IS UNDEFINED');
      return;
    }
    localStorage.setItem(key, value);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
}
