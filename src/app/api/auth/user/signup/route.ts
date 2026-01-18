import {connect} from "@/dbConfig/dpConfig";
import Users from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req : NextRequest) {
  try {
    const reqBody = await req.json();
    const {username, email, password} = reqBody;

    if(!username || !email || !password){
      return NextResponse.json({
        error : "Give all required fields"
      }, {status : 401})
    }

    const user = await Users.findOne({email});

    if(user){
      return NextResponse.json({error : "user already exists"}, {status : 400})
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new Users({
       username,
       email,
       password : hashedPassword
    })

    const saveUser = await newUser.save();
    console.log(saveUser);

    return NextResponse.json({
      message : "User created successfully",
      success : true,
      saveUser
    })

  } catch (error : any) {
    return NextResponse.json({error : error.message}, {status : 500});
  }
}