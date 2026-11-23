import scheduleData from './schedule.json';
import { scheduleSchema } from './schedule-schema';

// Fail the build on invalid CMS edits; blank optional fields become null.
export const schedule = scheduleSchema.parse(scheduleData);
export const services = [
 ['General Medicine','Outpatient consultations and ongoing patient care.'],
 ['Dental Care','Dental consultations and treatment.'],
 ['Endoscopy','Digestive tract examinations by prior appointment.'],
 ['X-ray','Diagnostic imaging to support clinical assessment.'],
 ['ECG','Recording of the heart’s electrical activity.'],
 ['Preventive Health Check-Up','Health assessment by appointment.'],
 ['Obstetrics & Gynecology','Weekly consultations for women’s health concerns.'],
 ['Pharmacy','Prescription and essential medicines for patients.'],
 ['Laboratory','Blood tests and other diagnostic investigations.'],
];

// Explicit links: diagnostic services without a listed timetable stay call-to-confirm.
const clinicForService: Record<string, string> = {
 'General Medicine':'general-opd', 'Dental Care':'dental', 'Endoscopy':'endoscopy',
 'Preventive Health Check-Up':'check-up', 'Obstetrics & Gynecology':'obgyn',
 'Pharmacy':'pharmacy-laboratory', 'Laboratory':'pharmacy-laboratory',
};
export const careServices = services.map(([title, description]) => ({
 id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title, description,
 clinic: schedule.clinics.find(clinic => clinic.id === clinicForService[title]),
}));
