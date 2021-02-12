import { Property } from "../../../";
import Pet from "./Pet.model";

export default class Dog extends Pet {
    @Property({
        doc: "How fluffy is the pet",
        default: 5,
    })
    public fluffiness: number;
}
