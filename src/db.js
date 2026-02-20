import "dotenv/config";
// importando pool
import { Pool } from "pg";
import chalk from "chalk";
// importando ferramenta de hash
import bcrypt from "bcrypt";


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

export async function register(usuario,senha) {
    try {
    console.log(chalk.magenta("verificando se o usuario digitado já existe no banco"));
    
    // verificando se o usuario digitado já existe no banco
    const userexists =  await query(`SELECT username FROM userdatas WHERE username = $1`, [usuario]);
        console.log(userexists);
        
    
    // se não encontrar o usuario faz o if de baixo (adicionar)
    if (userexists.rowCount == 0 ) {
        console.log(chalk.magenta("adicionando usuarionobanco"));
        // fazendo o hash
        const saltRounds  = 10;
        const senhahash = await bcrypt.hash(senha,saltRounds);
        
        // verificando se o usuario existe no SLQ
        await query(`INSERT INTO userdatas (username, password)
            VALUES ($1,$2)`,[usuario,senhahash]);   

        return {status: 201, data:{
            success : true,
            message : "Usuario cadastrado com sucesso" 
        }}     
    }
    // se encontrar o usuario faz o if de baixo (dar erro)
    if (userexists.rowCount == 1 ) {
        console.log(chalk.magenta("usuario já existe no banco, não permitido registrar"));
        return {status: 409, data:{
            success: false,
            message: "O Username já está sendo ultilizado por outro usuario. Escolha outro Username"
        }}
    }
    
    }
    catch (err) {
        console.log((chalk.redBright(err)));
        return{status: 500, data:{
            success: false,
            message: "Houve um Erro inesperado"
        }}
    }
}