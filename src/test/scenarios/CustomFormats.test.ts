/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import ConfigWithFormat from "test/schema/ConfigWithFormat";
import { TSConvict } from "index";

let tsConvict: TSConvict<ConfigWithFormat>;

@suite('Test a config with only simple values')
export class SimpleFlatTest {

    /**
     * Make a new one each and every test.
     */
    public before() {
        tsConvict = new TSConvict(ConfigWithFormat);
    }



}
