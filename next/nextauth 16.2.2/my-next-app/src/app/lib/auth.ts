import  CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
export const NEXT_AUTH = {
    providers:[
        
        CredentialsProvider({
            name:"Email",
            credentials:{
                username:{
                    label:"Username",
                    type:'text',
                    placeholder:"email"
                },
                password:{
                    label:"Password",
                    type:'password',
                    placeholder:"password"
                }
            },
            async authorize(credentials:any) {
                console.log(credentials);
                return {
                    id: '1', 
                    name: credentials.username,
                    email: credentials.username
                };
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET ||"",
            authorization: {
                params: {
                  scope: "read:user user:email"
                }
              }
          }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks: {
        signIn: ({user}:any) =>{
            if(user.email == '4'){
                return false;
            }
            return true;
        },
        jwt:({token, user}:any)=>{
            token.id = token.sub;
            console.log(token);
            return token;
        },
        session:({session,token,user}:any)=>{
            if(session && session.user ){
                session.user.id = token.id;
            }
            return session;
        }
    }
}