import reflect from "./Reflector";
import { Format, ConfigOptions } from "./interfaces";
import { SchemaObj } from 'convict';

/**
 * Tell me its a config
 * @param constructor
 */
export function config<T>(opts: ConfigOptions = {}) {
    return (constructor: new () => T) => {
        reflect.setConvictMetaForClass(opts, constructor);
    };
}

/**
 * Anotate a config schema class property with this anotation.
 * @param schemaObj The convict schema object.
 */
export function property(schemaObj: SchemaObj | (new () => {})) {
    return (target: any, propertyName: string) => {

        if ((typeof schemaObj === 'object') && (typeof schemaObj.format === 'undefined')) {
            // if type is not given explicitly then try to guess it
            const tsType = reflect.getTsType(target,propertyName);
            if (tsType) {
                schemaObj.format = tsType;
            }
        }

        // const className: string = target.constructor.name;
        // console.log("And the class is: ", target.constructor.name);
        reflect.setConvictMetaForProperty(schemaObj, target, propertyName);
        reflect.setPropertyForClass(target, propertyName);
    };
}

/**
 * Decorator for a new format in convict
 * @param constructor
 */
export function format(name: string) {
    return (constructor: new () => Format) => {

    };
}
