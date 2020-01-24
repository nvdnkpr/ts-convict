import { property } from "../../../";

export default class ConfigWithFormat {

    @property({
        doc: 'The name of the thing',
        default: 'Convict',
        env: 'MY_CONFIG_NAME'
    })
    public name: string;

}
