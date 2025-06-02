import MenuItem from "./MenuItem";

export default interface ParentPlatform extends MenuItem{
  id: string;
  name: string;
  slug: string;
}