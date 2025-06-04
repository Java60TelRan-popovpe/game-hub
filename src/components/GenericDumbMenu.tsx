import {
    Button,
    Menu,
    Portal,
  } from "@chakra-ui/react";
  
  import { FaChevronDown, FaChevronUp } from "react-icons/fa";
  import MotionComponent from "./MotionComponent";
  import MenuItem from "../model/MenuItem";


import OptionFilterDumbComponentProps from "../model/OptionFilterDumbComponentProps";
import { useState } from "react";

const FilterOptionAsMenu = <T extends MenuItem>({
    selectedItem,
    items,
    onSelect,
    optionName,
  }: OptionFilterDumbComponentProps<T>) => {
    const duration = 0.7;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
      <Menu.Root onExitComplete={() => setIsOpen(false)}>
        <Menu.Trigger asChild>
          <Button
            variant="outline"
            size="sm"
            marginBottom={3}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedItem?.name || optionName}
            {isOpen ? (
              <MotionComponent duration={duration}>
                <FaChevronUp></FaChevronUp>
              </MotionComponent>
            ) : (
              <FaChevronDown></FaChevronDown>
            )}
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <MotionComponent duration={duration}>
              <Menu.Content>
                {items.map((p) => (
                  <Menu.Item
                    key={p.slug}
                    value={p.slug}
                    onClick={() => {
                      onSelect(p);
                      setIsOpen(false);
                    }}
                  >
                    {p.name}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </MotionComponent>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    );
  };

  export default FilterOptionAsMenu