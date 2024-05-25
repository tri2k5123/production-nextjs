import { connectDB } from "@/libs/connectDB";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { productName, listColor: colors, checkedSizes: sizes, price: basePrice, percentPrice, initialPrice, listImg: imgs, category, remaining} = await req.json();
        await connectDB();
        await Product.create({ productName, colors, sizes, basePrice, percentPrice, initialPrice, imgs, category, remaining })
        return NextResponse.json(
            { message: "create product success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error while create product" }
        )
    }
}
export async function GET() {
    try {
        await connectDB();
        const listProduct = await Product.find();
        return NextResponse.json({ listProduct })
    } catch (error) {
        
    }
}
export async function PUT(req) {
    try {
        const { id, productName, listColor: colors, checkedSizes: sizes, price: basePrice, percentPrice, initialPrice, listImg: imgs, category, remaining} = await req.json();
        await connectDB();
        await Product.findByIdAndUpdate(id, { productName, colors, sizes, basePrice, percentPrice, initialPrice, imgs, category, remaining })
        return NextResponse.json(
            { message: "Update product success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error when you update product" },
            { status: 500 }
        )
    }
}
export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        await connectDB();
        await Product.findByIdAndDelete(id);
        return NextResponse.json(
            { message: "Delete product success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error when you Delete product" },
            { status: 500 }
        )
    }
}