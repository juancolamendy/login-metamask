import React from 'react';
import PropTypes from 'prop-types';

const Button = ({label, onClick}) => {
  return (
  <button type="button" 
    onClick={onClick}
    className="flex content-center items-center justify-center text-center px-3 py-2 border border-gray-200 shadow-sm rounded-md bg-white bg-opacity-10 border-opacity-10 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 w-full">
    {label}
  </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
