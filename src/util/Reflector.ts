import { ConfigOptions } from '../interfaces';

/**
 * A simple wrapper for reflect. This adds the specific methods
 * needed just for the TSConvict package. This also makes sure the
 * global Reflect obejct does exists. Basically a useful tool for
 * running all the needed reflections.
 *
 * @author Kelly Ferrone
 */
class Reflector {

    /**
     * A reference to the global Reflect
     */
    private _reflect: typeof Reflect;

    /**
     * Verifies the global Reflect does exist and sets it as a property.
     */
    constructor() {
        const reflectInstalled = Reflect && (Reflect as any).getMetadata ? true : false;
        if (!reflectInstalled) {
            throw new Error("reflect-metadata should be installed properly");
        }
        this._reflect = Reflect;
    }

    /**
     * Checks if an object is a constructor which can be newed
     * @param obj Anything which might be a constructor.
     */
    public isConstructor(target: any) {
        return !!target.prototype && !!target.prototype.constructor.name && (target instanceof Function);
    }

    /**
     * Checks if the target is a tsconvict managed class.
     * @param target
     */
    public isConfigClass(target: any) {
        const hasProps = this._reflect.hasMetadata("tsconvict:properties", target);
        const hasSchema = this._reflect.hasMetadata("tsconvict:schema", target);
        return (hasProps || hasSchema);
    }

    /**
     * Gets the type set by Typescript.
     * @param target The instance of a class to check.
     * @param propertyName The name of the proeprty on the instance to check.
     */
    public getTsType(target: any, propertyName: string): any {
        return this._reflect.getMetadata("design:type", target, propertyName);
    }

    /**
     * Retrieves the Convict schema object set on a property by the `Property` decorator.
     * @param target The instance of a config class to check.
     * @param propertyName The name of the property on the instance to check.
     */
    public getConvictMetaForProperty(target: any, propertyName: string) {
        return this._reflect.getMetadata("tsconvict:property", target, propertyName);
    }

    /**
     * Sets the convict schema as metadata.
     * @param schemaObj A convict schema or config class.
     * @param target The instance of a config class to set data on.
     * @param propertyName The name of the property on the instance to check.
     */
    public setConvictMetaForProperty(schemaObj: any, target: any, propertyName: string) {
        return this._reflect.defineMetadata("tsconvict:property", schemaObj, target, propertyName);
    }

    /**
     * Sets the convict meta data for a config class.
     * @param schemaObj The schema info in a `Config` decorator.
     * @param target A constructor of a config class.
     */
    public setConvictMetaForClass(schemaObj: ConfigOptions, target: any)  {
        return this._reflect.defineMetadata("tsconvict:schema", schemaObj, target);
    }

    /**
     * Retrieves the tsconvict schema for a class.
     * @param target
     */
    public getConvictMetaForClass(target: any): ConfigOptions | null {
        return this._reflect.getMetadata("tsconvict:schema", target) || null;
    }

    /**
     * An array of convict properties managed by the config class.
     * For every proeprty on a class with the `Property` decorator
     * there will be one entry here for it. This is for knowing what
     * properties are managed by TSConvict and will be in the config.
     * @param target A constructor of a config class.
     * @param propertyName The name of the property on the instance to check.
     */
    public setPropertyForClass(target: any, propertyName: string) {
        let props = this.getClassProperties(target);
        if (props === null) {
            this._reflect.defineMetadata("tsconvict:properties", [], target.constructor);
            props = this.getClassProperties(target);
        }
        return props.push(propertyName);
    }

    /**
     * Gives an array of properties which are managed by TSConvict
     * on the particular target.
     * @param target A constructor of a config class.
     */
    public getClassProperties(target: any): string[] {
        return this._reflect.getMetadata("tsconvict:properties", target.constructor) || null;
    }
}

/**
 * Export the instantiated object so it is a singleton in the Module loader.
 */
export default new Reflector();
