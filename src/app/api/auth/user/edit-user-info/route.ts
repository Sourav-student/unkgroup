import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getTokenData";
import { connect } from "@/dbConfig/dpConfig";
import Users from "@/models/userModels";

connect();

export async function PATCH(req: NextRequest) {
  try {
    const { username } = await req.json();
    const userId = await getDataFromToken(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    if (!username || !username.trim()) {
      return NextResponse.json(
        { error: "Provide username first!", success: false },
        { status: 400 }
      );
    }

    const formattedUsername = username.trim().toLowerCase();

    // check username excluding current user
    const existingUser = await Users.findOne({
      username: formattedUsername,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists, try another", success: false },
        { status: 400 }
      );
    }

    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      { username: formattedUsername },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Username updated successfully",
        success: true,
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PATCH USERNAME ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}