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

function ensureAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.status(401).json({
            authenticated:false
        });
    }

    next();
}

app.get("/api/me",(req,res)=>{
    if (req.isAuthenticated()){
        return res.json({
            authenticated:true,
            user:req.user
        });
    }else{
        return res.json({authenticated:false});
    }
});
app.get("/api/folder/:id",ensureAuth,async (req,res)=>{
    const folderId=req.params.id;
    const userId=req.user.id;
    const folder=await db.query("SELECT * FROM tasks WHERE folder_id=$1",[folderId]);   //allows to send sub tasks too in the future
    const membershipCheck=await db.query("SELECT folder_id FROM folder_members WHERE folder_id=$1 AND user_id=$2",[folderId,userId]);
    if (membershipCheck.rows.length>0){
        res.json(folder.rows);
    }else{
        return res.sendStatus(401);
    }
});
app.get("/api/folders",ensureAuth,async (req, res) => {
    const userId = req.user.id;
    const result = await db.query(
        `SELECT folders.id, folders.name
         FROM folders
         JOIN folder_members
         ON folders.id = folder_members.folder_id
         WHERE folder_members.user_id = $1`,
        [userId]
    );

    res.json(result.rows);
});

app.post("/api/addTask",ensureAuth,async (req,res)=>{
    const userId=req.user.id;
    const folderId=req.body.folderId;
    const taskTitle=req.body.taskTitle;
    const taskDescription=req.body.taskDescription;
    const taskParent=req.body.taskParent;   //Frontend will send null here if the task isn't a subtask
    const membership=await db.query("SELECT folder_id FROM folder_members WHERE folder_id=$1 AND user_id=$2",[folderId,userId]);
    if (membership.rows.length===0){
        return res.sendStatus(401);
    }
    const task=await db.query("INSERT INTO tasks (folder_id,title,description,parent_id) VALUES ($1,$2,$3,$4) RETURNING *",[folderId,taskTitle,taskDescription,taskParent]);
    return res.status(200).json(task.rows[0]);
});
app.post("/api/addFolder",ensureAuth,async (req,res)=>{
    const userId=req.user.id;
    const folderName=req.body.folderName;
    const folderId=await db.query("INSERT INTO folders (name,creator_id) VALUES ($1,$2) RETURNING id",[folderName,userId]);
    await db.query("INSERT INTO folder_members (folder_id,user_id) VALUES ($1,$2)",[folderId.rows[0].id,userId]);
    res.sendStatus(200);
});

app.delete("/api/deleteTask/:id",ensureAuth,async (req,res)=>{
    const userId=req.user.id;
    const taskId=req.params.id;
    const folder=await db.query("SELECT folder_id FROM tasks WHERE id=$1",[taskId]);
    const folderId=folder.rows[0].folder_id;
    const membership=await db.query("SELECT folder_id FROM folder_members WHERE folder_id=$1 AND user_id=$2",[folderId,userId]);
    if (membership.rows.length===0) return res.sendStatus(403);
    await db.query("DELETE FROM tasks WHERE id=$1 AND folder_id=$2",[taskId,folderId]);
    res.sendStatus(204); 
});
app.delete("/api/deleteFolder/:id",ensureAuth,async (req,res)=>{   //Only if creator of list
    const userId=req.user.id;
    const folderId=req.params.id;
    const permission=await db.query("SELECT creator_id FROM folders WHERE id=$1",[folderId]);

    if (permission.rows.length===0){
        return res.sendStatus(404);
    }
    else if (permission.rows[0].creator_id!==userId){
        return res.sendStatus(403);
    }
    else{
        await db.query("DELETE FROM folder_members WHERE folder_id=$1",[folderId]);
        await db.query("DELETE FROM folders WHERE id=$1",[folderId]); //didn't add the on delete cascade so doing it manually as this would happen on the interface anyways with cascade
        return res.sendStatus(204);
    }
});

app.patch("/api/task/:id",ensureAuth,async (req,res)=>{
    const userId=req.user.id;
    const taskId=req.params.id;
    const folderId=req.body.folderId;
    const membership=await db.query("SELECT folder_id FROM folder_members WHERE folder_id=$1 AND user_id=$2",[folderId,userId]);
    if (membership.rows.length===0) return res.sendStatus(403);
    const title=req.body.title;
    const description=req.body.description;
    const completed=req.body.completed;
    const updates = [];
    const values = [];
    if (title !== undefined) {
        updates.push(`title=$${values.length + 1}`);
        values.push(title);
    }
    if (description !== undefined) {
        updates.push(`description=$${values.length + 1}`);
        values.push(description);
    }
    if (completed!==undefined){
        updates.push(`completed=$${values.length+1}`);
        values.push(completed);
    }
    values.push(taskId);
    values.push(folderId);
    if (updates.length === 0) {
        return res.sendStatus(400);
    }
    const query = `UPDATE tasks SET ${updates.join(", ")}  WHERE id=$${values.length-1} AND folder_id=$${values.length}`;
    await db.query(query, values);
    return res.json({message:"edited successfully"});
});
app.patch("/folder/:id",ensureAuth,async (req,res)=>{
    const userId=req.user.id;
    const folderId=req.params.id;
    const name=req.body.name;
    const permission=await db.query("SELECT creator_id FROM folders WHERE id=$1",[folderId]);
    if (permission.rows.length===0) return res.sendStatus(404);
    else if (permission.rows[0].creator_id!==userId) return res.sendStatus(403);
    await db.query("UPDATE folders SET name=$1 WHERE id=$2 AND creator_id=$3",[name,folderId,userId]);
    res.sendStatus(200);
});


//Auth handling

app.post("/register",async (req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const exists=await db.query("SELECT * FROM users WHERE username=$1 OR email=$2",[username,email]);
    if (exists.rows.length>0){
        return res.json({message:"Username or email already in use."});
    }
    bcrypt.hash(password,saltRounds,async (err,hash)=>{
        if (err){
            console.log(err);
        }
        const result=await db.query("INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *",[username,email,hash]);
        const user=result.rows[0];
        const folderId=await db.query("INSERT INTO folders (name,creator_id) VALUES ('Today',$1) RETURNING id",[user.id]);
        await db.query("INSERT INTO folder_members (folder_id,user_id) VALUES ($1,$2)",[folderId.rows[0].id,user.id]);
        req.login(user,(err)=>{
            if (err){
                console.log(err);
            }else{
                res.json({id:user.id,username:user.username,email:user.email,authenticated:true});
            }
        });
    });
})
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                authenticated: false,
                message: "Invalid username or password"
            });
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.json({
                authenticated: true,
            });
        });
    })(req, res, next);
});
app.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.clearCookie("connect.sid");

            return res.json({
                authenticated: false,
                message: "Logged out successfully"
            });
        });
    });
});

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