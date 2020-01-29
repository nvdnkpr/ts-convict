/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import ComplexTypes from "test/schema/ComplexTypes";
import { Named } from "test/schema/Named";
import { TSConvict } from "index";

let tsConvict: TSConvict<ComplexTypes>;

@suite('Test a config with complex types')
export class ComplexTypeTest {

    /**
     * Make a new one each and every test.
     */
    public before() {
        tsConvict = new TSConvict(ComplexTypes);
    }

    @test("test subconfig feature")
    public subConfigInstanceTest() {
        
        let config: ComplexTypes = tsConvict.load();
        // make sure the subconfig class was properly instantiated
        assert.strictEqual(
            (config.subConfig instanceof Named),
            true,
            'Expected the subconfig to be an instanceof SubConfig'
        );

        // make sure the value 7 was on bar
        assert.strictEqual(
            config.subConfig.name,
            "Convict",
            'The name should be Convict'
        );
        
        const myRawConfig: any = {
            subConfig: {
                name: "One App"
            }
        };
        config = tsConvict.load(myRawConfig);

        // make sure the value 7 was on bar
        assert.strictEqual(
            config.subConfig.name,
            "One App",
            'The bar should have been 7'
        );
    }

}
