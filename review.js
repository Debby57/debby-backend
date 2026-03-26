const express = require(`express`)
const mongoose = require(`mongoose`)
const app = express()
const PORT = 3000
const errorMSG = {}
const status = {}

app.use(express.urlencoded({extended:true}))

app.get("/api/server/status", (req,res) =>{
    status.msg = "Server is up and ready";
    res.json(status)
})

app.post("/api/submit-cat", async(req,res) => {
    main(res.req.body.catName)
})


app.listen(PORT,()=> {
    console.log("API is listening on Port: ", PORT)
    //main()
})


async function main(kittyName){
    await mongoose.connect(mongodb+srv://abelajaladeborah_db_user:UmiAZhQwl5cjsdhz@cluster0.ikphzpy.mongodb.net/?appName=Cluster0)
        const kiitySchemes = new mongoose.Schema({name:string})

        const kitten = new mongoose.model('cat', kiitySchema)

        const kitty1 = new kitten({name: kitName})

        console.log(`We are sending a ${kitty1.name} kitty to the cloud`)

        kitty1.save()
}