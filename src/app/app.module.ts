import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { downgradeComponent, setAngularJSGlobal, UpgradeComponent, UpgradeModule } from '@angular/upgrade/static';

import { Directive, ElementRef, Injector } from '@angular/core';
import * as angular from 'angular';


angular.
  module('myExampleModule', []).
  directive('myExample', function(){ return {
      template: `
        <div style="border:1px solid blue; padding:20px">I'm an AngularJs directive!</div>
      `  
      }}).
  directive('myApp', downgradeComponent({component: AppComponent}));

@Directive({
  selector: 'my-example'
})
export class MyExampleDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('myExample', elementRef, injector);
  }  
}

@NgModule({
  imports:      [ BrowserModule, FormsModule, UpgradeModule ],
  declarations: [ AppComponent, MyExampleDirective ],
  entryComponents:    [ AppComponent ]
})
export class AppModule { 

 constructor(private upgrade: UpgradeModule) {
    //setAngularJSGlobal(angular);
    //this.upgrade.bootstrap(document.body, ['myExampleModule']);
 }

 ngDoBootstrap() {
    setAngularJSGlobal(angular);
    this.upgrade.bootstrap(document.body, ['myExampleModule']);
  }


}
