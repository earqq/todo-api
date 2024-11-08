
import express, { Router } from 'express';

interface Options{
    port: number;
    router: Router;
}

export class Server{

    public readonly app= express();
    private readonly port: number;
    private readonly routes: Router;
    private serverListener?: any;
    constructor(options: Options){
        const { port, router } = options;
        this.port = port;
        this.routes = router;
    }

    async start(){
        this.app.use( express.json() ); 
        this.app.use( express.urlencoded({ extended: true }) ); 
        
        this.app.use(this.routes);
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

    public close(){
        this.serverListener?.close();
    }

}