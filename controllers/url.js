const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
  const shortID=shortid(8);
  const body = req.body;

  if(!body.url){
    return res.status(400).json({error :'url is required'});
  }
  await URL.create({
    shortId :shortID,
    redirectUrl :body.url,
    visitHistory:[]
});
return res.json({ id:shortID});
}


async function handleGetAnalytics(req,res)
{

   const shortId=req.params.shortId;
   const result= await URL.findOne({shortId});
   return res.json({
    totalclicks:result.visitHistory.length,
    analytics: result.visitHistory
   });

}
module.exports ={handleGenerateNewShortURL,handleGetAnalytics,};