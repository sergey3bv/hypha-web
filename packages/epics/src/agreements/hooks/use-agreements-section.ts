import React from 'react';

export const useAgreementsSection = () => {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [pages, setPages] = React.useState(1);
  return {
    pages,
    setPages,
    activeFilter,
    setActiveFilter,
  };
};
