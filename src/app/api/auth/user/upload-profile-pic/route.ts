import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Users from "@/models/userModels";
import { getDataFromToken } from "@/helpers/getTokenData";

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = await getDataFromToken(req);
    const profilePic = formData.get("profilePic") as File | null;

    if (!profilePic) {
      return NextResponse.json(
        { error: "profilePic is required" },
        { status: 400 }
      );
    }

    const bytes = await profilePic.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = profilePic.name.split(".").pop();
    const fileName = `profile_${Date.now()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public/images");
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/images/${fileName}`;
    await Users.findOneAndUpdate({ _id: userId }, {
      profile_pic: imageUrl
    })

    return NextResponse.json(
      {
        message: "Profile picture uploaded successfully",
        imageUrl,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}