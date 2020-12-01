/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import Missing from './Missing.model';
import { TSConvict } from '../../../index';

let tsConvict: TSConvict<Missing>;

@suite('Test a config with parameters missing from schema')
export class MissingTest {

    /**
     * Make a new one each and every test.
     */
    public before() {
        tsConvict = new TSConvict(Missing);
    }

    @test('Test getting a config with a missing schema value in warning level')
    public validConfig() {
        const myRawConfig: any = {
            name: 'Giraffe',
            shout: 'Eureka!'
        };

        assert.doesNotThrow(() => {
            tsConvict.load(
                myRawConfig,
                { level: 'warn' }
            );
        }, 'The strictness level is set to warn so the invalid config value should not throw');

        const validConfig = tsConvict.load(
            myRawConfig,
            { level: 'warn' }
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
                tsConvict.load(
                    myRawConfig,
                    { level: 'strict' }
                );
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    "configuration param 'shout' not declared in the schema"
                );
                throw error;
            }
        }, 'The strictness level is set to strict so the invalid config value should throw');

        assert.throws(() => {
            try {
                tsConvict.load(
                    myRawConfig,
                    { level: 'unicornTears' }
                );
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    "configuration param 'shout' not declared in the schema"
                );
                throw error;
            }
        }, 'The strictness level is set to a non-sense value so should default to strict in the load and should throw');

    }
}
