import { Property, Config } from "../../../index";
import WithMainChild from './WithMainChild.model';
import * as yaml from 'js-yaml';

@Config({
    file: 'src/test/scenarios/subconfig_with_main/foo.yml',
    parser: {
        extension: ['yml', 'yaml'],
        parse: yaml.load
    }
})
export default class WithMainParent {

    @Property({
        doc: 'The name of the thing',
        default: 'Convict',
        env: 'MY_CONFIG_NAME'
    })
    public name: string;

    @Property({
        doc: 'The host',
        default: '127.0.0.1',
        format: "ipaddress"
    })
    public host: string;

    @Property({
        doc: 'some port',
        default: 8080,
        format: "port"
    })
    public port: number;

    @Property(WithMainChild)
    public subConfig: WithMainChild;

    public extraSauce: string = "yes please";

}
