import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {env} from 'hono/adapter'
import { signupMIddleware } from './middlewares/signup_validator';
import { signinMIddleware } from './middlewares/signin_validator';
import { decode, sign, verify } from 'hono/jwt'



const app = new Hono();


async function jwtsign(username:string):Promise<string>{
  const payload = {
    username:username
  }
  const secret = 'mySecretKey'
  const token = await sign(payload, secret)
  return token;
}

app.get('/signup',signupMIddleware, async (c) => {
  const b = await c.req.json();
  const { DATABASE_URL } = env<{ DATABASE_URL:string }>(c)

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.user.create({
      data:{
        name: b.name,
        username: b.username,
        password:b.password
      },
      select:{
        name: true,
        username:true
      }
    });
    const token = await jwtsign(b.username);
    return c.json({
      res: res,
      token:token
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return c.text('Internal Server Error', 500);
  }finally{
    prisma.$disconnect();
  }
});


app.post('/signin',signinMIddleware, async (c) => {
  
  const b = await c.req.json();
  const token = await jwtsign(b.username);
  const { DATABASE_URL } = env<{ DATABASE_URL:string }>(c)

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  var r = null;
  try{
      r = await prisma.user.findMany({
      where:{
        username:b.username
      },
      include:{
        todo:true
      }
    })
  }catch(err){
    return c.json({
      message:"database error"
    })
  }finally{
    prisma.$disconnect();
  }

  return c.json({
    token:token,
    data:r
  })  
});


// Export the Hono app
export default app;
