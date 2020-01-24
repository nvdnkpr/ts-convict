import { property } from "../../../";

export default class SubConfig {

    @property({
        doc: 'The bar',
        default: 0,
        env: 'SUB_CONFIG_BAR'
    })
    public bar: number;

}
