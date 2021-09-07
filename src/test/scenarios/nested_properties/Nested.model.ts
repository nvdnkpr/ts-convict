import { Property } from "../../../";

export default class Nested {
    @Property({
        doc: "The name of the thing",
        default: "Convict",
    })
    public name: string;

    @Property({
        doc: "The amount of days till the apocalypse",
        format: "int",
        default: 1,
    })
    public daysTillApocalypse: number;

    @Property(
        {
            host: {
                doc: "The host",
                default: "127.0.0.1",
            },
            port: {
                doc: "some port",
                default: 8080,
                format: "port",
            },
        },
        "server"
    )
    public server: {
        host: string;
        port: number;
    };
}
