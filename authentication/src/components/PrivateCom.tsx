import { Alert, Snackbar } from "@mui/material";
import { useContext, ReactNode } from "react";
import { AppContext, ContextType } from "../Provider";

interface Props {
    children: ReactNode;
}

const PrivateCom = ({ children }: Props) => {
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
            <div className="p-4">{children}</div>
        </>
    );
};

export default PrivateCom;
