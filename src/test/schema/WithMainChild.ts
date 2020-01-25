import { property, config } from "index";
import * as yaml from "js-yaml";

// not a real file to test default loading when no file exists
@config({
    file: 'src/test/config/notreal.yml',
    parser: {
        extension: ['yml', 'yaml'],
        parse: yaml.safeLoad
    }
})
export default class SubConfig {

    @property({
        doc: 'The bar',
        default: 0,
        env: 'SUB_CONFIG_BAR'
    })
    public bar: number;

}
