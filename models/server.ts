import express , {Application} from 'express';
import userRoutes from '../routes/route_usuario';
import cors from 'cors';
import db from '../database/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '7000';

        //Metodos
        this.dbConecction();
        this.middlewares();
        this.routes();
    }

    //CONEXION BDD MYSQL
    async dbConecction(){
        try {
            
            await db.authenticate();
            console.log("Database online");

        } catch (error) {
            throw new Error( error );   
        }
    }


    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use( express.json() )

        //carpeta publica
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port );
            
        })
    }
}

export default Server;