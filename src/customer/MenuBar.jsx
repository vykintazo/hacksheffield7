import {useEffect, useState} from 'react';
import {Global} from '@emotion/react';
import {styled} from '@mui/material/styles';
import {grey} from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {Button, IconButton, List, ListItemButton, ListItemText, Stack} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)'
}));

export default function MenuBar({businesses, offers, selectedBusiness, onSelectedBusinessChange}) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        if (!open && selectedBusiness) {
            setOpen(true);
        }
    }, [selectedBusiness]);

    useEffect(() => {
        if (!open) {
            onSelectedBusinessChange(null);
        }
    }, [open]);

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Open</Button>
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />

            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        background: 'white',
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0
                    }}
                >
                    <Puller/>
                    <Typography variant="h5" sx={{p: 2}}>Nearby Offers</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    {!selectedBusiness ? (<List>
                        {businesses?.map((businessUser) => {
                            const {business, uid} = businessUser;
                            const businessOffers = offers?.filter((offer) => offer.uid === uid);
                            return (
                                <ListItemButton key={uid} onClick={() => onSelectedBusinessChange(businessUser)}>
                                    <ListItemText
                                        primary={business.name}
                                        secondary={`${businessOffers.length} offer(s) available.`}/>
                                </ListItemButton>
                            )
                        })}
                    </List>) : (
                        <Box sx={{width: '100%'}}>
                            <Stack direction="row" alignItems="center" sx={{width: '100%'}}>
                                <IconButton onClick={() => onSelectedBusinessChange(null)}><ArrowBack/></IconButton>
                                <Typography sx={{flexGrow: 1}}
                                            variant="h6">{selectedBusiness.business.name}</Typography>
                            </Stack>
                            <List>
                                {offers?.filter((offer) => offer.uid === selectedBusiness.uid)?.map((offer) => {

                                    // TODO add more details for offer item
                                    return (
                                        <ListItemButton key={offer.id} onClick={() => null}>
                                            <ListItemText
                                                primary={offer.offerName}
                                                secondary={offer.description}/>
                                        </ListItemButton>
                                    )
                                })}
                            </List>
                        </Box>
                    )}
                </StyledBox>
            </SwipeableDrawer>
        </div>
    );
}
