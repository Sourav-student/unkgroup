import Users from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dpConfig";
import bcrypt from "bcryptjs";
connect();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { newPassword } = await req.json();

    const { token } = await params;
    console.log(token);

    if (!newPassword) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const user = await Users.findOne({
      forgot_password_token: token,
      forgot_password_token_expiry: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.forgot_password_token = undefined;
    user.forgot_password_token_expiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      success: true
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}