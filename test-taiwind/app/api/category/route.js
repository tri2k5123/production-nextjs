import { connectDB } from "@/libs/connectDB";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { nameCategory, slugCategory } = await req.json();
        await connectDB();
        await Category.create({ name: nameCategory, category: slugCategory });
        return NextResponse.json(
            { message: "category created" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: " error due to create category " },
            { status: 500 }
        )
    }
}
export async function GET() {
    try {
        await connectDB();
        const listCategories = await Category.find();
        return NextResponse.json({listCategories});
    } catch (error) {
        return NextResponse.json(
            { message: "error when you get data categories!" },
            { status: 500 }
        );
        
    }
}
export async function PUT(req) {
    try {
        const { idUpdate: id, nameUpdate: name, slugUpdate: category } = await req.json();
        await connectDB();
        await Category.findByIdAndUpdate(id, { name, category })
        return NextResponse.json(
            { message: "Update category success" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Have an error while Update category" },
            { status: 500 }
        )
    }
}
export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");

        await connectDB();
        await Category.findByIdAndDelete(id);

        return NextResponse.json(
            { message: "Category deleted" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while deleting the Category." },
            { status: 500 }
        );
    }
}