import { property } from "../../../";
import SubNoMainChild from './SubNoMainChild.model';

export default class SubNoMainParent {

    @property({
        doc: 'The name of the thing',
        default: 'Convict',
        env: 'MY_CONFIG_NAME'
    })
    public name: string;

    @property(SubNoMainChild)
    public subConfig: SubNoMainChild;

}
