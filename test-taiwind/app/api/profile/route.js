import { connectDB } from "@/libs/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

import User from "@/models/user";
import UserInfo from "@/models/userInfo";


export async function GET(req) {
    try {
        const emailSession = req.nextUrl.searchParams.get("email");
        
        await connectDB();
        const users = await User.find();
        const user = await users.find((user) => {
            return user.email == emailSession;
        })
        const usersInfos = await UserInfo.find();
        const usersInfo = await usersInfos.find((usersInfo) => {
            return usersInfo.email == emailSession;
        })
        const matchUserInfo = { email: user.email, password: user.password, name: usersInfo.name, phone: usersInfo.phone, address: usersInfo.address }
        return NextResponse.json({ matchUserInfo })
    } catch (error) {
        return NextResponse.json(
            { message: "Error get user" },
            { status: 500 }
        )
    }
}


export async function POST(req) {
    try {
        const { email, password } = await req.json();
        await connectDB();
        const users = await User.find();
        const user = users.find(user => {
            return user.email == email;
        })
        console.log(user)
        
        if(user) {
            return NextResponse.json(
                { message: "user already exist." },
                { status: 400 }
            )
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password, role: "user" })
        await UserInfo.create({ email, name: "", phone: "", address: "" })

        return NextResponse.json(
            { message: "UserInfo created" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Have an error while creating UserInfo" },
            { status: 500 }
        )
    }
}

export async function PUT(req) {
    try {
        const { emailSession, newPassword: password, newName: name, newPhone: phone, newAddress: address } = await req.json();
       
        await connectDB();

        const users = await User.find();
        const user = await users.find((user) => {
            return user.email == emailSession;
        })
        
        const usersInfos = await UserInfo.find();
        const usersInfo = await usersInfos.find((usersInfo) => {
            return usersInfo.email == emailSession;
        })

        if(user.password != password) {
            await User.findByIdAndUpdate(user._id, { password })
            
        }
        if( usersInfo.name != name ||  usersInfo.phone != phone || usersInfo.address != address) {
            await UserInfo.findByIdAndUpdate(usersInfo._id, { name, phone, address})
            
        }
        return NextResponse.json(
            { message: "Profile updated" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error Profile updated" },
            { status: 500 }
        )
    }
    
}