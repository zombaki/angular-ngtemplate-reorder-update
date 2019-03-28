import { Component, Input, ViewChild, TemplateRef, ViewContainerRef ,ViewEncapsulation, ElementRef} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem,DragRef } from '@angular/cdk/drag-drop';
import {MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'hello',
  template: `
    <ng-template #tmpl>
          <div #dvDragElement>
          <mat-expansion-panel>
        <mat-expansion-panel-header>{{title}}</mat-expansion-panel-header>
        <p>someText</p>
        </mat-expansion-panel>
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
  //DRAG ENABLE : THIS FUNCTION IS INVOKED TO RETURN DRAG REFERENCE LATER IN PARENT WE ASSOCIATE IT WITH DRAG REFRENCE LIST
  dragEnable(dragDrop){
   return dragDrop.createDrag(this.div);
    
  }
}
