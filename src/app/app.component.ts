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
//PROBLEM : STILL NOT ABLE TO REORDER THE CHANGED INDEX BUT THIS IS A GOOD EXAMPLE TO CHECK HOW TO IMPLEMENT CDK DRAG DROP USING SERVICE
export class AppComponent implements OnInit  {
   displayMode: string = 'default';
  multi = false;

  @ViewChild("component", {read: ViewContainerRef}) component: ViewContainerRef;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('dvParent') dvParent: HTMLElement;
  constructor(private resolver: ComponentFactoryResolver,
  private dragDrop:DragDrop,
  private chRef: ChangeDetectorRef) {}
  localDragRef :DragRef[]= new Array<DragRef>();
  droplistREf: DropListRef<any>;

  ngOnInit(){
    this.droplistREf=this.dragDrop.createDropList(this.dvParent);
    //TO INVOKE DROP FUNCTIONALITY OF DRAGABLE COMPOENET INSIDE LIST
     this.droplistREf.dropped.subscribe(a=>{
      moveItemInArray(this.localDragRef,a.previousIndex,a.currentIndex);
      })
  }


  add() {
    //DYNAMIC COMPONENT CREATION
    let componentFactory = this.resolver.resolveComponentFactory(HelloComponent);
    let componentRef = componentFactory.create(this.component.injector);
    componentRef.instance.title = 'Dynamic accordion header' + counter++;
    this.component.createEmbeddedView(componentRef.instance.template);

    componentRef.changeDetectorRef.detectChanges();
    //MAINTAIN DRAGREFERENCE LIST
    this.localDragRef.push(componentRef.instance.dragEnable(this.dragDrop));
    this.droplistREf.withItems(this.localDragRef);
    componentRef.instance.panel.accordion = this.accordion;
  }
  dropLocal(a){
    console.log('inside dropLcaol.');
  }
}
