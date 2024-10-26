import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    <div class="icon" [ngClass]="icon"></div>
  `,
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() icon: string = '';
}
