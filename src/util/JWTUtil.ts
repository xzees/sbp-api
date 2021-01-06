import jwt from 'jsonwebtoken'
import config from 'config'

export const Encode = (id) => {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 5),
        data: id
    }, 
    config.get('secretJWT'));

    return token
}

export function Decode(token): Promise<string>  {
    return new Promise((resolve,reject)=>{
        jwt.verify(token,config.get('secretJWT'),function(err,decoded){
            if(err) resolve("")
            
            resolve(decoded.data)
        })
    })
}