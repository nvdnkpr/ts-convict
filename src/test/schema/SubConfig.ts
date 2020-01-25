import { property } from "index";

export class SubConfig implements config.SubConfig {
    @property({
        doc: 'A sub prop',
        default: 0,
        env: 'SUB_CONFIG_BAR',
        format: 'int'
    })
    public bar: number;

    public message: string = "I am an unmanaged config property";
}
