import { Hono } from 'hono'

const app = new Hono;


async function middleware(c:any, next:any){
  if(c.req.header("Authorization")){
    const initTime = new Date();
    await next();
    const totalTime = (new Date().getTime()-initTime.getTime())/1000;
    console.log(`it took ${totalTime} seconds`);
  }else{
    return Response.json({
      message: "u dont have access"
    })
  }
}


app.post('/',middleware, async(c)=>{
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("params"));

  return Response.json({
    message:"hi there !!!!!!!!"
  })
})

app.get('/',async(c)=>{
  return Response.json({
    name: "sahil",
    active: true
  })
})


app.post('/c',middleware, async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})


export default app
