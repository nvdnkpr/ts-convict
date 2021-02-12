/**
 * @module test/models
 */
import { suite, test } from "@testdeck/mocha";
import * as assert from "assert";
import "mocha";
import Pet from "./Pet.model";
import Dog from "./Dog.model";
import { TSConvict } from "../../../index";
import reflect from "../../../Reflector";
import { expect } from "chai";

let tsConvict: TSConvict<Dog>;

@suite("Test one config can inherit another")
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
        const petProps = reflect.getClassProperties(new Pet());
        const dogProps = reflect.getClassProperties(new Dog());

        const petConf = new TSConvict(Pet);
        console.log("Just a pet", petConf.load());

        console.log("The pet props", petProps);
        console.log("The dog props", dogProps);

        expect(petProps).to.have.all.members(["name"]);
        expect(dogProps).to.have.all.members(["name", "fluffiness"]);
    }

    @test("Test getting all managed props defaults from parent")
    public inheritedPropsDefault() {
        const dog: Dog = tsConvict.load();
        assert.strictEqual(dog.name, "Rex", "The dogs name should be rex");
        assert.strictEqual(dog.fluffiness, 5, "The fluffiness should be 5");
    }

    @test("Test getting all managed props from parent")
    public inheritedProps() {
        const raw: Dog = {
            name: "Fido",
            fluffiness: 12,
        };
        const dog: Dog = tsConvict.load(raw);
        assert.strictEqual(dog.name, "Fido", "The dogs name should be Fido");
        assert.strictEqual(dog.fluffiness, 12, "The fluffiness should be 5");
    }
}
