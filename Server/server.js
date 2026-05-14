import pg from "pg";
import env from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";

env.config();
const app=express();
const port=3000;
const saltRounds=10;
app.use(express.json());
app.use(session({
	secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24  //1 day cookie storage
    }
}));
app.use(passport.initialize());

app.use(passport.session());
const db=new pg.Pool({
    user:"postgres",
    host:"localhost",
    database:process.env.DATABASE_NAME,
    password:process.env.DATABASE_PASSWORD,
    port:5432,
});

//Handle get and post requests

passport.use(new Strategy(
    async function verify(username,password,cb){
        try{
            const result=await db.query("SELECT * FROM users WHERE username=$1",[username]);
            if (result.rows.length>0){
                const user=result.rows[0];
                const stored_hash=user.password;
                bcrypt.compare(password,stored_hash,(err,res)=>{
                    if (err){
                        return cb(err);
                    }
                    if (res){
                        return cb(null,{id:user.id,username:user.username});
                    }else{
                        return cb(null,false);
                    }
                });
            }else{
                return cb(null,false);
            }
        }catch(err){
            return cb(err);
        }
    }
));

passport.serializeUser((user,cb)=>{
    cb(null,user.id);
});
passport.deserializeUser(async (id,cb)=>{
    try{
        const result=await db.query("SELECT id,username FROM users WHERE id=$1",[id]);
        cb(null,result.rows[0]);
    }catch(err){
        cb(err);
    }
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});