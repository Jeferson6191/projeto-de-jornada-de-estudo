import "dotenv/config"
// importando pool
import { Client, Pool } from "pg"
import chalk from "chalk";


const pool = new Pool({
    connectionString : process.env.CONNECTION_STRING
})

export async function query(text, params) {
    return pool.query(text, params);
}


export async function criandotabela() {

    try {
        
    
    const res = await query(`

    CREATE TABLE IF NOT EXISTS public.userdatas
    (
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
        username character varying(100) COLLATE pg_catalog."default" NOT NULL,
        password character varying(255) COLLATE pg_catalog."default",
        CONSTRAINT userdatas_pkey PRIMARY KEY (id),
        CONSTRAINT userdatas_username UNIQUE (username),
        CONSTRAINT userdatas_username_unique UNIQUE (username),
        CONSTRAINT username UNIQUE (username)
    )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.userdatas
        OWNER to postgres;

        `)
        
    console.log(chalk.cyan("tentativa de criar tabela executada com sucesso"));
    } catch (error) {
        console.error(chalk.yellow(`erro ao executar o comando de criar tabela: ${chalk.red(error)}`))
    }
    
}

export async function pegarusuario(usuario,senha) {

    // verificando se o usuario existe no SLQ
    try {
    const res = await query(`
        SELECT username,password 
        FROM userdatas
        WHERE username = $1 and password = $2;`, [usuario,senha])


        if (res.rowCount === 1) {
            // usuario ja encontrado
            console.log(chalk.magenta("usuario ja cadastrado"));
            console.log(res.rows);
            return {status: "Exists"}
            
        }else{
            // cadastrando usuario
            try {
                console.log("nao encontrada");
                const res = await query(`INSERT INTO userdatas ("username","password") values ($1,$2)`,[usuario,senha])
                console.log(res);
                console.log("usuario nao indentificado no banco de dados, inserido...");    
                return {status: "Inserted"}            
            }                
            catch {
                console.log("usuario nao indentificado no banco de dados, mas um erro ocorreu (provavelmente nome ja existente)");
                return {status: "InvalidName"}  
            }
        }
    }
    catch(erro){
        console.log(erro);
        return {status: "Error"}
    }
    
    
}