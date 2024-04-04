const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const bodyparser = require('body-parser')


const dbo = require('./db')
const Object = dbo.ObjectID
const { Db } = require('mongodb')

app.engine('hbs',exhbs.engine({layoutsDir:"views/",defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs');
app.set('views','views')
app.use(bodyparser.urlencoded({extended:true}))


app.get('/', async(req,res)=>{
    let database = await dbo.getdabase();
    const collection = database.collection('brand');
    const cursor = collection.find({})
    let brand = await cursor.toArray()





    let message = ''
    let edit_id,edit_brand;


    if(req.query.edit_id){
        edit_id = req.query.edit_id;
        edit_brand = await collection.findOne({_id:new Object(edit_id)})
    }
    if(req.query.delete_id){
       await collection.deleteOne({_id: new Object(req.query.delete_id)})
       return res.redirect('/?status=3')
    }

    
    switch (req.query.status) {
        case '1':
             message =' inserted sucessfully'
            break;

          case '2':
                message =' updated sucessfully'
               break;

         case '3':
                message =' deleted sucessfully'
               break;
      h
        default:
            break;
    }
    res.render('main',{message,brand,edit_id,edit_brand})
})
app.post('/store_Cars',async (req, res)=>{
    let database =  await dbo.getdabase();
    const collection = database.collection('brand')
    let baby = {tittle:req.body.tittle,year:req.body.year}
     await collection.insertOne(baby);
    return res.redirect('/?status=1')


})
app.post('/update_Cars/:edit_id',async (req, res)=>{
    let database =  await dbo.getdabase();
    const collection = database.collection('brand')
    let baby = {tittle:req.body.tittle,year:req.body.year}
     let edit_id = req.params.edit_id

     await collection.updateOne({_id:new Object(edit_id)},{$set:baby});
    return res.redirect('/?status=2')
})
app.listen(5000,()=>{console.log('listening to 5000 port');})