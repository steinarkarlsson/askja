import React, { useCallback } from 'react';
import { Error, ErrorProps } from 'ra-ui-materialui';

export type ErrorComponentProps = Omit<ErrorProps, 'resetErrorBoundary'>;

export const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {
    const refresh = useCallback(() => window.location.reload(), []);
    return <Error {...props} resetErrorBoundary={refresh} />;
};
