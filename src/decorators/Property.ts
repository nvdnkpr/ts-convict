import { getMetaSchemaStorage } from '../';
import { SchemaObj } from 'convict';
import reflect from "../util/Reflector";

/**
 * Anotate a config schema class property with this anotation.
 * @param schemaObj The convict schema object.
 */
export function Property(schemaObj: SchemaObj | (new () => {})) {
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
        getMetaSchemaStorage().addSchemaProp(target.constructor,propertyName,schemaObj);
    };
}
