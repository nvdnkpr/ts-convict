import { Parser, ValidationMethod, Format } from 'convict';

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
    validationMethod?: ValidationMethod;

    /**
     * Exposes ability to add formats to convict
     */
    formats?: {
        [name: string]: Format
    };
}
