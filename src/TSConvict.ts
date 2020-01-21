import reflect from "./util/Reflector";
import convict, { Schema } from 'convict';

export class TSConvict<T> {

    private baseModel: T;
    private schema: Schema<T>;
    private client: convict.Config<T>;

    constructor(ConfigClass: any) {
        this.baseModel = new ConfigClass();
        this.schema = this.getSchemaFor<T>(this.baseModel);
        this.client = convict<T>(this.schema);
    }

    public load(config: string | any) {
        // either load the file or the data for the config
        if (typeof config === 'string') {
            this.client.loadFile(config);
        } else {
            this.client.load(config);
        }
        // validate all the data is just right
        this.client.validate( { allowed: 'strict' } );
        const rawConfig = this.client.getProperties();
        return this.applyDataToModel(this.baseModel, rawConfig);
    }

    private getSchemaFor<T>(target: T): Schema<T> {
        const schema = {};
        for (const key of reflect.getClassProperties(target)) {
            const meta = reflect.getConvictMetaForProperty(target, key);
            if (reflect.isConstructor(meta)) {
                try {
                    target[key] = new meta();
                    schema[key] = this.getSchemaFor(target[key]);
                } catch (error) {
                    console.error(error);
                    throw new Error("Could not make a new class of " + meta);
                }
            } else {
                schema[key] = meta;
            }
        }
        return schema as Schema<T>;
    }

    private applyDataToModel<T>(target: T, config: any) {
        for (const key of reflect.getClassProperties(target)) {
            const meta = reflect.getConvictMetaForProperty(target, key);
            if (reflect.isConstructor(meta)) {
                this.applyDataToModel(target[key], config[key]);
            } else {
                if (key in config) {
                    target[key] = config[key];
                }
            }
        }
        return target;
    }
}
