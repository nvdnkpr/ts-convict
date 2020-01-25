import { property } from "index";
import { SubConfig } from "test/schema/SubConfig";

export default class SubNoMainParent {

    @property({
        doc: 'The name of the thing',
        default: 'Convict',
        env: 'MY_CONFIG_NAME'
    })
    public name: string;

    @property(SubConfig)
    public subConfig: SubConfig;

}
