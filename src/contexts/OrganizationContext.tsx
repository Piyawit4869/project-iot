import React, { useContext } from 'react';

interface OrganizationContextData {
  nameTh?: string;
}

export const OrganizationContext = React.createContext<OrganizationContextData>(
  { nameTh: '' },
);

export const useOrganizationContext = () => useContext(OrganizationContext);
