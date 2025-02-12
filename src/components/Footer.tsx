// client/src/components/Footer.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <footer style={{ marginTop: '20px', padding: '10px 0', backgroundColor: '#25ba52' }}>
            <Container>
                <Typography variant="body1" align="center">
                    © {new Date().getFullYear()} This app is made by Daria Kurilenko.
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
