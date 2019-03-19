import { Component, Input, ViewChild, TemplateRef, ViewContainerRef ,ViewEncapsulation} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'hello',
  template: `
    <ng-template #tmpl>
      <mat-expansion-panel cdkDrag>
        <mat-expansion-panel-header>{{title}}</mat-expansion-panel-header>
        <p>Some text</p>
      </mat-expansion-panel>
    </ng-template>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class HelloComponent {
   @ViewChild('tmpl') template: TemplateRef<any>;
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
  title: string;

}
