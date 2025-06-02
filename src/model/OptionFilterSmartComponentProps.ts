export default interface GenericMenuComponentProps<T> {
    selectedItem: T | null;
    onSelect: (slug: T) => void;
    addShowAllItem: boolean;
    endpoint: string;
    optionName: string;
  }