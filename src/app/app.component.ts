import { Component, Input, ViewChild, TemplateRef, ViewContainerRef ,ViewEncapsulation,ComponentFactoryResolver, ChangeDetectorRef, OnInit} from '@angular/core';
import {MatAccordion} from '@angular/material';
import {HelloComponent} from './hello.component';
import { DragDrop,DragRef, DropListRef, moveItemInArray } from '@angular/cdk/drag-drop';
let counter = 1;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
   displayMode: string = 'default';
  multi = false;

  @ViewChild("piechartsContainer", {read: ViewContainerRef}) pieChartContainer: ViewContainerRef;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('dvParent') dvParent: HTMLElement;
  constructor(private resolver: ComponentFactoryResolver,
  private dragDrop:DragDrop,
  private chRef: ChangeDetectorRef) {}
  localDragRef :DragRef[]= new Array<DragRef>();
  droplistREf: DropListRef<any>;

  ngOnInit(){
    this.droplistREf=this.dragDrop.createDropList(this.dvParent);

     this.droplistREf.dropped.subscribe(a=>{
      moveItemInArray(this.localDragRef,a.previousIndex,a.currentIndex);
      })
  }


  add() {
    let componentFactory = this.resolver.resolveComponentFactory(HelloComponent);
    let componentRef = componentFactory.create(this.pieChartContainer.injector);
    componentRef.instance.title = 'Dynamic accordion header' + counter++;
    this.pieChartContainer.createEmbeddedView(componentRef.instance.template);
    componentRef.changeDetectorRef.detectChanges();
    this.localDragRef.push(componentRef.instance.dragEnable(this.dragDrop));
    this.droplistREf.withItems(this.localDragRef);
    componentRef.instance.panel.accordion = this.accordion;
  }
  dropLocal(a){
    console.log('inside dropLcaol.');
  }
}
