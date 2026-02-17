import "dotenv/config"
// importando pool
import { Client, Pool } from "pg"
import chalk from "chalk";

export async function connectDB() {

    if (global.connection) {
        return global.connection.connect();
    }
    // configurado o Pool
    const pool = await new Pool({
        connectionString: process.env.CONNECTION_STRING
    })




    
    const client = await pool.connect();
    console.log("conexão criada");

    const res = await client.query("select now()")

    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return client
}



export async function criandotabela() {
    const client = await connectDB();
    try {
        
    
    const res = await client.query(`
    CREATE TABLE IF NOT EXISTS public.userdatas
    (
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
        username character varying(100) COLLATE pg_catalog."default" NOT NULL,
        password character varying(255) COLLATE pg_catalog."default",
        CONSTRAINT userdatas_pkey PRIMARY KEY (id)
    )

        `)
        
    console.log(chalk.cyan("tentativa de criar tabela executada com sucesso"));
    } catch (error) {
        console.error(chalk.yellow(`erro ao executar o comando de criar tabela: ${chalk.red(error)}`))
    }
    
}
