import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { otp } = reqBody;

    const user = await User.findOne({ loginOTP: otp });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "2h",
    });

    const response = NextResponse.json({
      message: "Logged in Successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    user.loginOTP = "";
    user.loginOTPExpiry = Date.now();

    await user.save();

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
