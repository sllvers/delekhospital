import { stories } from './editorial';

export const navigation = [
  { label: 'About Us', href: '/about', children: [{label: 'About Delek', href: '/about'}, {label: 'History & Milestones', href: '/milestones'}, {label: 'Leadership & Team', href: '/team'}] },
  { label: 'Our Impact', href: '/our-impact', children: [{label: 'Public Health Programs', href: '/our-impact'}, ...(stories.length ? [{label: 'Patient & Community Stories', href: '/impact-stories'}] : [])] },
  { label: 'Find Care', href: '/find-care', children: [{label: 'Plan Your Visit', href: '/find-care'}, {label: 'Clinics & Schedules', href: '/find-care/schedules'}, {label: 'Services', href: '/find-care/services'}, {label: 'TB Care', href: '/find-care/tb-care'}, {label: 'Our Locations', href: '/find-care/locations'}, {label: 'Contact', href: '/contact'}] },
  { label: 'Partner With Us', href: '/partner-with-us', children: [{label: 'Partnership Opportunities', href: '/partner-with-us'}, {label: 'Visiting Specialists', href: '/partner-with-us/visiting-specialists'}, {label: 'Clinical Observerships', href: '/partner-with-us/observerships'}, {label: 'Institutional Partnerships', href: '/partner-with-us/institutions'}] },
];
