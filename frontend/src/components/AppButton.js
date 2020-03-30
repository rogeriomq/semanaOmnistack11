import React from 'react'

const AppButton = (props) => {
  const children = props.children
  
  return (
    <button className={`w-full h-12 bg-red-700 rounded-lg border-0 text-white font-bold mt-3 inline-block text-center text-lg no-underline leading-relaxed transition-colors  duration-300 hover:bg-red-800 ${props.className}
    `}
      type="{props.type}"
    >
      {children}
    </button>
  )
}

export default AppButton