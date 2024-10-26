import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

import {IconComponent} from '../icon/icon.component';
import {navLinksConst, socialLinksConst} from '../../consts/navigation.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    IconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  socialLinks = socialLinksConst;
  navLinks = navLinksConst;
}
