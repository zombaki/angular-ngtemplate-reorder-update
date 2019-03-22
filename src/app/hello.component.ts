import { Component, Input, ViewChild, TemplateRef, ViewContainerRef ,ViewEncapsulation, ElementRef} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'hello',
  template: `
    <ng-template #tmpl>
      <mat-expansion-panel>
          <div #dvDragElement>
        <mat-expansion-panel-header>{{title}}</mat-expansion-panel-header>
        <p>Some text</p>
        </div>
      </mat-expansion-panel>
    </ng-template>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class HelloComponent {
   @ViewChild('tmpl') template: TemplateRef<any>;
   @ViewChild('dvDragElement') div:ElementRef;
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
  title: string;
  dragEnable(dragDrop){
    console.log(dragDrop);
    console.log(this.div);
    dragDrop.createDrag(this.div);
  }
}
