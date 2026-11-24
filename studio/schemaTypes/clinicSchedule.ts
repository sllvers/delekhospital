import {defineArrayMember, defineField, defineType, type ArrayActionName} from 'sanity';

export const SCHEDULE_ID = 'clinic-schedule';

// These rules match src/data/schedule-schema.ts, which checks the same data
// again when the website builds. Clinic IDs and Saturdays are fixed because
// service pages and the Find Care planner link to them.
export const CLINIC_IDS = ['general-opd', 'dental', 'pharmacy-laboratory', 'immunization', 'obgyn', 'endoscopy', 'check-up', 'mcleod-opd'];
export const SATURDAYS = ['1st Saturday', '2nd Saturday', '3rd Saturday', '4th Saturday', '5th Saturday'];
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const fixedList = {sortable: false, disableActions: ['add', 'addBefore', 'addAfter', 'remove', 'duplicate', 'copy'] as ArrayActionName[]};

const blank = (value?: string | null) => !value || !value.trim();

const clinic = defineArrayMember({
  name: 'clinic',
  title: 'Clinic',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Clinic name', type: 'string', validation: rule => rule.required()}),
    defineField({
      name: 'weekdays', title: 'Weekday filters', type: 'array',
      of: [{type: 'string'}],
      options: {list: WEEKDAYS, layout: 'grid'},
      description: 'Tick every weekday on which this clinic may run. For appointments by arrangement, untick all and leave "Days shown to visitors" blank.',
    }),
    defineField({
      name: 'days', title: 'Days shown to visitors', type: 'string',
      description: 'Include any monthly restriction, e.g. "Tuesday (second Tuesday of each month)". Keep it consistent with the ticked weekdays.',
    }),
    defineField({
      name: 'hours', title: 'Clinic hours', type: 'string',
      description: 'For example "9:00 am–5:00 pm". Leave blank to show "Call to confirm". Enter "Closed" for a confirmed closure.',
    }),
    defineField({
      name: 'note', title: 'Before you visit', type: 'text', rows: 3,
      description: 'Lunch breaks, appointment requirements, holiday restrictions or temporary changes.',
      validation: rule => rule.required(),
    }),
    defineField({name: 'clinicId', title: 'Clinic ID', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'facility', type: 'string', readOnly: true, hidden: true}),
  ],
  validation: rule => rule.custom((value?: {days?: string; weekdays?: string[]}) => {
    if (!value) return true;
    const hasDays = !blank(value.days);
    const hasWeekdays = (value.weekdays?.length ?? 0) > 0;
    return hasDays === hasWeekdays
      ? true
      : 'Tick weekdays when days are listed. For by-arrangement clinics, leave both blank.';
  }),
  preview: {
    select: {title: 'name', days: 'days', hours: 'hours'},
    prepare: ({title, days, hours}) => ({title, subtitle: [days || 'By arrangement', hours || 'Call to confirm'].join(' · ')}),
  },
});

const saturday = defineArrayMember({
  name: 'saturday',
  title: 'Saturday',
  type: 'object',
  fields: [
    defineField({name: 'day', type: 'string', readOnly: true}),
    defineField({
      name: 'hours', type: 'string',
      description: 'Enter "Closed" for a confirmed closure, or leave blank to show "Call to confirm".',
    }),
  ],
  preview: {
    select: {title: 'day', hours: 'hours'},
    prepare: ({title, hours}) => ({title, subtitle: hours || 'Call to confirm'}),
  },
});

export const clinicSchedule = defineType({
  name: 'clinicSchedule',
  title: 'Clinic schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'reviewedOn', title: 'Last confirmed by the hospital', type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      description: 'Only enter a date after the hospital has confirmed this schedule.',
    }),
    defineField({
      name: 'clinics', title: 'Clinics', type: 'array', of: [clinic], options: fixedList,
      validation: rule => rule.custom((value?: {clinicId?: string}[]) => {
        const ids = (value ?? []).map(item => item.clinicId);
        return ids.length === CLINIC_IDS.length && CLINIC_IDS.every(id => ids.filter(x => x === id).length === 1)
          ? true : 'The clinic list must contain each existing clinic exactly once. Ask the website maintainer to add or remove clinics.';
      }),
    }),
    defineField({
      name: 'saturdays', title: 'Main hospital Saturdays', type: 'array', of: [saturday], options: fixedList,
      validation: rule => rule.custom((value?: {day?: string}[]) =>
        (value ?? []).length === SATURDAYS.length && (value ?? []).every((item, index) => item.day === SATURDAYS[index])
          ? true : 'Keep all five Saturdays in their original order.'),
    }),
  ],
  preview: {prepare: () => ({title: 'Clinic schedule'})},
});
