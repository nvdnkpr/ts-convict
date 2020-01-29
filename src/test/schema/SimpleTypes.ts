import { property } from "index";

export default class SimpleTypes {

    @property({
        doc: 'A string formatted prop',
        format: String,
        default: "a string"
    })
    public stringFormat: string;

    @property({
        doc: 'A number formatted prop',
        default: 77.2,
        format: Number
    })
    public numberFormat: number;

    @property({
        doc: 'A boolean formatted prop',
        default: true,
        format: Boolean
    })
	public booleanFormat: number;
	
	//using convicts int format
	@property({
        doc: 'The amount of days till the apocalypse',
        format: "int",
        default: 1
    })
    public daysTillApocalypse: number;

    @property({
        doc: 'The host',
        default: '127.0.0.1',
        format: "ipaddress"
    })
    public host: string;

    @property({
        doc: 'some port',
        default: 8080,
        format: "port"
    })
    public port: number;

}
