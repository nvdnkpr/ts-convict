import { Parser } from 'convict';

export interface ConfigOptions {

    /**
     * A directory relative to NODE_PATH or cwd()
     */
    file?: string;

    /**
     * Any convict parsers you would like to use to load the config
     */
    parser?: Parser | Parser[];
}

/**
 * Redefine format with two ways of validate
 */
export interface Format {

    /**
     * The name and key for your new format
     */
    name?: string;

    /**
     * A validate for only the value
     * @param val Any value set on the config
     * @param schema The schema for the value
     */
    validate?(val: any, schema?: any): void;

    /**
     * Not quite sure wha this does.
     * @param val
     */
    coerce?(val: any): any;
}
