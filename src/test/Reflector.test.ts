/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import reflect from '../util/Reflector';
import WithMainParent from './scenarios/subconfig_with_main/WithMainParent.model';
import WithMainChild from "./scenarios/subconfig_with_main/WithMainChild.model";
import { expect } from "chai";
import * as yaml from 'js-yaml';

const parent = new WithMainParent();
const child = new WithMainChild();

const NotRealConfigClass = class {
    public foo: string;
};

/**
 * tests a model with a submodel but no Config annotation
 */
@suite('Tests for the Reflect Object')
export class ReflectorTester {

    @test("Make sure the right amount of props can be found")
    public checkPropCount() {
        const props = reflect.getClassProperties(parent);
        assert.strictEqual(props.length, 4, "There should be exactly 4 properties");
        expect(props).to.have.all.members(['name', 'host', 'port', 'subConfig']);
    }

    @test("Check finding some property metadata")
    public checkPropConvictMeta() {
        const expected = {
            doc: 'The name of the thing',
            default: 'Convict',
            env: 'MY_CONFIG_NAME',
            format: String
        }
        const actual = reflect.getConvictMetaForProperty(parent, "name");
        assert.deepStrictEqual(actual, expected, "The name property is not correct in the metadata");
    }

    @test("Make sure the reflector can understand a function is a constructor")
    public testTheIsConstructor() {
        assert.strictEqual(reflect.isConstructor(WithMainParent), true, "The WithMainParent is a constructor though");
        assert.strictEqual(reflect.isConstructor(parent), false, "The parent is an instance of WithMainParent, not a constructor");
        assert.strictEqual(reflect.isConstructor(() => { }), false, "That is not a constructor, it's an arrow function");
        assert.strictEqual(reflect.isConstructor(function () { }), false, "That is not a constructor, it's a function");
        assert.strictEqual(reflect.isConstructor(function () { this.msg = ""; }), false, "That is a constructor, it's a function with this, but this won't be caught");
        assert.strictEqual(reflect.isConstructor(String), true, "That is a constructor, it's a String constructor");
        assert.strictEqual(reflect.isConstructor("hecka"), false, "That is not a constructor, it's a String");
        assert.strictEqual(reflect.isConstructor(NotRealConfigClass), true, "The NotRealConfigClass is a constructor");
    }

    @test("Make sure the reflector can determine a class is a config class")
    public testTheIsConfigClass() {
        assert.strictEqual(reflect.isConfigClass(WithMainParent), true, "The WithMainParent should be a config class");
        assert.strictEqual(reflect.isConfigClass(parent), false, "The parent is an instance of a config class, not a config class");
        assert.strictEqual(reflect.isConfigClass(parent.constructor), true, "The parent.constructor is a config class");
        assert.strictEqual(reflect.isConfigClass(String), false, "A String constructor is not a config class");
        assert.strictEqual(reflect.isConfigClass(NotRealConfigClass), false, "A NotRealConfigClass is not a config class");
    }

    @test("Make sure we can get the class schema from a class")
    public testgettingClassSchema() {
        const expected = {
            file: 'src/test/scenarios/subconfig_with_main/foo.yml',
            parser: {
                extension: ['yml', 'yaml'],
                parse: yaml.safeLoad
            }
        }
        const actual = reflect.getConvictMetaForClass(parent.constructor);
        assert.deepStrictEqual(actual, expected, "The config schema has differed");

        //const nullChildSchema = reflect.getConvictMetaForClass(child.constructor);
        //assert.strictEqual((nullChildSchema === null), true, "The child has no config schema");
    }

}
