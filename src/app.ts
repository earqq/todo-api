import { envs } from "./config/envs";
import { MongoDatabase } from "./data/mongo_data";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";



(async() => {
    mainModule();
})();

async function mainModule(){
    console.log('Starting server...');
    await MongoDatabase.connect({
        mongoUrl: envs.DB_URL,
        dbName: envs.DB_NAME,
    });
    console.log('Connected to MongoDB');
    const server = new Server({
        port : envs.PORT,
        router: AppRoutes.routes    
    });
    await server.start();
}