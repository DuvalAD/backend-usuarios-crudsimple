import {Request, Response} from 'express';
import Usuario from '../models/usuario';



export const getUsuarios = async (req: Request, res: Response) =>{
    const usuarios = await Usuario.findAll();
    res.json (usuarios);
}

export const getUsuario = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const usuarios = await Usuario.findByPk(id);
    
    if( usuarios ){
        res.json (usuarios)

    }else{
        res.status(404).json({
            mgs: `No existe un usuario con id ${id}`
        })
    }
}

export const postUsuario = async (req: Request, res: Response) =>{
    const {body} = req;

    try {

        const existeEmail = await Usuario.findOne({
            where:{
                email : body.email
            }
        });

        if(existeEmail){
            return res.status(400).json({
                msg: "Ya existe un usuario con el email "+ body.email
            });
        }

        const usuario = new Usuario(body);
        await usuario.save();

        res.json(usuario);
        
    } catch (error) {

        console.log(error);
        res.status (500).json({
            msg: "Hable con el administrador",
        });

    }

    
}

export const putUsuario = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const {body} = req;

    try {

        const usuario = await Usuario.findByPk(id);
        const existeEmail = await Usuario.findOne({
            where:{
                email : body.email
            }
        });

        if( !usuario){
            return res.status(404).json({ msg: "No existe un usuario con el id "+ id})
        }

        if(existeEmail){
            return res.status(400).json({
                msg: "No puede agregar un correo ya utilizado"
            })
        }

        await usuario.update( body );

        res.json(usuario);
        
    } catch (error) {

        console.log(error);
        res.status (500).json({
            msg: "Hable con el administrador",
        });

    }
}

export const deleteUsuario = async (req: Request, res: Response) =>{
    const {id} = req.params;

    try {

        const usuario = await Usuario.findByPk(id);
        if( !usuario){
            return res.status(404).json({ msg: "No existe un usuario con el id "+ id})
        }

        // await usuario.destroy();  //eliminacion fisica
        await usuario.update({estado : false }); //eliminacion logica

        res.json({msg: `Usuario eliminado correctamente`});
        
    } catch (error) {

        console.log(error);
        res.status (500).json({
            msg: "Hable con el administrador",
        });

    }
   
}