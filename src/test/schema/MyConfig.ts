import { property, config } from 'index';
import { SubConfig } from './SubConfig';
import { Database } from './Database';
import * as yaml from 'js-yaml';

@config({
    file: 'config.yml',// relative to NODE_PATH or cwd()
    parser: { 
        extension: ['yml', 'yaml'], 
        parse: yaml.safeLoad
    }
})
export class MyConfig implements config.MyConfig {
    
    // ts-convict will use the Typescript type if no format given
    @property({
        doc: 'The name of the thing',
        default: 'Convict',
        env: 'MY_CONFIG_NAME'
    })
    public name: string;

    @property(SubConfig)
    public subConfig: config.SubConfig;

    @property(Database)
    public db: config.Database;

}