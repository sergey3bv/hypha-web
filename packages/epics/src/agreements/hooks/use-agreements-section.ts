import React from 'react';

export const useAgreementsSection = () => {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [pages, setPages] = React.useState(1);

  React.useEffect(() => {
    setPages(1);
  }, [activeFilter]);

  return {
    pages,
    setPages,
    activeFilter,
    setActiveFilter,
  };
};
