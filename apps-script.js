function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    ensureHeaderRow_(sheet);

    const data = parseRequestData_(e);
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      String(data.phone || ""),
      data.organization || "",
      data.title || ""
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function parseRequestData_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return e.parameter || {};
    }
  }

  return e.parameter || {};
}

function ensureHeaderRow_(sheet) {
  const headers = ["時間戳記", "姓名", "email", "電話", "單位", "職稱"];
  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeader = currentHeaders.some(function(value) {
    return value !== "";
  });

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  sheet.getRange("D:D").setNumberFormat("@");
}

function doGet() {
  return json_({ ok: true, message: "2026workshop endpoint is ready." });
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
