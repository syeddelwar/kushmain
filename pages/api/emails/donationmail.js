const nodemailer = require("nodemailer");

import donationTampEmail from "emailTampletes/donationTampEmail";

export default async function sendmail(req, res) {
  try {
    if (req.method != "POST") return res.status(400);

    // create transporter
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kingdomofkushking1070bc@gmail.com",
        pass: "fxherzvqmodddhrc",
      },
    });

    // send mail with defined transport object
    let info = {
      from: "kingdomofkushking1070bc@gmail.com",
      to: req.body.email,
      subject: req.body.subject, // Subject line
      html: donationTampEmail(req.body.ammount, req.body.frequency), // html body
    };

    transporter.sendMail(info, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Successfully Send Email!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
