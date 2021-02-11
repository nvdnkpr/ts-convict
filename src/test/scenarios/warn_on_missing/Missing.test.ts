/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import MissingWarn from './MissingWarn.model';
import MissingStrict from './MissingStrict.model';
import { TSConvict } from '../../../index';

let tsConvictWarn: TSConvict<MissingWarn>;
let tsConvictStrict: TSConvict<MissingStrict>;

@suite('Test a config with parameters missing from schema')
export class MissingTest {

    /**
     * Make a new one each and every test.
     */
    public before() {
        tsConvictWarn = new TSConvict(MissingWarn);
        tsConvictStrict = new TSConvict(MissingStrict);
    }

    @test('Test getting a config with a missing schema value in warning level')
    public validConfig() {
        const myRawConfig: any = {
            name: 'Giraffe',
            shout: 'Eureka!'
        };

        assert.doesNotThrow(() => {
            tsConvictWarn.load(
                myRawConfig
            );
        }, 'The validationLevel is set to warn so the invalid config value should not throw');

        const validConfig = tsConvictWarn.load(
            myRawConfig
        );

        assert.strictEqual(('name' in validConfig), true, 'Included parameters from schema make it into valid configs');
        assert.strictEqual(('shout' in validConfig), false, 'Missing parameters from schema do not make it into valid configs');
    }

    @test('Test getting a config with a missing schema value in anything but warning level')
    public testGettingValidDefaultConfig() {
        const myRawConfig: any = {
            name: 'Giraffe',
            shout: 'Eureka!'
        };

        assert.throws(() => {
            try {
                tsConvictStrict.load(
                    myRawConfig
                );
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    "configuration param 'shout' not declared in the schema"
                );
                throw error;
            }
        }, 'The validationLevel is set to strict so the invalid config value should throw');

    }
}
