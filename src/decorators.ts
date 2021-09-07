/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SchemaObj } from "convict";
import reflect from "./Reflector";
import { ConfigOptions } from "./interfaces";
import { isObject } from "lodash";

/**
 * Tell me its a config
 * @param constructor
 */
export function Config<T>(opts: ConfigOptions = {}) {
    return (constructor: new () => T) => {
        reflect.setConvictMetaForClass(opts, constructor);
    };
}

/**
 * Anotate a config schema class property with this anotation.
 * @param schemaObj The convict schema object.
 */
export function Property(
    schemaObj: SchemaObj | { [key: string]: SchemaObj } | (new () => {}),
    keyPrefix = ""
) {
    if (
        keyPrefix.length > 0 && // keyPrefix is set
        !isObject(schemaObj) // but schema object is not a object
    ) {
        throw new Error(
            `You can'ft use a key prefix when you don't use a schema object hash too.`
        );
    }
    return (target: any, propertyName: string) => {
        if (
            typeof schemaObj === "object" &&
            typeof schemaObj.format === "undefined"
        ) {
            // if type is not given explicitly then try to guess it
            const tsType = reflect.getTsType(target, propertyName);
            if (tsType) {
                schemaObj.format = tsType;
            }
        }

        // const className: string = target.constructor.name;
        // console.log("And the class is: ", target.constructor.name);
        reflect.setConvictMetaForProperty(
            schemaObj,
            target,
            keyPrefix ? `${keyPrefix}.${propertyName}` : `${propertyName}`
        );
        reflect.setPropertyForClass(
            target,
            keyPrefix ? `${keyPrefix}.${propertyName}` : `${propertyName}`
        );
    };
}
