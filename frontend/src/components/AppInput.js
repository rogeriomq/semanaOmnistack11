import React from 'react';


export default function AppInput({
    moreClasses = '',
    moreStyles = {},
    placeholder = '',
    type = 'text',
    value = '',
    onChange = () => {},
    // textarea only
    isTextArea = false,
    rows = 5,
    resize = 'vertical',
  }) {
  // const otherClassNames = props.className || ''
  // const placeholder = props.placeholder || ''
  // const type = props.type || 'default'
  // const otherStyles = props.style || ''
  // const rows  = props.rows || 5
  // const isTextArea = props.isTextArea || false
  // const value = props.value || ''
  // const onChange = props.onChange || (() => {})

  if (isTextArea)
    return (
      <textarea 
        className={`${moreClasses} w-full text-lg px-6 py-4 leading-relaxed text-gray-700 border border-gray-400 rounded-lg`}
        style={{...moreStyles}}
        placeholder={placeholder}
        rows={rows}
        resize={resize}
        value={value}
        onChange={onChange}     
      ></textarea>
    )

  return (
    <input
      className={`${moreClasses} w-full text-lg h-16 px-6 text-gray-700 border border-gray-400 rounded-lg `}
      style={{...moreStyles}}
      type={type}
      placeholder={placeholder}
      // defaultValue={value}
      value={value}
      onChange={onChange}
    />
  );
}
