import { property } from "index";
import { Named } from "test/schema/Named";

export default class Dog extends Named {

    @property({
        doc: 'How fluffy is the pet',
        default: 5
    })
    public fluffiness: number;

}
