import React, { useCallback, useRef } from 'react';
import { useTransition } from 'react-spring';
import { useOnClickOutside } from '../../../utils/customHooks';
import {
  DropdownContainer,
  DropdownMenu,
  DropdownItem,
  DropdownToggler
} from './Dropdown.styled';

const Item = props => <DropdownItem {...props}>{props.item}</DropdownItem>;
const Dropdown = ({ items = [], menuProps, message, open, setOpen }) => {
  const transitions = useTransition(open, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  const menuRef = useRef();
  const memoClose = useCallback(() => setOpen(false), [setOpen]);
  useOnClickOutside(menuRef, memoClose);
  return (
    <DropdownContainer>
      {message && (
        <DropdownToggler
          disabled={items.length === 0}
          message={message}
          onClick={() => setOpen(!open)}
        />
      )}
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <DropdownMenu
              key={key}
              ref={menuRef}
              open={open}
              style={props}
              {...menuProps}
            >
              {items && items.map(i => <Item {...menuProps} item={i} />)}
            </DropdownMenu>
          )
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
