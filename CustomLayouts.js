import React from 'react';

const VerticalSplit = ({ children }) => {
  const [heading, ...kids] = React.Children.toArray(children.props.children);
  return (
    <div>
      {heading}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        {kids}
      </div>
    </div>
  );
};

const HorizontalSplit = ({ children }) => {
  const [heading, ...kids] = React.Children.toArray(children.props.children);

  return (
    <div>
      {heading}
      <div
        style={{
          alignItems: 'top',
          display: 'flex',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        {kids}
      </div>
    </div>
  );
};

export { VerticalSplit, HorizontalSplit };
