import { Item } from './item.model';

export const FB_LIST_REF = 'lists';

export interface List {

    name: string;
    description?: string;
    uid: string;
    items: Item[];
    parent: string;
}
