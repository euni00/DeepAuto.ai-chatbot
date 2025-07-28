import React from 'react';

interface IContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: IContainerProps) => {
  return <div className={'mx-auto max-w-4xl w-full sm:px-6 lg:px-8'}>{children}</div>;
};

export default Container;
