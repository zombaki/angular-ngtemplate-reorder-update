import { Component, Input, ViewChild, TemplateRef, ViewContainerRef ,ViewEncapsulation,ComponentFactoryResolver} from '@angular/core';
import {MatAccordion} from '@angular/material';
import {HelloComponent} from './hello.component';
import { DragDrop } from '@angular/cdk/drag-drop';
let counter = 1;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
   displayMode: string = 'default';
  multi = false;

  @ViewChild("piechartsContainer", {read: ViewContainerRef}) pieChartContainer: ViewContainerRef;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private resolver: ComponentFactoryResolver,
  private dragDrop:DragDrop) {}

  add() {
    let componentFactory = this.resolver.resolveComponentFactory(HelloComponent);
    let componentRef = componentFactory.create(this.pieChartContainer.injector);
    componentRef.instance.title = 'Dynamic accordion header' + counter++;
    this.pieChartContainer.createEmbeddedView(componentRef.instance.template);
    //this.dragDrop.createDropList();
    componentRef.instance.dragEnable(this.dragDrop);

    componentRef.changeDetectorRef.detectChanges();
    //componentRef.instance.panel.accordion = this.accordion;
    
  }
  dropLocal(){
    console.log('inside dropLcaol.');
  }
}
