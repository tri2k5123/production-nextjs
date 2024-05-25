import { connectDB } from "@/libs/connectDB";
import UserCart from "@/models/userCart";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, cartInfos } = await req.json();
        await connectDB();
        const usersCart = await UserCart.find();
        const userCartExist = usersCart.find((user) => {
            return user.email == email;
        })
        if(userCartExist) {
            const cartInfo = [ ...userCartExist.cartInfo, ...cartInfos ]
            await UserCart.findByIdAndUpdate(userCartExist._id, { cartInfo })
        } else {
            await UserCart.create({ email, cartInfo: cartInfos });
        }
        return NextResponse.json(
            { message: "Create user cart success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error while Create user cart" },
            { status: 500 }
        )
    }
}
export async function GET(req) {
    try {
        const email = req.nextUrl.searchParams.get("email");
        await connectDB();
        const usersCart = await UserCart.find();
        const userCart = usersCart.find((userCart) => {
            return userCart.email == email;
        })
        if(userCart) {
            return NextResponse.json({ userCart })
        } else {
            return NextResponse.json({ userCart: null })

        }
        
    } catch (error) {
        return NextResponse.json(
            { message: "Error while GET User cart" },
            { status: 500 }
        )
    }
}
export async function PATCH(req) {
    try {
        const { i, email } = await req.json();
        await connectDB();
        const usersCart = await UserCart.find();
        const userCartExist = usersCart.find((user) => {
            return user.email == email;
        })
        const newUserCart = userCartExist.cartInfo.filter((item, index) => {
            return index != i;
        })
        await UserCart.findByIdAndUpdate(userCartExist._id, { cartInfo: newUserCart });
        return NextResponse.json(
            { message: "DELETE item cart success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error while delete item cart" },
            { status: 500 }
        )
    }
}
export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        await connectDB();
        await UserCart.findByIdAndDelete(id);
        return NextResponse.json(
            { message: "Delete userCart success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error while Delete userCart" },
            { status: 500 }
        )
    }
}