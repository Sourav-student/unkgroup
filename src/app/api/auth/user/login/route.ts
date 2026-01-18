import { connect } from "@/dbConfig/dpConfig";
import Users from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

connect();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isCorrectPassword = await bcryptjs.compare(password, user.password);

    if (!isCorrectPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;

    if (!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY) {
      throw new Error("JWT environment variables are missing");
    }

    const signOptions: SignOptions = {
      expiresIn: ACCESS_TOKEN_EXPIRY as StringValue,
    };

    const token = jwt.sign(
      tokenData,
      ACCESS_TOKEN_SECRET,
      signOptions
    );


    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}