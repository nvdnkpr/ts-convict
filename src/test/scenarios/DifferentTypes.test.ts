/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import { TSConvict } from 'index';
import SimpleTypes from 'test/schema/SimpleTypes';

let tsConvict: TSConvict<SimpleTypes>;

@suite('Test a config with different simple types')
export class DifferentTypesTest {

    public before() {
        // console.log('Running the MyConfig Test');
        tsConvict = new TSConvict(SimpleTypes);
    }

    @test("Make sure the config is the right serialized type")
    public testConfigType() {
        
    }

    @test('Test to make sure all the default values are valid')
    public testDefaultTypes() {
        let config: SimpleTypes;
        assert.doesNotThrow(() => {
            config = tsConvict.load();
        }, 'The default values should not give an error');
        assert.strictEqual(
            (config instanceof SimpleTypes),
            true,
            'Expected the config to be an instance of MyConifg'
        );
        assert.strictEqual(config.stringFormat, 'a string');
        assert.strictEqual(config.numberFormat,77.2);
        assert.strictEqual(config.booleanFormat,true);
        assert.strictEqual(config.daysTillApocalypse,1);
        assert.strictEqual(config.host,'127.0.0.1');
        assert.strictEqual(config.port,8080);
    }

    @test('Test when value is of type string')
    public testStringType() {

        // make sure a valid value can be given
        // first make sure a valid config with an int can be given
        assert.doesNotThrow(() => {
            tsConvict.load({
                stringFormat: 'chicken'
            });
        }, 'The value was a string so there should not be an error');

        assert.throws(() => {
            tsConvict.load({
                stringFormat: 3
            });
        }, 'There should be an error since name should be a string');
    }

    @test('Test when value is of type int')
    public testIntType() {

        // first make sure a valid config with an int can be given
        assert.doesNotThrow(() => {
            tsConvict.load({
                daysTillApocalypse: 5
            });
        }, 'The value was an int so there should not be an error');

        // make sure you don't get an int error because we gave a negative number
        assert.doesNotThrow(() => {
            tsConvict.load({
                daysTillApocalypse: -7
            });
        }, 'There should not be an error since daysTillApocalypse was given a negative');

        // make sure you get a not an int error because we gave a string
        assert.throws(() => {
            tsConvict.load({
                daysTillApocalypse: 'not a number'
            });
        }, 'There should be an error since daysTillApocalypse was given a string');

        // make sure you get a not an int error because we gave a double
        assert.throws(() => {
            tsConvict.load({
                daysTillApocalypse: 3.2
            });
        }, 'There should be an error since daysTillApocalypse was given a double');

    }

    @test('Test when values is of type ipaddress')
    public testIpType() {

        // now make sure a valid IP can be given to host
        assert.doesNotThrow(() => {
            tsConvict.load({
                host: '72.210.64.112'
            });
        }, 'The value was a valid IP so there should be no error');

        // now make sure the ipaddress type does not allow some jibberish
        assert.throws(() => {
            tsConvict.load({
                    host: 'somejibberish'
                });
        }, 'There should be an error because host was set to somejibberish');
    }

    @test('Test when value is of type port')
    public testPortType() {

        // now make sure a valid port can be given to port
        assert.doesNotThrow(() => {
            tsConvict.load({
                port: 5050
            });
        }, '5050 is a valid port so there should be no error');

        // make sure port as a string works too
        assert.doesNotThrow(() => {
            tsConvict.load({
                port: "3020"
            });
        }, '3020 is a valid port as a string so there should be no error');

        // now make sure the port type does not allow some jibberish
        assert.throws(() => {
            tsConvict.load({
                    port: 'somejibberish'
                });
        }, 'There should be an error because port was set to somejibberish');

        // make sure we can't set a port out of range
        assert.throws(() => {
            tsConvict.load({
                    port: 66535
                });
        }, 'The port should have an error because 66535 is greater than 65535');

    }

}
