import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET (
    req: Request, 
    { params }: { params: { statusId: string } }
) {
    try {

        if (!params.statusId) {
            return new NextResponse('status ID  is required', {status: 400})
        }

        const status= await prismadb.status.findUnique({
            where: {
                id: params.statusId
            },
        })

        return NextResponse.json(status)
    }catch (error) {
        console.log('[STATUS_GET]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}


export async function PATCH (
    req: Request, 
    { params }: { params: { storeId: string, statusId: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const {name} = body;

        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        if (!name) {
            return new NextResponse('Label is required', {status: 400})
        }

        if(!params.statusId) {
            return new NextResponse('status ID is required', {status: 400})
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

        const status= await prismadb.status.updateMany({ 
            where: { 
                id: params.statusId 
            }, data: { 
                name
            } });        

        return NextResponse.json(status)
    }catch (error) {
        console.log('[STATUS_PATCH]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}


export async function DELETE (
    req: Request, 
    { params }: { params: { storeId: string, statusId: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse('You are not authenticated', {status: 401})
        }

        if (!params.storeId) {
            return new NextResponse('Missing projectId', {status: 400})
        }

        if (!params.statusId) {
            return new NextResponse('status ID is required', {status: 400})
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
        const status= await prismadb.status.deleteMany({
            where: {
                id: params.statusId
            },
        })

        return NextResponse.json(status)
    }catch (error) {
        console.log('[STATUS_DELETE]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}