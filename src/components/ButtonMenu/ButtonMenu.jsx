import { Button, Menu, Text, useMantineTheme } from "@mantine/core";
import {
  TbSquareCheck,
  TbPackage,
  TbUsers,
  TbCalendar,
  TbChevronDown,
} from "react-icons/tb";

export default function ButtonMenu({content, dropdownContent, onClickActionsButton}) {
  const theme = useMantineTheme();

  function onClickButton(text) {
    onClickActionsButton(text);
  }
  return (
    <Menu transition="pop-top-right" position="bottom-start" withinPortal>
      <Menu.Target>
        <Button bg="#195d51" rightIcon={<TbChevronDown fill="white" size={18} stroke={1.5} />} pr={18}>
          {content}
        </Button>
      </Menu.Target>
      {dropdownContent && <Menu.Dropdown w="16rem !important">
        {dropdownContent.map((content, i) => (
          <Menu.Item onClick={() => onClickButton(content.text)} key={i}>
              {content.text}
          </Menu.Item>
        ))}
      </Menu.Dropdown>}
    </Menu>
  );
}