import reflect from "./Reflector";
import convict, { Schema } from 'convict';
import fs from "fs";
import path from "path";

/**
 * A reflective wrapper for Mozilla Convict.
 * Processes all of the decorators applied to
 * some model class.
 *
 * @author Kelly Ferrone
 */
export class TSConvict<T> {

    /**
     * The base model class which is `newed` when passed to
     * constructor. This represents the base model of the config.
     */
    private baseModel: T;

    /**
     * The full convict schema for the base model.
     */
    private schema: Schema<T>;

    /**
     * The instantiated convict client
     * loaded up with the schema.
     */
    private client: convict.Config<T>;

    /**
     * The file to use when no config or other file is set.
     * This is only here if set on a class decorated with config
     * and the file proerty is set. Otherwise a file or object
     * needs to be passed into the load.
     */
    private baseFile: string;

    /**
     * Gets the TSConvict ready with a model and schema.
     * @param ConfigClass The class which will be created as the base class.
     */
    constructor(ConfigClass: new(...args: any[]) => T) {
        // make sure the class is actually decorated with TSConvict decorators
        if (!reflect.isConfigClass) {
            throw new Error("A class must be decorated with Config or at least one Property");
        }

        // handle the parser and default file
        const opts = reflect.getConvictMetaForClass(ConfigClass);
        this.baseFile = null;
        if (opts !== null) {
            if (typeof opts.parser !== 'undefined') {
                convict.addParser(opts.parser);
            }
            // TODO: Fix this area so tests pass
            this.baseFile = opts.file || null;
            if (!fs.existsSync(path.resolve(this.baseFile))) {
                this.baseFile = null;
            }
        }

        // load up convict, schema, and model
        this.baseModel = new ConfigClass();
        this.schema = this.getSchemaFor<T>(this.baseModel);
        this.client = convict<T>(this.schema);
    }

    /**
     * Loads the actual config and applies it to the
     * convict model chosen when the class was made.
     * @param config Either a string to a file or a an object with data.
     * @param options An optional parameter that allows additional configurable params
     * @throws Error when the given config can't be loaded
     * @returns The config model class with all the data applied.
     */
    public load(config: string | string[] | any | null = null, options?: { level?: string }): T {

        // if just a string or array then its file paths, hopefully
        if (typeof config === 'string' || Array.isArray(config)) {

            // make a files array
            let files: string[];
            if (Array.isArray(config)) {
                files = config;
            } else {
                files = [config];
            }
            // if there is a basefile then the param overrides the base
            if (this.baseFile !== null) {
                files.unshift(this.baseFile);
            }
            this.client.loadFile(files);
        }
        // if config is null then use basefile if it exists
        // if not then just an object
        else if (config === null) {
            if (this.baseFile !== null) {
                this.client.loadFile(this.baseFile);
            } else {
                this.client.load({});
            }
        }
        // if config is a simple object then load er up
        else if (typeof config === 'object') {
            if (this.baseFile !== null) {
                this.client.loadFile(this.baseFile);
            }
            this.client.load(config);
        }
        // if the params ain't right then throw an error
        else {
            throw new Error(`Could not load the config given: ${config}`);
        }

        const level = options.level === 'warn' ? options.level : 'strict';

        // validate all the data is just right
        this.client.validate( { allowed: level } );


        const rawConfig = this.client.getProperties();
        return this.applyDataToModel(this.baseModel, rawConfig);
    }

    /**
     * Recursively finds the schema for the particular target.
     * @param target Any class which was annotated with Config or Property
     * @returns A convict schema for the target.
     */
    private getSchemaFor<T>(target: T): Schema<T> {
        const schema = {};
        for (const key of reflect.getClassProperties(target)) {
            const meta = reflect.getConvictMetaForProperty(target, key);
            // handle any time a config class constructor is given instead of schema
            if (reflect.isConstructor(meta) && reflect.isConfigClass(meta)) {
                try {
                    target[key] = new meta();
                    schema[key] = this.getSchemaFor(target[key]);
                } catch (error) {
                    console.error(error);
                    throw new Error("Could not make a new class of " + meta);
                }
            }
            // handle any simple convict schema
            else {
                schema[key] = meta;
            }
        }
        return schema as Schema<T>;
    }

    /**
     * Recursivley applies the data from a config file to
     * the target class.
     * @param target A config model which is the same schema as the config.
     * @param config A config data object with the same schema as the target.
     * @returns The serialized model with data applied from config.
     */
    private applyDataToModel<T>(target: T, config: any): T {
        for (const key of reflect.getClassProperties(target)) {
            const meta = reflect.getConvictMetaForProperty(target, key);
            if (reflect.isConstructor(meta) && reflect.isConfigClass(meta)) {
                this.applyDataToModel(target[key], config[key] || {});
            } else {
                if (key in config) {
                    target[key] = config[key];
                }
            }
        }
        return target;
    }
}
