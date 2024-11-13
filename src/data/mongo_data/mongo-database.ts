

import mongoose from "mongoose";

interface Options{
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase{
    static async connect(options: Options){
        const { mongoUrl, dbName } = options;
        try{    
            await mongoose.connect(mongoUrl, {
                dbName,
            });
            return true;

        }catch(err){
            console.error('Error connecting to MongoDB: ', err);
            throw err;
        }
    }

    static async disconnect(){
        try{
            await mongoose.disconnect();
            return true;
        }catch(err){
            console.error('Error disconnecting from MongoDB: ', err);
            throw err;
        }
    }
}