const express = require('express');
const redis = require('redis')
const axios = require('axios')
const cors = require('cors')
const app = express();

//creating redis client 
const redisClient = redis.createClient();   //methna parameters denna one redisu run wenne wenama environment ekaka nm , methandi localhost run wena hinda awlk nathi hnda mehm dunne , eth error ekak awoth methna poddk blnna one 

async function startServer(){
    try{
        await redisClient.connect();
        console.log("Redis connected");
    }catch(error){
        console.error("Redis connection failed")
    }
}

startServer();

const port = 3000;

const DEFAULT_EXPIRATION = 3600;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());


app.get('/' , (req,res) => {
    res.send('Hello from Node js application')
})

app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId;
    const redisKey = `photos?albumID=${albumId}`;

    //checking weather we have ste the data in the redius to avoid setting redis everytime the function is called
    //this is the new one with redis + node js v4
    try {
        const cachedPhotos = await redisClient.get(redisKey);

        if(cachedPhotos !== null){
            console.log("cache hit");
            return res.status(200).json(JSON.parse(cachedPhotos));
        }

        console.log(`Cache miss`);

        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/photos", 
            {
                params: { albumId }
            }
        );

        await redisClient.setEx(redisKey, DEFAULT_EXPIRATION, JSON.stringify(data));

        res.status(200).json(data);
    }catch(error){
        console.Error("Error occured:" , error)
        res.status(500).json({error: "Internal server error"})
    }


    //this is the old way to do it (v3)
    // redisClient.get(`photos?albumId=${albumId}`, async (error, photos) => {

    //     if(error) console.log(`An error occured: the error is : ${error}`);
        
    //     if(photos != null){
    //         console.log("cache hit");
    //         return res.json(JSON.parse(photos));

    //     }
        
    //     else {
    //         console.log("cache miss");
    //         const { data } = await axios.get(
    //             "https://jsonplaceholder.typicode.com/photos",
    //             {
    //                 params: { albumId }
    //             }
    //         )

    //         redisClient.setEx(`photos?albumId=${albumId}`, DEFAULT_EXPIRATION, JSON.stringify(data));
    //     }

    //     res.status(200).json(data);
    // })
    
})


app.listen(port, () => {
    console.log("Server is running on prot 3000");
})