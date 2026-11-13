// Update clinic information here after confirmation with the hospital.
// null means unconfirmed: the page displays a call-to-confirm message instead of guessed hours.
export const schedule = {
  reviewedOn: null as string | null, // YYYY-MM-DD, set when the hospital confirms this schedule
  clinics: [
    {id: 'general-opd', name: 'General OPD', days: 'Monday–Friday', hours: '9:00 am–5:00 pm', note: 'Lunch break: 1:00–2:00 pm. Ground floor. On official holidays, only emergency services are available.'},
    {id: 'dental', name: 'Dental Clinic', days: 'Monday–Friday', hours: '9:00 am–5:00 pm', note: 'Lunch break: 1:00–2:00 pm. Ground floor.'},
    {id: 'pharmacy-laboratory', name: 'Pharmacy & Laboratory', days: 'Monday–Friday', hours: '9:00 am–5:00 pm', note: 'Lunch break: 1:00–2:00 pm. Ground floor.'},
    {id: 'immunization', name: 'Immunization Clinic', days: 'Tuesday (second Tuesday of each month)', hours: '10:30 am–1:00 pm', note: 'Held once a month. Call to confirm vaccines available for your child.'},
    {id: 'obgyn', name: 'Obstetrics & Gynecology', days: 'Friday', hours: null, note: 'Please call to confirm clinic hours before travelling.'},
    {id: 'endoscopy', name: 'Endoscopy', days: 'Tuesday morning', hours: null, note: 'Prior appointment required. Call to arrange your visit.'},
    {id: 'check-up', name: 'Preventive Health Check-Up / Private OPD', days: null, hours: null, note: 'Contact the hospital for appointments, location and availability.'},
    {id: 'mcleod-opd', name: 'McLeod Ganj Branch OPD', days: 'Monday–Friday', hours: '10:00 am–12:30 pm', note: 'Call the hospital to confirm branch availability.'},
  ],
  saturdays: [
    {day:'1st Saturday',hours:'9:00 am–5:00 pm'},
    {day:'2nd Saturday',hours:'Closed'},
    {day:'3rd Saturday',hours:'9:00 am–1:00 pm'},
    {day:'4th Saturday',hours:'9:00 am–1:00 pm'},
    {day:'5th Saturday',hours:'9:00 am–1:00 pm'},
  ],
};
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
