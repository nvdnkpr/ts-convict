/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import { Named } from "test/schema/Named";
import { TSConvict } from "index";

class NotRealConfig {
	name: string = "blah";
};

let tsConvict: TSConvict<Named>;

@suite('Test random features')
export class FeaturesTest {

    /**
     * Make a new one each and every test.
     */
	public before() {

	}

	@test("test error when not a config class")
	public notConfigClassError() {
		let errorConvict: any;
		assert.throws(() => {
			errorConvict = new TSConvict(NotRealConfig);
        }, "should throw an error because its not a config");
	}

}
