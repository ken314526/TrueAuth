import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { customAlphabet, nanoid } from "nanoid";

export const getHtmlMessage = (
  emailType: string,
  URL: string,
  code: string
) => {
  if (emailType === "OTP") {
    return `<p>
              Your OTP to resume your jouney:
              <strong>${code}</strong>
            </p>`;
  }

  return `<p>
            <a href="${URL}">
              Click here
            </a> to ${
              emailType === "VERIFY"
                ? "verify your email"
                : "reset your password"
            } <br /> <hr />
            or copy and paste the below link in your browser.
            <br />
            ${URL}
          </p>`;
};

export const getHtmlSubject = (emailType: string) => {
  if (emailType === "OTP") {
    return "Your OTP to resume your journey";
  }

  return emailType === "VERIFY" ? "Verify your email" : "Reset your password";
};

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    let URL = "";
    let subject = "";
    let HTML = "";

    if (emailType === "VERIFY") {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);
      URL = `${process.env.DOMAIN}/verify-email?token=${hashedToken}`;
      subject = getHtmlSubject(emailType);
      HTML = getHtmlMessage(emailType, URL, "");

      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);
      URL = `${process.env.DOMAIN}/forgot-password-reset?token=${hashedToken}`;
      subject = getHtmlSubject(emailType);
      HTML = getHtmlMessage(emailType, URL, "");

      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "OTP") {
      const code = customAlphabet(
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        6
      )();
      subject = getHtmlSubject(emailType);
      HTML = getHtmlMessage(emailType, "", code);

      await User.findByIdAndUpdate(userId, {
        $set: {
          loginOTP: code,
          loginOTPExpiry: Date.now() + 3600000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USERID,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "abhishek@gmail.com",
      to: email,
      subject: subject,
      html: HTML,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.log("Some Error Occurred While sending email");
    console.log(error.message);
  }
};
