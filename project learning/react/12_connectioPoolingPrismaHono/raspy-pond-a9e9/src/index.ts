// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate';


// export interface Env{
// 	DATABASE_URL: string
// }

// export default {
// 	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
// 		const prisma = new PrismaClient({
// 			datasourceUrl: env.DATABASE_URL,
// 		}).$extends(withAccelerate())
// 		const res = prisma.user.create({
// 			data:{
// 				email:"gg@gmail.com",
// 				name:"ggyaaay"
// 			}
// 		})

// 		console.log(res);
// 		return Response.json(res)
// 	},
// } 


import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface Env {
    DATABASE_URL: string;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const prisma = new PrismaClient({
            datasourceUrl: env.DATABASE_URL,
        }).$extends(withAccelerate());

        try {
            const res = await prisma.user.create({
                data: {
                    email: "gg123@gmail.com",
                    name: "ggyaaay",
                },
            });

            console.log(res);
            return Response.json({
				res
			})
        } catch (error) {
            console.error(error);
            return new Response('Internal Server Error', { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    },
};
