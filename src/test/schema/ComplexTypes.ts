import { property } from "index";
import { Named } from "test/schema/Named";

export default class ComplexTypes {

    // using another config class as a property
    @property(Named)
    public subConfig: Named;

    // using a custom format as a property
    public customFormatProp: any;

}
