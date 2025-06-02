export default interface OptionFilterDumbComponentProps<T> {
    selectedItem: T | null;
    items: T[];
    onSelect: (slug: T) => void;
    optionName: string;
  }