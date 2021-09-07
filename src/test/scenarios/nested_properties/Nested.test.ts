/**
 * @module test/models
 */
import { suite, test } from "@testdeck/mocha";
import * as assert from "assert";
import "mocha";
import { TSConvict } from "../../../index";
import Nested from "./Nested.model";

let tsConvict: TSConvict<Nested>;

@suite("Test a config with different types all set incorrectly")
export class NestedTest {
    public before() {
        // console.log('Running the MyConfig Test');
        tsConvict = new TSConvict(Nested);
    }

    @test("Test to make sure all the default values are valid")
    public testDefaultTypes() {
        let config: Nested;
        assert.doesNotThrow(() => {
            config = tsConvict.load();
        }, "The default values should not give an error");
        assert.strictEqual(
            config.name,
            "Convict",
            "The port should be Convict"
        );
        assert.strictEqual(
            config.daysTillApocalypse,
            1,
            "The daysTillApocalypse should be 1"
        );
        assert.strictEqual(
            config.server.host,
            "127.0.0.1",
            "The host should be 127.0.0.1"
        );
        assert.strictEqual(config.server.port, 8080, "The port should be 8080");
    }

    @test("Test when value is of type string")
    public testStringType() {
        // make sure a valid value can be given
        // first make sure a valid config with an int can be given
        assert.doesNotThrow(() => {
            tsConvict.load({ name: "chicken" });
        }, "The value was a string so there should not be an error");

        assert.throws(() => {
            try {
                tsConvict.load({ name: 3 });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    "name:  should be of type String: value was 3"
                );
                throw error;
            }
        }, "There should be an error since name should be a string");
    }

    @test("Test when value is of type int")
    public testIntType() {
        // first make sure a valid config with an int can be given
        assert.doesNotThrow(() => {
            tsConvict.load({ daysTillApocalypse: 5 });
        }, "The value was an int so there should not be an error");

        // make sure you don't get an int error because we gave a negative number
        assert.doesNotThrow(() => {
            tsConvict.load({ daysTillApocalypse: -7 });
        }, "There should not be an error since daysTillApocalypse was given a negative");

        // make sure you get a not an int error because we gave a string
        assert.throws(() => {
            try {
                tsConvict.load({ daysTillApocalypse: "not a number" });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    "daysTillApocalypse: must be an integer"
                );
                throw error;
            }
        }, "There should be an error since daysTillApocalypse was given a string");

        // make sure you get a not an int error because we gave a double
        assert.throws(() => {
            try {
                tsConvict.load({ daysTillApocalypse: 3.2 });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    "daysTillApocalypse: must be an integer"
                );
                throw error;
            }
        }, "There should be an error since daysTillApocalypse was given a double");
    }

    @test("Test when value is of type port")
    public testPortType() {
        // now make sure a valid port can be given to port
        assert.doesNotThrow(() => {
            tsConvict.load({ port: 5050 });
        }, "5050 is a valid port so there should be no error");

        // make sure port as a string works too
        assert.doesNotThrow(() => {
            tsConvict.load({ port: "3020" });
        }, "3020 is a valid port as a string so there should be no error");

        // now make sure the port type does not allow some jibberish
        assert.throws(() => {
            try {
                tsConvict.load({ port: "somejibberish" });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    "port: ports must be within range 0 - 65535"
                );
                throw error;
            }
        }, "There should be an error because port was set to somejibberish");

        // make sure we can't set a port out of range
        assert.throws(() => {
            try {
                tsConvict.load({ port: 66535 });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    "port: ports must be within range 0 - 65535"
                );
                throw error;
            }
        }, "The port should have an error because 66535 is greater than 65535");
    }
}
