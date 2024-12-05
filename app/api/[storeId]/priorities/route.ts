import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
     { params }: { params: { storeId: string } }) {

    try {
        const { userId } = await auth();
        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new NextResponse('You are not authenticated', {status: 401})
        }

        if (!name) {
            return new NextResponse('Label is required', {status: 400})
        } 

        if(!params.storeId) {
             return new NextResponse('Store ID is required', {status: 400}) 
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse('Unauthorized', {status: 403})
        }
        
        const priority = await prismadb.priority.create({
            data: {
                name,
                projectId: params.storeId
            }
        })

        return NextResponse.json(priority)
    }catch (error) {
        console.log('[PRIORITY_POST]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}



export async function GET(
    req: Request,
     { params }: { params: { storeId: string } }) {

    try {

        if(!params.storeId) {
             return new NextResponse('Store ID is required', {status: 400}) 
        }
        
        const priorities = await prismadb.priority.findMany({
            where: {
                projectId: params.storeId
            }
        })

        return NextResponse.json(priorities)
    }catch (error) {
        console.log('[PRIORITIES_GET]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}
