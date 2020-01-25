/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import { Named } from "test/schema/Named";
import Dog from "test/schema/Dog";
import { TSConvict } from "index";
import reflect from "Reflector";
import { expect } from "chai";

let tsConvict: TSConvict<Dog>;

@suite.skip// ('Test one config can inherit another')
export class InheritanceTest {

    /**
     * Make a new one each and every test.
     */
    public before() {
        tsConvict = new TSConvict(Dog);
    }

    // ummmm . . . baffling
    // ("Make sure reflect gets all the extended properties")
    // when you try and use the dog and pet the pet seems to become a dog
    // this means the context of the parent is lost for some odd reason
    @test.skip
    public allPropsInProtoChain() {
        const petProps = reflect.getClassProperties(new Named());
        const dogProps = reflect.getClassProperties(new Dog());

        const petConf = new TSConvict(Named);
        console.log("Just a pet", petConf.load()); 

        console.log("The pet props", petProps);
        console.log("The dog props", dogProps);

        expect(petProps).to.have.all.members(['name']);
        expect(dogProps).to.have.all.members(['name', 'fluffiness']);
    }

    @test.skip//("Test getting all managed props defaults from parent")
    public inheritedPropsDefault() {
        const dog: Dog = tsConvict.load();
        assert.strictEqual(dog.name, "Convict", "The dogs name should be Convict");
        assert.strictEqual(dog.fluffiness, 5, "The fluffiness should be 5");
    }

    @test.skip//("Test getting all managed props from parent")
    public inheritedProps() {
        const raw: Dog = {
            name: "Fido",
            fluffiness: 12
        };
        const dog: Dog = tsConvict.load(raw);
        assert.strictEqual(dog.name, "Fido", "The dogs name should be Fido");
        assert.strictEqual(dog.fluffiness, 12, "The fluffiness should be 5");
    }

}
