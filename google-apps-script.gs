/**
 * AIDE Workshop — Registration form handler
 *
 * This script receives submissions from register.html and appends them as
 * rows in the Google Sheet it is bound to.
 *
 * SETUP (one time):
 *   1. Create a new Google Sheet (sheet.new).
 *   2. Extensions → Apps Script. Delete any starter code and paste this file.
 *   3. Click Deploy → New deployment → type "Web app".
 *        - Description: AIDE registration
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   4. Authorize when prompted. Copy the Web app URL it gives you.
 *   5. Paste that URL into register.html as the value of SHEETS_ENDPOINT.
 *
 * To change the sheet later, just edit the bound sheet — no redeploy needed
 * unless you change this code (then Deploy → Manage deployments → Edit → new version).
 */

var HEADERS = [
  'Timestamp',
  'Faculty name', 'Faculty email',
  'Member 1', 'Member 1 email',
  'Member 2', 'Member 2 email',
  'Member 3', 'Member 3 email',
  'Area of research',
  'Attendance',
  'Other information'
];

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Add a header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var p = (e && e.parameter) ? e.parameter : {};

    var attendance = p.attendance === 'definitely' ? 'I will definitely attend'
                   : p.attendance === 'thinking'   ? 'Still thinking about it'
                   : (p.attendance || '');

    sheet.appendRow([
      new Date(),
      p.facultyName  || '', p.facultyEmail  || '',
      p.member1      || '', p.member1Email  || '',
      p.member2      || '', p.member2Email  || '',
      p.member3      || '', p.member3Email  || '',
      p.researchArea || '',
      attendance,
      p.other        || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
