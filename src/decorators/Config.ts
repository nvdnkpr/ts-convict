import reflect from "../Reflector";
import { ConfigOptions } from "../interfaces";

/**
 * Tell me its a config
 * @param constructor
 */
export function Config<T>(opts: ConfigOptions = {}) {
    return (constructor: new () => T) => {
        reflect.setConvictMetaForClass(opts, constructor);
    };
}
