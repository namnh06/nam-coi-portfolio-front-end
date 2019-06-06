import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderSpinnerService {
  isLoading = new Subject<boolean>();
  constructor() { }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }

  getIsLoadingListener() {
    return this.isLoading.asObservable();
  }
}
