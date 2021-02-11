import { Parser, ValidationMethod } from 'convict';

export interface ConfigOptions {

    /**
     * A directory relative to NODE_PATH or cwd()
     */
    file?: string;

    /**
     * Any convict parsers you would like to use to load the config
     */
    parser?: Parser | Parser[];

    /**
     * The validation level used against your schema: strict | warn
     */
    validationLevel?: ValidationMethod;
}
