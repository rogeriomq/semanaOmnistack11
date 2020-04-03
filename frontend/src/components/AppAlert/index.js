import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiX, FiXCircle } from 'react-icons/fi';


export default function AppAlert({
  type = 'danger',
  title = '',
  message = '',
  time = undefined,
  position = 'top-0 right-0'
}) {
  const typeColor = {
    success: 'teal',
    danger: 'red',
    warning: 'orange',
    primary: 'blue'
  };

  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 right-0',
    'bottom-right': 'bottom-0 left-0'
  }

  const [hiddenAlert, setHiddenAlert] = useState(false);

  useEffect(() => {

    if (!hiddenAlert && time) {
      setTimeout(() => {
        setHiddenAlert(true);
      }, time);
    }
  }, [hiddenAlert, time]);

  return (
    <div
      className={`${hiddenAlert ? 'hidden' : ''} bg-${
        typeColor[type]
      }-100 sm:max-w-md md:max-w-lg lg:max-w-xl  border-t-4 border-${typeColor[type]}-500 rounded-b text-${
        typeColor[type]
      }-900 px-4 py-3 m-3 shadow-md absolute top-auto bottom-0 left-0`}
      role="alert"
    >
      <div>
        <div className="flex relative">
          <div className="p-1 self-center">
            <WhichIcon size={24} moreClass={`${typeColor[type]} mr-2`} />
          </div>
          <div>
            <p className="font-bold text-lg">{title}</p>
            <p className="text-base mt-2">{message}</p>
          </div>
        </div>

        <button
          className="rounded-full border-0 outline-none absolute top-0 right-0 m-2 p-1  
            hover:font-bold transition-all transform ease-linear duration-300
            hover:scale-150 hover:rotate-90"
          onClick={() => setHiddenAlert(true)}
        >
          <FiX className="text-base"/>
        </button>
      </div>
    </div>
  );

  function WhichIcon({ size, moreClass }) {
    if (type === 'success') {
      return <FiCheckCircle size={size} className={moreClass} />;
    } else {
      if (type === 'danger') {
        return <FiXCircle size={size} className={moreClass} />;
      } else {
        if (type === 'warning') {
          return <FiAlertTriangle size={size} className={moreClass} />;
        } else {
          if (type === 'primary') {
            return <FiAlertCircle size={size} className={moreClass} />;
          }
        }
      }
    }
  }
}
