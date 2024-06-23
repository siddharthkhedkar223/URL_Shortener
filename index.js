const  express=require('express');
const {connecttoMongoDB}=require('./connect')
const app= express();
const port=8001;
connecttoMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("mongoDB connected!!"));
app.use(express.json());
const urlRoute= require('./routes/url');
const URL = require('./models/url')
app.use("/url",urlRoute);

app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
   const entry= await URL.findOneAndUpdate(
        {
           shortId, 
        },
        {
            $push:{
                visitHistory :{
                    timestamp:Date.now()
                }
            }
        }

    );
    res.redirect(entry.redirectUrl);
})
 app.listen(port,()=>console.log(`server started at port ${port}`));