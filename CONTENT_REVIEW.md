# Content to confirm before launch

Clinic schedule lives in `src/data/care.ts`. Update the confirmed date after checking with the hospital. Unconfirmed fields use null and display a call-to-confirm message.

- Confirm all clinic hours, Saturday rules and branch availability. OB-GYN has conflicting end times; fifth Saturday and preventive check-up/private OPD timing need confirmation.
- Founder birth year differs: current site 1922, client draft 1914. Founder/history copy needs sign-off.
- Confirm current leadership, board membership and names before changing team profiles.
- Verify screening figures, outcome percentages and reporting periods before adding homepage statistics.
- Approve patient stories and image publication consent. Add approved stories to src/data/editorial.ts; homepage and story routes populate automatically.
- Add confirmed news to src/data/editorial.ts. Homepage news appears only when entries exist.
- Confirm addresses, contacts and services for McLeod Ganj and Delek House, Chandigarh.
- Supply application links, correct application email and confirmed fees/eligibility for partnerships. Enquiries currently lead to Contact.
- Confirm recurring donation support and gift amounts before adding payment choices. Existing PayPal destination remains unchanged.
- Contact form still needs its submission service; no backend was added in this structural pass.
- User confirmed client approval for public use of the supplied document photographs. Selected photos now appear on program, history, impact and location pages. Confirm dates and credits for archival photos; the history photo is currently labeled date unknown.

## Added in the November 13 content pass (needs client sign-off)
- Team: leadership and Board taken from the client's "Website ideas" doc and the April 4, 2025 circular (Dr. Tenzin Tsundue Chief Administrator from May 1, 2025; Mr. Dawa Phunkyi moved to "Those who helped shape Delek"). Head Nurse is named in the doc only as "………", so is not shown yet. Roles for Tashi Dhondup, Tsering Damdhul and Tenzin Shenyen are still generic "Administration".
- Homepage "Our reach": 28,000 TB screenings comes from the TB REACH milestone ("nearly 28,000"); the doc's homepage draft says "30,000+ through Zero TB screening". Confirm one figure and program. "800 women screened" is from the homepage draft, while the milestones text says "hundreds". Confirm both.
- History: founder born 1914 (client doc) is now used; the earlier site said 1922. The 1971–2025 timeline uses the doc plus dates from photo filenames in media-images. Captions marked "Date unknown" need dates if the hospital has them. The 2017 Zero TB entry shows the 2016 audience photo, captioned as 2016.
- Cervical cancer slide on the homepage uses the stock services/women.jpg. Replace it with a real screening-camp photo when one is available.
- Schedule: 5th Saturday (9 am–1 pm), the Immunization Clinic (2nd Tuesday, 10:30 am–1 pm) and "emergency services only on official holidays" come from the hospital's 2024 opening-hours graphic (media-images/2024/08). Reconfirm they are still current.
- Urgent-care bar uses the main number +91 1892 222053. Confirm whether there is a separate 24-hour emergency or ambulance number.
- Patient & Community Stories and News are hidden from the menu (and set to noindex) until entries are added to src/data/editorial.ts. The homepage story carousel appears automatically once stories exist (optional fields: quote, name).
