import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

 public getData:[{}]=[{}]
  private messageSource = new BehaviorSubject(this.getData);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    // this.messageSource.next(message)
  }

}