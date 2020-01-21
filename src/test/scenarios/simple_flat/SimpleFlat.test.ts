/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import SimpleFlat from './SimpleFlat.model';
import { TSConvict } from '../../../index';

let tsConvict: TSConvict<SimpleFlat>;

@suite('Test a config with only simple values')
export class SimpleFlatTest {

    /**
     * Make a new one each and every test.
     */
    public before() {
        tsConvict = new TSConvict(SimpleFlat);
    }

    @test('Test getting a simple flat config')
    public validConfig() {
        const myRawConfig: any = {
            name: 'Bubbles'
        };
        const myValidConfig: SimpleFlat = tsConvict.load(myRawConfig);
        //make sure we got a proper serialized type back
        assert.strictEqual(
            (myValidConfig instanceof SimpleFlat),
            true,
            'Expected the config to be an instance of MyConifg'
        );

        //make sure the value in the config took precedence over the default
        assert.strictEqual(
            myValidConfig.name,
            'Bubbles',
            'Expected the name to be Bubbles on MyConifg'
        );
    }

    @test('Test getting a simple flat default config')
    public testGettingValidDefaultConfig() {
        const myValidConfig: SimpleFlat = tsConvict.load();
        //make sure we got a proper serialized type back
        assert.strictEqual(
            (myValidConfig instanceof SimpleFlat),
            true,
            'Expected the config to be an instance of MyConifg'
        );
        //make sure the value is set to the default value
        assert.equal(
            myValidConfig.name,
            'Convict',
            'Expected the name to be Bubbles on MyConifg'
        );
    }

}
