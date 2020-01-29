/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import { MyConfig } from "test/schema/MyConfig";
import { Database } from "test/schema/Database";
import { TSConvict } from "index";

let tsConvict: TSConvict<MyConfig>;

/**
 * tests a model with a submodel but no Config annotation
 */
@suite('Test a config with different ways of using a file')
export class LoadByFileTest {

    public before() {
        tsConvict = new TSConvict(MyConfig);
    }

    @test('Check giving it json does not give any issues')
    public validConfig() {
        const config: any = {
            name: 'Bubbles'
        };
        const myConfig: MyConfig = tsConvict.load(config);

        //make sure the value in the config took precedence over the default
        assert.strictEqual(
            myConfig.name, 'Bubbles',
            'Expected the name to be Bubbles on MyConfig'
        );
    }

    @test('Get a valid config from default file')
    public testGettingValidConfigWithDefaultFile() {
        const myConfig: MyConfig = tsConvict.load();
        
        //make sure the name is from the file
        assert.equal(myConfig.name, 'Cool App');

        // make sure the db class was properly instantiated
        assert.strictEqual((myConfig.db instanceof Database), true);

        // check a value on the db is right
        assert.strictEqual(myConfig.db.user, "devuser");
    }

    // TODO: Can't overide the current config with more configs
    @test.skip//('Override default file with passed in config')
    public testOverrideFileWithConfig() {
        let myConfig: MyConfig = tsConvict.load();

        const config: any = {
            name: "Weird App"
        };
        myConfig = tsConvict.load(config);

        assert.equal(
            myConfig.name, "Weird App",
            "Make sure the name is the overridden name in the json"
        );

        assert.strictEqual(myConfig.db.user, "devuser");
    }

    @test('Override default file with another file')
    public testOverrideFileWithAnotherFile() {
        const myConfig: MyConfig = tsConvict.load("src/test/config/Config.prod.yml");
        assert.equal(
            myConfig.name, "Production App",
            'The name should come from the overide file'
        );
    }

    @test("Test loading a default config when deafult file is missing")
    public testMissingDefaultFile() {
        const dbConvict: TSConvict<Database> = new TSConvict(Database);
        let dbConfig: Database;
        assert.doesNotThrow(() => {
            dbConfig = dbConvict.load();
        }, "Should ignore missing default file and load defaults")
        assert.strictEqual(
            dbConfig.host,"localhost",
            "Should be the default value"
        );
    }

}
