import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET (
    req: Request, 
    { params }: { params: { taskId: string } }
) {
    try {
        const { taskId } = await params;
        if (!params.taskId) {
            return new NextResponse('Task ID is required', {status: 400})
        }

        const product = await prismadb.task.findUnique({
            where: {
                id: taskId
            },
            include: {
                priority: true,
                status: true
            }
        })

        return NextResponse.json(product)
    }catch (error) {
        console.log('[TASK_GET]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}


export async function PATCH (
    req: Request, 
    { params }: { params: { storeId: string, taskId: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { taskId, storeId } = await params;

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

        const task = await prismadb.task.update({ 
            where: { 
                id: taskId
            }, data: { 
                title,
                description,
                priorityId,
                statusId,
                dueDate
            } });     
            

        // const product = await prismadb.task.update({
        //     where: {
        //         id: taskId
        //     },
        //     data: {
        //         images: {
        //             createMany: {   
        //                 data: [
        //                 ...images.map((image: { url: string }) => image),
        //             ]
        //             }
        //         }
        //     }
        // })

        return NextResponse.json(task)
    }catch (error) {
        console.log('[TASK_PATCH]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}


export async function DELETE (
    req: Request, 
    { params }: { params: { storeId: string, taskId: string } }
) {
    try {
        const { userId } = await auth();
         const { taskId, storeId } = await params;

        if (!userId) {
            return new NextResponse('You are not authenticated', {status: 401})
        }

        if (!storeId) {
            return new NextResponse('Missing storeId', {status: 400})
        }

        if (!taskId) {
            return new NextResponse('Product ID is required', {status: 400})
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
        const task = await prismadb.task.deleteMany({
            where: {
                id: taskId
            },
        })

        return NextResponse.json(task)
    }catch (error) {
        console.log('[TASK_DELETE]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}