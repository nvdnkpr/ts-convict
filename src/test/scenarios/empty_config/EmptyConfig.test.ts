/**
 * @module test/models
 */
import {suite, test} from "@testdeck/mocha";
import * as assert from "assert";
import "mocha";
import EmptyConfig from './EmptyConfig.model';
import {TSConvict} from '../../../index';

let tsConvict: TSConvict<EmptyConfig>;

@suite('Test a config with only simple values')
export class EmptyConfigTest {

    /**
     * Make a new one each and every test.
     */
    public before() {
        tsConvict = new TSConvict(EmptyConfig);
    }

    @test('Test getting an empty config')
    public validConfig() {
        const myValidConfig: EmptyConfig = tsConvict.load({});
        // Make sure we got a proper serialized type back
        assert.strictEqual(
            (myValidConfig instanceof EmptyConfig),
            true,
            'Expected the config to be an instance of EmptyConfig'
        );

        assert.deepEqual(
            myValidConfig,
            {},
            'Expected the config to be empty'
        );
    }
}
