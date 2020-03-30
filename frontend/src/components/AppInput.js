import React from 'react';


export default function AppInput(props) {
  const otherClassNames = props.className || ''
  const placeholder = props.placeholder || ''
  const type = props.type || 'default'
  return (
    <input
    className={`w-full h-12 px-6 text-gray-700 border border-gray-400 rounded-lg ${otherClassNames}`}
    type={type}
    placeholder={placeholder}
    />
  );
}
