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
             return new NextResponse('Project ID is required', {status: 400}) 
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
        
        const status= await prismadb.status.create({
            data: {
                name,
                projectId: params.storeId
            }
        })

        return NextResponse.json(status)
    }catch (error) {
        console.log('[STATUS_POST]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}



export async function GET(
    req: Request,
     { params }: { params: { storeId: string } }) {

    try {

        if(!params.storeId) {
             return new NextResponse('Project ID is required', {status: 400}) 
        }
        
        const statuses = await prismadb.status.findMany({
            where: {
                projectId: params.storeId
            }
        })

        return NextResponse.json(statuses)
    }catch (error) {
        console.log('[STATUS_GET]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}
