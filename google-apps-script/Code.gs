const RECEIVER_EMAIL = "agenceweb4u@gmail.com";

function doPost(e) {
  try {
    const data = e && e.parameter ? e.parameter : {};
    const lines = [
      "Name: " + (data.name || "Not provided"),
      "Email: " + (data.email || "Not provided"),
      "Phone: " + (data.phone || "Not provided"),
      "Service: " + (data.service || "Not provided"),
      "Requested package: " + (data.requested_package || "Not provided"),
      "Page: " + (data._url || "Not provided"),
      "",
      "Message:",
      data.message || "No message"
    ];

    const mail = {
      to: RECEIVER_EMAIL,
      replyTo: data.email || RECEIVER_EMAIL,
      subject: data._subject || "New website enquiry - Agence Web4U",
      body: lines.join("\n")
    };

    if (data.image && data.mimeType) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(data.mimeType)) {
        throw new Error("Image format not allowed");
      }

      const imageBytes = Utilities.base64Decode(data.image);
      if (imageBytes.length > 5 * 1024 * 1024) {
        throw new Error("Image is larger than 5 MB");
      }

      mail.attachments = [
        Utilities.newBlob(imageBytes, data.mimeType, data.fileName || "image.jpg")
      ];
    }

    MailApp.sendEmail(mail);
    return jsonResponse({ success: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, error: error.message });
  }
}

function doGet() {
  return jsonResponse({ success: true, service: "Agence Web4U contact form" });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
