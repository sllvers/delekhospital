import { z } from 'astro/zod';

const optionalText = z.preprocess(
  value => value == null || (typeof value === 'string' && !value.trim()) ? null : value,
  z.string().trim().min(1).nullable(),
);
const clinicIds = ['general-opd', 'dental', 'pharmacy-laboratory', 'immunization', 'obgyn', 'endoscopy', 'check-up', 'mcleod-opd'];
const saturdayNames = ['1st Saturday', '2nd Saturday', '3rd Saturday', '4th Saturday', '5th Saturday'];

export const scheduleSchema = z.object({
  reviewedOn: optionalText.refine(value => {
    if (value === null) return true;
    const date = new Date(value);
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  }, 'Enter a real confirmation date as YYYY-MM-DD, or leave blank.'),
  clinics: z.array(z.object({
    id: z.string(),
    name: z.string().trim().min(1),
    facility: z.enum(['main', 'branch']),
    weekdays: z.preprocess(value => value == null ? [] : value, z.array(z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']))),
    days: optionalText,
    hours: optionalText,
    note: z.string().trim().min(1),
  }).refine(clinic => clinic.days === null ? clinic.weekdays.length === 0 : clinic.weekdays.length > 0,
    'Select weekdays when days are listed; for by-arrangement clinics leave both fields blank.')
  .refine(clinic => clinic.facility === (clinic.id === 'mcleod-opd' ? 'branch' : 'main'),
    'Clinic facility must match its existing location.'))
    .refine(clinics => clinics.length === clinicIds.length && clinicIds.every(id => clinics.filter(c => c.id === id).length === 1),
      'Keep all existing clinic IDs exactly once; service links depend on them.'),
  saturdays: z.array(z.object({ day: z.string(), hours: optionalText }))
    .refine(days => days.length === 5 && days.every((day, index) => day.day === saturdayNames[index]),
      'Keep all five Saturdays in their original order.'),
});
