import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from 'next-themes';

const Mode = () => {
    const { theme, setTheme } = useTheme();
    const toggleColorMode = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ClientOnly fallback={<Skeleton boxSize="8" />}>
        <IconButton onClick={toggleColorMode} variant="outline" size="sm">
            {theme === 'light' ? <LuMoon /> : <LuSun />}
        </IconButton>
        </ClientOnly>
    );
};

export default Mode;