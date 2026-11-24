import {readFile} from 'node:fs/promises';
import {getCliClient} from 'sanity/cli';
import {SCHEDULE_ID} from '../schemaTypes/clinicSchedule';

// One-time import of the existing schedule (studio/seed/schedule.json).
// It never overwrites a schedule that already exists in Sanity.
const client = getCliClient({apiVersion: '2025-02-19'}).withConfig({useCdn: false});
const seed = JSON.parse(await readFile(new URL('../seed/schedule.json', import.meta.url), 'utf8'));

const result = await client.createIfNotExists({
  _id: SCHEDULE_ID,
  _type: 'clinicSchedule',
  ...(seed.reviewedOn ? {reviewedOn: seed.reviewedOn} : {}),
  clinics: seed.clinics.map(({id, ...clinic}: {id: string; [key: string]: unknown}) => ({
    _key: id, _type: 'clinic', clinicId: id,
    ...Object.fromEntries(Object.entries(clinic).filter(([, value]) => value !== null)),
  })),
  saturdays: seed.saturdays.map((saturday: {day: string; hours: string | null}, index: number) => ({
    _key: `saturday-${index + 1}`, _type: 'saturday', day: saturday.day,
    ...(saturday.hours ? {hours: saturday.hours} : {}),
  })),
});
console.log(result._createdAt === result._updatedAt ? 'Imported clinic schedule' : 'Clinic schedule already exists; left unchanged');
