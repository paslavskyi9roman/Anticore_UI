import { SocialLink, NavLink } from '../models/navigation.interface';

export const socialLinksConst: SocialLink[] = [
  { href: 'https://www.facebook.com/profile.php?id=61554991253401', icon: 'facebook' },
  { href: 'https://www.instagram.com/anticore_lviv/', icon: 'instagram' },
  { href: 't.me/@direct_hit_from_below', icon: 'telegram' }
];

export const navLinksConst: NavLink[] = [
  { routerLink: '/events', label: 'Events' },
  { routerLink: '/contact-us', label: 'Contact Us' },
  { routerLink: '/info', label: 'Info' },
  { routerLink: '/fundraising', label: 'Fundraising' }
];
