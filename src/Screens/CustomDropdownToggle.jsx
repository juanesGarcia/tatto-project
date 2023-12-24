import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';


const CustomDropdownToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }} className='drop'>
    <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.5rem', color: 'white' }} />
  </div>
));

export default CustomDropdownToggle;
