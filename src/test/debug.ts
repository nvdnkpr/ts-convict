import { Property } from '../index';
import { TSConvict } from '../TSConvict';
// import WithMainParent from "./scenarios/subconfig_with_main/WithMainParent.model";
import SimpleFlat from './scenarios/simple_flat/SimpleFlat.model';

/*const myRawConfig: any = {
    name: 'Bubbles',
    subConfig: {
        bar: 4
    }
};*/

const myRawConfig: any = {
    name: 'Bubbles'
};

const tsConvict = new TSConvict<SimpleFlat>(SimpleFlat);
const config = tsConvict.load();

console.log("The config", config);
