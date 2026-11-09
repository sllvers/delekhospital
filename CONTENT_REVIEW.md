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
