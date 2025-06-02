import MenuItem from "./MenuItem";

export default interface FilterComponentProps {
  selectedItem: MenuItem | null;
  onSelect: (slug: MenuItem) => void;
  addShowAllItem: boolean;
}