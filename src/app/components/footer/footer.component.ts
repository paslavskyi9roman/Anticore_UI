import { Component } from '@angular/core';

import {socialLinksConst} from '../../consts/navigation.constants';
import {IconComponent} from '../icon/icon.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    IconComponent,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  socialLinks = socialLinksConst;
}
