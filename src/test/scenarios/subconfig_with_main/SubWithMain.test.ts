/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import WithMainParent from './WithMainParent.model';
import WithMainChild from "./WithMainChild.model";
import { TSConvict } from '../../../index';

let tsConvict: TSConvict<WithMainParent>;

/**
 * tests a model with a submodel but no Config annotation
 */
@suite('Test a config with a subconfig and with Config annotation')
export class SubNoMainTest {

    public before() {
        tsConvict = new TSConvict(WithMainParent);
    }

    @test('Get a valid config from json values')
    public validConfig() {
        const myRawConfig: any = {
            name: 'Bubbles',
            subConfig: {
                bar: 7
            }
        };
        const myValidConfig: WithMainParent = tsConvict.load(myRawConfig);
        //make sure we got a proper serialized type back
        assert.strictEqual(
            (myValidConfig instanceof WithMainParent), true,
            'Expected the config to be an instance of MyConifg'
        );

        //make sure the value in the config took precedence over the default
        assert.strictEqual(
            myValidConfig.name, 'Bubbles',
            'Expected the name to be Bubbles on MyConifg'
        );

        // make sure the subconfig class was properly instantiated
        assert.strictEqual(
            (myValidConfig.subConfig instanceof WithMainChild), true,
            'Expected the subconfig to be an instanceof SubConfig'
        );

        // make sure the value 7 was on bar
        assert.strictEqual(
            myValidConfig.subConfig.bar, 7,
            'The bar should have been 7'
        );
    }

    @test('Get a valid config from default file')
    public testGettingValidConfigWithDefaultFile() {
        const myValidConfig: WithMainParent = tsConvict.load();
        //make sure the value is set to the default value
        assert.equal(
            myValidConfig.name, 'foo config',
            'Expected the name to be Convict on MyConifg'
        );

        // make sure the subconfig class was properly instantiated
        assert.strictEqual(
            (myValidConfig.subConfig instanceof WithMainChild), true,
            'Expected the subconfig to be an instanceof SubConfig'
        );

        // make sure the value 7 was on bar
        assert.strictEqual(
            myValidConfig.subConfig.bar, 7,
            'The bar should have been 7'
        );
    }

    @test('Override default file with passed in config')
    public testOverrideFileWithConfig() {
        const myRawConfig: any = {
            subConfig: {
                bar: 22
            }
        };
        const myValidConfig: WithMainParent = tsConvict.load(myRawConfig);

        //make sure the value is set to files value
        assert.equal(
            myValidConfig.name, 'foo config',
            'Expected the name to be Convict on MyConifg'
        );

        // make sure the value 22 overrode 7 from the file
        assert.strictEqual(
            myValidConfig.subConfig.bar, 22,
            'The bar should have been 22 because it was overridden'
        );
    }

    @test('Override default file with another file')
    public testOverrideFileWithAnotherFile() {
        const myValidConfig: WithMainParent = tsConvict.load(`${__dirname}/bar.yml`);

        //make sure the value is set to files value
        assert.equal(
            myValidConfig.name, 'the bar config',
            'Expected the name to be Convict on MyConifg'
        );

        // make sure the value 22 overrode 7 from the file
        assert.strictEqual(
            myValidConfig.subConfig.bar, 22,
            'The bar should have been 22 because it was overridden'
        );

        // make sure the port was set too
        assert.strictEqual(
            myValidConfig.port, 8090,
            "The port should be overriden by bar file"
        );
    }

    @test("Test loading a default config when deafult file is missing")
    public testMissingDefaultFile() {
        const childConvict: TSConvict<WithMainChild> = new TSConvict(WithMainChild);
        const myValidConfig: WithMainChild = childConvict.load();
        assert.strictEqual(myValidConfig.bar,0, "The default value should be 0");
    }

}
