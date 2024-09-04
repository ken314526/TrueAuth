import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User exists");

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    // const tokenData = {
    //   id: user._id,
    //   username: user.username,
    //   email: user.email,
    // };

    // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    //   expiresIn: "2h",
    // });

    await sendEmail({ email, emailType: "OTP", userId: user._id });

    const response = NextResponse.json({
      // message: "Logged in Successfully",
      message: "OTP sent successfully",
      success: true,
    });

    // response.cookies.set("token", token, {
    //   httpOnly: true,
    // });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
