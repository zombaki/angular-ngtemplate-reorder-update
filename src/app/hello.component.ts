import { Component, Input, ViewChild, TemplateRef, ViewContainerRef ,ViewEncapsulation, ElementRef} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem,DragRef } from '@angular/cdk/drag-drop';
import {MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'hello',
  template: `
    <ng-template #tmpl>
          <div #dvDragElement>
        <p>{{title}}</p>
        </div>
    </ng-template>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class HelloComponent {
  @ViewChild('tmpl') template: TemplateRef<any>;
  @ViewChild('dvDragElement') div :HTMLElement;
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
  title: string;
  localDragRef :DragRef[]= new Array<DragRef>();
  dragEnable(dragDrop,dropREf){
    
    console.log(dragDrop);
    console.log(this.div);
    let a=dragDrop.createDrag(this.div);
    //a._withDropContainer(dropREf);
    console.log(a);
    this.localDragRef.push(a);
    console.log(dropREf);
    dropREf.withItems(this.localDragRef);
    console.log(dropREf);
    console.log(a);
  }
}
