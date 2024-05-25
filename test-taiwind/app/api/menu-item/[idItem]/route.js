import { connectDB } from "@/libs/connectDB";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { idItem } = params;
        await connectDB();
        const products = await Product.find();
        const product = products.find((product) => {
            return product._id == idItem;
        })
        return NextResponse.json({ product })
    } catch (error) {
        return NextResponse.json(
            { message: "Error get topic" },
            { status: 500 }
        )
    }
}