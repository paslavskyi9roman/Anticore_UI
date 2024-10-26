import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

import {IconComponent} from '../icon/icon.component';
import {navLinksConst, socialLinksConst} from '../../consts/navigation.constants';
import {AuthService} from '../../services/auth-service.service';

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
  public authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {});
  }
}
