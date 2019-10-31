
export interface IDatabaseConfigAttributes {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string; 
    logging?: boolean;
    operatorsAliases?: boolean;
}

export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    production: IDatabaseConfigAttributes;
    test: IDatabaseConfigAttributes;
}