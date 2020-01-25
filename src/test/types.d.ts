declare namespace config {
    export interface MyConfig {
        name: string;
        subConfig: SubConfig;
        db: Database;
    }
    export interface SubConfig {
        bar: number;
    }
    export interface Database {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    }
}