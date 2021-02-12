import { Property, Config } from "../../../index";
import * as yaml from "js-yaml";

// not a real file to test default loading when no file exists
@Config({
    file: "src/test/scenarios/subconfig_with_main/notreal.yml",
    parser: {
        extension: ["yml", "yaml"],
        parse: yaml.load,
    },
})
export default class SubConfig {
    @Property({
        doc: "The bar",
        default: 0,
        env: "SUB_CONFIG_BAR",
    })
    public bar: number;
}
