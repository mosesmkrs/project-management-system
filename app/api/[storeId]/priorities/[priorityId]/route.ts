import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET (
    req: Request, 
    { params }: { params: { priorityId: string } }
) {
    try {

        if (!params.priorityId) {
            return new NextResponse('Priority ID  is required', {status: 400})
        }

        const priority = await prismadb.priority.findUnique({
            where: {
                id: params.priorityId
            },
        })

        return NextResponse.json(priority)
    }catch (error) {
        console.log('[PRIORITY_GET]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}


export async function PATCH (
    req: Request, 
    { params }: { params: { storeId: string, priorityId: string } }
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

        if(!params.priorityId) {
            return new NextResponse('Priority ID is required', {status: 400})
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

        const priority = await prismadb.priority.updateMany({ 
            where: { 
                id: params.priorityId 
            }, data: { 
                name
            } });        

        return NextResponse.json(priority)
    }catch (error) {
        console.log('[PRIORITY_PATCH]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}


export async function DELETE (
    req: Request, 
    { params }: { params: { storeId: string, priorityId: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse('You are not authenticated', {status: 401})
        }

        if (!params.storeId) {
            return new NextResponse('Missing storeId', {status: 400})
        }

        if (!params.priorityId) {
            return new NextResponse('Priority ID is required', {status: 400})
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
        const priority = await prismadb.priority.deleteMany({
            where: {
                id: params.priorityId
            },
        })

        return NextResponse.json(priority)
    }catch (error) {
        console.log('[PRIORITY_DELETE]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}