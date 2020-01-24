import { Property } from "../../../";

export default class Pet {

    @Property({
        doc: 'A pets name',
        default: 'Rex'
    })
    public name: string;

}
