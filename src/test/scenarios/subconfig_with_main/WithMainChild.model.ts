import {Property, Config} from "../../../index";

export default class SubConfig {

    @Property({
        doc: 'The bar',
        default: 0,
        env: 'SUB_CONFIG_BAR'
    })
    public bar: number;

}
