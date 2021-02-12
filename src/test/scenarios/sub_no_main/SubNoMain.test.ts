/**
 * @module test/models
 */
import { suite, test } from "@testdeck/mocha";
import * as assert from "assert";
import "mocha";
import SubNoMainParent from './SubNoMainParent.model';
import SubNoMainChild from "./SubNoMainChild.model";
import { TSConvict } from '../../../index';

let tsConvict: TSConvict<SubNoMainParent>;

/**
 * tests a model with a submodel but no Config annotation
 */
@suite('Test a config with a subconfig but no Config annotation')
export class SubNoMainTest {

    public before() {
        tsConvict = new TSConvict(SubNoMainParent);
    }

    @test('Get a valid config from json values')
    public validConfig() {
        const myRawConfig: any = {
            name: 'Bubbles',
            subConfig: {
                bar: 7
            }
        };
        const myValidConfig: SubNoMainParent = tsConvict.load(myRawConfig);
        //make sure we got a proper serialized type back
        assert.strictEqual(
            (myValidConfig instanceof SubNoMainParent),
            true,
            'Expected the config to be an instance of MyConifg'
        );

        //make sure the value in the config took precedence over the default
        assert.strictEqual(
            myValidConfig.name,
            'Bubbles',
            'Expected the name to be Bubbles on MyConifg'
        );

        // make sure the subconfig class was properly instantiated
        assert.strictEqual(
            (myValidConfig.subConfig instanceof SubNoMainChild),
            true,
            'Expected the subconfig to be an instanceof SubConfig'
        );

        // make sure the value 7 was on bar
        assert.strictEqual(
            myValidConfig.subConfig.bar,
            7,
            'The bar should have been 7'
        );
    }

    @test('Get a valid default config')
    public testGettingValidDefaultConfig() {
        const myValidConfig: SubNoMainParent = tsConvict.load();
        //make sure the value is set to the default value
        assert.equal(
            myValidConfig.name,
            'Convict',
            'Expected the name to be Convict on MyConifg'
        );

        // make sure the subconfig class was properly instantiated
        assert.strictEqual(
            (myValidConfig.subConfig instanceof SubNoMainChild),
            true,
            'Expected the subconfig to be an instanceof SubConfig'
        );

        // make sure the value 7 was on bar
        assert.strictEqual(
            myValidConfig.subConfig.bar,
            0,
            'The bar should have been 0 as the default'
        );
    }

}
