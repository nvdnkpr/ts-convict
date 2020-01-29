declare namespace config {
    export interface MyConfig {
        name: string;
        db: Database;
    }
    export interface Database {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    }
}