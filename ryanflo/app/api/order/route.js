import { connectDB } from "@/libs/connectDB"
import Order from "@/models/order";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { data } = await req.json();
        await connectDB();
        await Order.create(data);
        return NextResponse.json(
            { message: "Create order success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error while Create order" },
            { status: 500 }
        )
    }
}
export async function GET(req) {
    try {
        const email = req.nextUrl.searchParams.get("email");
        
        await connectDB();
        const orders = await Order.find();
        const listOrder = orders.filter(order => {
            return order.email == email;
        })
        if(email == 'admin@gmail.com') {
            return NextResponse.json({ orders })
        } else if (listOrder.length == 0) {
            return NextResponse.json({ listOrder: null })
        } 
        else {
            return NextResponse.json({ listOrder })
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Error when you Get Order" },
            { status: 500 }
        )
    }
}
export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        await connectDB();
        await Order.findByIdAndDelete(id);
        return NextResponse.json(
            { message: "Delete order success" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error while Delete order" },
            { status: 500 }
        );
    }
}