import { property } from "index";
import { Named } from "test/schema/Named";

export default class ExtendedConfig extends Named {

    @property({
        doc: 'How fluffy is this config?',
        default: 5
    })
    public fluffiness: number;

}
