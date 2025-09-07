const express = require("express");
const router = express.Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/request", async (req, res) => {
  const { name, email, company, message } = req.body;

  try {
    const msg = {
      from: process.env.RESEND_FROM_EMAIL || "Brane Bot <onboarding@resend.dev>", 
      to: process.env.RESEND_TO_EMAIL || "paulaber68@gmail.com",
      subject: "New Demo Request - Brane AI",
      html: `
        <h3>New Demo Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await resend.emails.send(msg);

    console.log("📧 Demo request email sent:", { name, email, company });
    res.json({ success: true, message: "Demo request submitted successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to submit demo request. Please try again later.",
    });
  }
});

module.exports = router;
