export interface ListItem {
    item: string;
    isChecked: boolean;
    children?: ListItem[];
}
