import { connectDB } from "@/libs/connectDB";
import HistoryOrder from "@/models/historyOrder";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { email, total } = await req.json();

        await connectDB();
        await HistoryOrder.create({ email, total });
        return NextResponse.json(
            { message: "create history order success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error while create history order" },
            { status: 500 }
        )
    }
}
export async function GET() {
    try {
        await connectDB();
        const listHistoryOrder = await HistoryOrder.find();
        return NextResponse.json({ listHistoryOrder }) 
    } catch (error) {
        return NextResponse.json(
            { message: "Get list History order error" },
            { status: 500 }
        )
    }
}
export async function DELETE(req) {
    try {
        const id = await req.nextUrl.searchParams.get("id")
        await connectDB();
        await HistoryOrder.findByIdAndDelete(id)
        return NextResponse.json(
            { message: "Delete history order success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error while Delete history order" },
            { status: 500 }
        )
    }
}