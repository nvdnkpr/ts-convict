import { property } from "index";

/**
 * This one is simple and flat
 */
export class Named {

    @property({
        doc: 'The name of the thing',
        default: 'Convict'
    })
    public name: string;

}
