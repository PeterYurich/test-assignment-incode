import { InfinitySpin } from 'react-loader-spinner';
import { useTheme } from '@emotion/react';

export const Loader = () => {
    const { palette } = useTheme()

    return (
            <InfinitySpin 
                height="60"
                width="120"
                color={palette.primary.main}
                visible={true}
            />
    );
};