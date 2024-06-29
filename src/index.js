const  express= require("express");
const path= require("path");
const app=express();
const logincollection=require("./mongo");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const tempPath=path.join(__dirname,'../templates');
app.use(express.static("public"));



app.set('view engine', 'hbs');
app.set('views',tempPath);


app.get('/',(req,res)=>{
    res.render('login');
})

app.get('/signup',(req,res)=>{
    res.render('signup');
})

app.get('/cart',(req,res)=>{
    res.render('cart');
})

app.get('/home',(req,res)=>{
    res.render('home');
})
app.get('/checkout',(req,res)=>{
    res.render('checkout');
})


app.post('/signup', async(req,res)=>{
    try{
        const{name,password}=req.body;
        const exception= await logincollection.findOne({name});
        if(exception){
            return res.send("User details exist!!");
        }

        await logincollection.create({name,password});
        res.render("home",{name});
    }
    catch(error){
        res.send("Problem in taking data!!");
    }
})

app.post('/login', async(req,res)=>{
    try{
        const{name,password}=req.body;
        const user= await logincollection.findOne({name});
        if(!user){
            res.send("User not found!!");
        }
        if(user.password!== password){
            res.send("Incorrect password;")
        }
        res.render("home",{name});
    }
    catch(error){
        res.send("Problem in taking data!!");
    }
})



app.listen(3000,()=>{
    console.log("connected!!");
})