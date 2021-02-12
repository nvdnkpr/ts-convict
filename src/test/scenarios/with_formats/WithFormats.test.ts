/**
 * @module test/models
 */
import { suite, test } from "@testdeck/mocha";
import * as assert from "assert";
import "mocha";
import WithFormats from "./WithFormats.model";
import { TSConvict } from "../../../index";

let tsConvict: TSConvict<WithFormats>;

/**
 * tests a model with a submodel but no Config annotation
 */
@suite("Test a config which uses formats")
export class WithFormatsTest {
    public before() {
        tsConvict = new TSConvict(WithFormats);
    }

    @test("Make sure we can import formats and use them")
    public validConfig() {
        const myRawConfig: any = {};
        const myValidConfig: WithFormats = tsConvict.load(myRawConfig);
        //make sure we got a proper serialized type back
        assert.strictEqual(
            myValidConfig instanceof WithFormats,
            true,
            "Expected the config to be an instance of WithFormats"
        );

        assert.strictEqual(
            myValidConfig.host,
            "127.0.0.1",
            "There should be no issues validating an ipaddress"
        );
    }

    @test("Test when values is of type ipaddress")
    public testIpType() {
        // now make sure a valid IP can be given to host
        assert.doesNotThrow(() => {
            tsConvict.load({
                host: "72.210.64.112",
            });
        }, "The value was a valid IP so there should be no error");

        // now make sure the ipaddress type does not allow some jibberish
        assert.throws(() => {
            try {
                tsConvict.load({
                    host: "somejibberish",
                });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    'host: must be an IP address: value was "somejibberish"'
                );
                throw error;
            }
        }, "There should be an error because host was set to somejibberish");
    }
}
