import React, { useCallback, useRef, useState } from 'react';
import { useTransition } from 'react-spring';
import { useOnClickOutside } from '../../../utils/customHooks';
import {
  DropdownContainer,
  DropdownMenu,
  DropdownItem,
  DropdownToggler
} from './Dropdown.styled';

const Item = props => <DropdownItem>{props.item}</DropdownItem>;
const Dropdown = ({ items, message }) => {
  const [open, setOpen] = useState(false);
  const transitions = useTransition(open, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  const menuRef = useRef();
  const memoClose = useCallback(() => setOpen(false), []);
  useOnClickOutside(menuRef, memoClose);
  return (
    <DropdownContainer>
      {message && (
        <DropdownToggler message={message} onClick={() => setOpen(!open)} />
      )}
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <DropdownMenu key={key} ref={menuRef} open={open} style={props}>
              {items && items.map(i => <Item item={i} />)}
            </DropdownMenu>
          )
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
