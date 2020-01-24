import { property } from "../../../";
import Pet from "./Pet.model";

export default class Dog extends Pet {

    @property({
        doc: 'How fluffy is the pet',
        default: 5
    })
    public fluffiness: number;

}
