/**
 * @module test/models
 */
import { suite, test } from "mocha-typescript";
import * as assert from "assert";
import "mocha";
import SimpleFlat from './scenarios/simple_flat/SimpleFlat.model';
import { TSConvict } from '../TSConvict';
import { Property } from "../index";

class InternalClass {
    @Property({
        doc: 'An embedded config class',
        default: 'blorb'
    })
    public message: string;
}

@suite('Testing the basics')
export class BasicsTest {

    public static before() {

    }

    @test('Test Simple flat with TSConvict')
    public testSimpleFlatTSConvict() {
        const tsConvict = new TSConvict<SimpleFlat>(SimpleFlat);

    }

}
