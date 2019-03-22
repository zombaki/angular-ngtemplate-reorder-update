import { Component, Input, ViewChild, TemplateRef, ViewContainerRef ,ViewEncapsulation,ComponentFactoryResolver} from '@angular/core';
import {MatAccordion} from '@angular/material';
import {HelloComponent} from './hello.component';
import { DragDrop,DragRef } from '@angular/cdk/drag-drop';
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
  @ViewChild('dvParent') dvParent: HTMLElement;
  constructor(private resolver: ComponentFactoryResolver,
  private dragDrop:DragDrop) {}
  localDragRef :DragRef[]= new Array<DragRef>();
  add() {
    let componentFactory = this.resolver.resolveComponentFactory(HelloComponent);
    let componentRef = componentFactory.create(this.pieChartContainer.injector);
    componentRef.instance.title = 'Dynamic accordion header' + counter++;
    this.pieChartContainer.createEmbeddedView(componentRef.instance.template);
    console.log('this is start');
    console.log(this.dvParent);
    let droplistREf=this.dragDrop.createDropList(this.dvParent);
    componentRef.changeDetectorRef.detectChanges();
    this.localDragRef.push(componentRef.instance.dragEnable(this.dragDrop));
    droplistREf.withItems(this.localDragRef);


    //componentRef.instance.panel.accordion = this.accordion;
    
  }
  dropLocal(){
    console.log('inside dropLcaol.');
  }
}
