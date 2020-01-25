import { property, config } from "index";
import WithMainChild from './WithMainChild';
import * as yaml from 'js-yaml';

@config({
    file: 'src/test/config/foo.yml',
    parser: {
        extension: ['yml', 'yaml'],
        parse: yaml.safeLoad
    }
})
export default class WithMainParent {

    @property({
        doc: 'The name of the thing',
        default: 'Convict',
        env: 'MY_CONFIG_NAME'
    })
    public name: string;

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

    @property(WithMainChild)
    public subConfig: WithMainChild;

    public extraSauce: string = "yes please";

}
