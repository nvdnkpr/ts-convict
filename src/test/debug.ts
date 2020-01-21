import { Property } from '../index';
import { TSConvict } from '../TSConvict';
import WithMainParent from "./scenarios/subconfig_with_main/WithMainParent.model";

const myRawConfig: any = {
    name: 'Bubbles',
    subConfig: {
        bar: 4
    }
};

const tsConvict = new TSConvict<WithMainParent>(WithMainParent);
const config = tsConvict.load(myRawConfig);

console.log("The config", config);
