import { connectDB } from "@/libs/connectDB";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { idOrder } = params;
        await connectDB();
        const order = await Order.findById(idOrder);
        return NextResponse.json(
            { order }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error while get order by id" },
            { status: 500 }
        )
    }
}