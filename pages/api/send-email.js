import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { subject, body, recipients } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USERNAME,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    const disclaimer =
      "\n\nThis email was sent from an automated system and was not written by me(T). Replies to this email are not monitored.";

    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: recipients.join(", "),
      subject: subject,
      text: body + disclaimer,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);

        return res.status(500).json({
          success: false,
          message: "Something went wrong. Try again later",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Email sent successfully!",
        });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
