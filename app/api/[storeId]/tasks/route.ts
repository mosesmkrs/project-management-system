import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
     { params }: { params: { storeId: string } }) {

    try {
        const { userId } = await auth();
        const body = await req.json();
        const { storeId } = await params;

        const { 
            title,
            description,
            priorityId,
            statusId,
            dueDate
        } = body;

        if (!userId) {
            return new NextResponse('You are not authenticated', {status: 401})
        }

        if (!title) {
            return new NextResponse('Title is required', {status: 400})
        }

        if (!description) {
            return new NextResponse('Description is required', {status: 400})
        }

        if (!priorityId) {
            return new NextResponse('Priority ID is required', {status: 400})
        }

        if (!statusId) {
            return new NextResponse('Status ID is required', {status: 400})
        }

        if (!dueDate) {
            return new NextResponse('Due Date is required', {status: 400})
        }

        if(!storeId) {
             return new NextResponse('Project ID is required', {status: 400}) 
        }

       
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse('Unauthorized', {status: 403})
        }
        const product = await prismadb.task.create({
            data: {
                title,
                description,
                priorityId,
                statusId,
                dueDate,
                projectId: storeId,
            }
        })

        return NextResponse.json(product)
    }catch (error) {
        console.log('[TASKS_POST]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}



export async function GET(
    req: Request,
     { params }: { params: { storeId: string } }) {

    try {

        const { storeId } = await params;
        const {searchParams} = new URL(req.url);
        const title = searchParams.get('title') || undefined;
        const description = searchParams.get('description') || undefined;
        const priorityId = searchParams.get('priorityId') || undefined;
        const statusId = searchParams.get('statusId') || undefined;
        const dueDate = searchParams.get('dueDate') || undefined;

        if(!storeId) {
             return new NextResponse('Store ID is required', {status: 400}) 
        }
        
      
        const products = await prismadb.task.findMany({
            where: {
                projectId: storeId,
                title,
                description,
                priorityId,
                statusId,
                dueDate
            },
            include: {
                priority: true,
                status: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products)
    }catch (error) {
        console.log('[TASKS_GET]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}
