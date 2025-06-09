import MenuItem from "./MenuItem";

export default interface OptionFilterDumbComponentProps<T extends MenuItem> {
    selectedItem: T | null;
    items: T[] | undefined;
    onSelect: (slug: T) => void;
    optionName: string;
  }