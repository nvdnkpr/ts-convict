import { getMetaSchemaStorage } from '../';
import reflect from "../util/Reflector";
import { ConfigOptions } from "../interfaces";

/**
 * Tell me its a config
 * @param constructor
 */
export function Config<T>(opts: ConfigOptions = {}) {
    return (constructor: new () => T) => {
        reflect.setConvictMetaForClass(opts, constructor);
        getMetaSchemaStorage().setClass(constructor, true, opts);
    };
}
