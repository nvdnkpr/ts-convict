import { property } from "../../../";

export default class Pet {

    @property({
        doc: 'A pets name',
        default: 'Rex'
    })
    public name: string;

}
