import { Directive, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";

@Directive()
export class BaseComponent implements OnDestroy {

  protected subscriptions = new Array<Subscription>();

  constructor() { }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
  
}
