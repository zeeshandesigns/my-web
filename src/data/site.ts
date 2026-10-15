/** One place for site navigation and public channels. */
export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work/' },
  { name: 'About', href: '/about/' },
  { name: 'Contact', href: '/contact/' },
] as const;

export const siteSettings = {
  brand: 'Zeeshan Haider',
  tagline: 'Multidisciplinary Designer',
  socialImage: '/og-cover.png',
  github: 'https://github.com/zeeshandesigns',
  availability: 'Open to remote and international roles',
} as const;
