import { getDataFromToken } from "@/helpers/getTokenData";

import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/userModels";

import { connect } from "@/dbConfig/dpConfig";

connect();

export async function GET(req : NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await Users.findOne({_id : userId}).select("-password -is_verified -is_admin");
    
    return NextResponse.json({
      message : "User found",
      user
    })
  } catch (error : any) {
    return NextResponse.json({error : error.message}, {status  :400});
  }
}