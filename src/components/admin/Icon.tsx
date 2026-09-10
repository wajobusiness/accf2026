import React from 'react';

export const Icon: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/images/accbcf-logo.svg"
        alt="ACCBCF"
        style={{
          width: '28px',
          height: '28px',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default Icon;
