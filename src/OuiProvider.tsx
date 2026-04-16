import type { ReactNode } from 'react';

interface OuiProviderProps {
  children: ReactNode;
}

/**
 * OuiProvider wraps the application to provide OUI v9 theme context.
 * The OUI v9 package from the v9-rework branch uses SCSS-based theming
 * without a built-in React provider, so this component serves as the
 * integration point for theme context and future OUI v9 provider APIs.
 */
const OuiProvider = ({ children }: OuiProviderProps) => {
  return <div className="oui-v9-provider">{children}</div>;
};

export default OuiProvider;
