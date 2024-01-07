import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext, ContextType } from "../Provider";

const PublicCom = () => {
    const context = useContext<ContextType>(AppContext);
    const open = context?.open;
    const setOpen = context?.setOpen;
    const message = context?.message;

    const handleClose = () => {
        setOpen?.(false);
    };

    return (
        <>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={6000}
                onClose={handleClose}
                className="fixed top-0 right-0 mt-4 mr-4" 
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <div className="p-4">
                <Outlet />
            </div>
        </>
    );
};

export default PublicCom;
