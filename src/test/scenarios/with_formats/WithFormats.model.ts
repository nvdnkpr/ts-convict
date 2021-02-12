import { Property, Config } from "../../../index";
import * as yaml from "js-yaml";
import { url, ipaddress } from "convict-format-with-validator";

@Config({
    parser: {
        extension: ["yml", "yaml"],
        parse: yaml.load,
    },
    formats: {
        url,
        ipaddress,
    },
})
export default class WithFormats {
    @Property({
        doc: "The host",
        default: "127.0.0.1",
        format: "ipaddress",
    })
    public host: string;

    @Property({
        doc: "some port",
        default: 8080,
        format: "port",
    })
    public port: number;
}
