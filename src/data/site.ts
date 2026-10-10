/** One place for site navigation and public channels. */
export const navigation = [
  { name: 'Work', href: '/work/' },
  { name: 'About', href: '/about/' },
  { name: 'Resume', href: '/resume/' },
  { name: 'Notes', href: '/notes/' },
] as const;

export const siteSettings = {
  brand: 'Zeeshan Haider',
  tagline: 'Multidisciplinary Designer',
  socialImage: '/og-cover.png',
  github: 'https://github.com/zeeshandesigns',
  availability: 'Open to remote and international roles',
} as const;
