
class Reflector {

    private _reflect: any;
    constructor() {
        const reflectInstalled = Reflect && (Reflect as any).getMetadata ? true : false;
        if (!reflectInstalled) throw new Error("reflect-metadata should be installed properly");
        this._reflect = Reflect;
    }

    public isConstructor(obj) {
        return !!obj.prototype && !!obj.prototype.constructor.name && (obj instanceof Function);
    }

    public getTsType(target: any, propertyName: string): any {
        return this._reflect.getMetadata("design:type", target, propertyName);
    }

    public getConvictMetaForProperty(target: any, propertyName: string) {
        return this._reflect.getMetadata("tsconvict:property", target, propertyName);
    }

    public setConvictMetaForProperty(schemaObj: any, target: any, propertyName: string) {
        return this._reflect.defineMetadata("tsconvict:property", schemaObj, target, propertyName);
    }

    public setConvictMetaForClass(schemaObj: any, target: any) {
        return this._reflect.defineMetadata("tsconvict:schema", schemaObj, target);
    }

    public setPropertyForClass(target: any, propertyName: string) {
        let props = this.getClassProperties(target);
        if (props === null) {
            this._reflect.defineMetadata("tsconvict:properties", [], target.constructor);
            props = this.getClassProperties(target);
        }
        return props.push(propertyName);
    }

    public getClassProperties(target: any) {
        return this._reflect.getMetadata("tsconvict:properties", target.constructor) || null;
    }
}

export default new Reflector();
