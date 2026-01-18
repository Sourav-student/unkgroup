import Users from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import {connect} from "@/dbConfig/dpConfig";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email } = await req.json();
    if (!username || !email) {
      return NextResponse.json({
        error: "Give all required fields"
      }, { status: 400 });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "email not exist!" }, { status: 400 });
    }

    if (user.username !== username) {
      return NextResponse.json({ error: "incorrect username" }, { status: 400 });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.forgot_password_token = token;
    user.forgot_password_token_expiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    return NextResponse.json({
      message: "username and email are valid",
      success: true,
      token
    });
  } catch (error: any) {
    console.log("Error : ", error);
    return NextResponse.json({
      error: error.message
    }, { status: 500 });
  }
}