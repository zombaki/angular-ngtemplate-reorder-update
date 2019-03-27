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

@ViewChild('components', { read: ViewContainerRef }) viewContainerRef;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('dvParent') dvParent: HTMLElement;
  constructor(private resolver: ComponentFactoryResolver,
  private dragDrop:DragDrop,
  private chRef: ChangeDetectorRef) {}
  localDragRef :DragRef[]= new Array<DragRef>();
  droplistREf: DropListRef<any>;
components = [];
  ngOnInit(){
    this.droplistREf=this.dragDrop.createDropList(this.dvParent);

     this.droplistREf.dropped.subscribe(a=>{
      console.log(a.previousIndex);      
      console.log(a.currentIndex);    
      //const viewRef = this.viewContainerRef.get(a.previousIndex);
      //this.viewContainerRef.insert(viewRef,a.currentIndex);
      //this.viewContainerRef.remove(a.previousIndex);
      //moveItemInArray(this.localDragRef,a.previousIndex,a.currentIndex);
      //console.log(this.localDragRef);
      
      
      //this.viewContainerRef.createComponent(this.components[1],1)
      //this.components.splice(a.previousIndex, 1);
      //this.localDragRef.pop();
      
  
      //console.log(this.localDragRef[0].getRootElement());
    //  this.droplistREf.withItems(this.localDragRef);
    //   console.log(this.droplistREf.element);
    //  this.droplistREf.withItems(this.localDragRef);
    this.chRef.detectChanges();
      })
  }


  add() {
    let componentFactory = this.resolver.resolveComponentFactory(HelloComponent);
    let component = this.viewContainerRef.createComponent(componentFactory);
    
    component.instance.title = 'Dynamic accordion header' + counter++;
    component.changeDetectorRef.detectChanges();
    this.localDragRef.push(component.instance.dragEnable(this.dragDrop));
    this.droplistREf.withItems(this.localDragRef);
    this.components.push(componentFactory);
  }
  dropLocal(a){
    console.log('inside dropLcaol.');
  }
}
