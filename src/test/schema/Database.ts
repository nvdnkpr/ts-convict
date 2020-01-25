import { property } from "index";

export class Database implements config.Database {
    @property({
        doc: "The database host",
        default: "localhost",
        format: "url",
        env: "DATABASE_HOST"
    })
    public host: string;

    @property({
        doc: "The database port",
        default: 5432,
        format: "port",
        env: "DATABASE_PORT"
    })
    public port: number;

    @property({
        doc: "The database db",
        default: "my_db",
        env: "DATABASE_DB"
    })
    public database: string;

    @property({
        doc: "The database user",
        default: "magik",
        env: "DATABASE_USER"
    })
    public user: string;

    @property({
        doc: "The database pass",
        default: "secretpassword",
        sensitive: true,
        env: "DATABASE_PASS"
    })
    public password: string;
}