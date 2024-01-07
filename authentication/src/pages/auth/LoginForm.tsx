import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { AppContext, ContextType } from "../../Provider";
import { useContext } from "react";

interface FormProps {
    email?: string;
    password?: string;
}

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
    })
    .required();

const Login = () => {
    const context = useContext<ContextType>(AppContext);
    const setOpen = context?.setOpen;
    const setMessage = context?.setMessage;

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: undefined,
            password: undefined,
        },
    });

    const handleError = (message: string) => {
        setOpen?.(true);
        setMessage?.(message);
    };

    const onSubmit = async (data: FormProps) => {
        try {
            const response = await axios.post(
                'https://mock-api.arikmpt.com/api/user/login',
                {
                    email: data.email,
                    password: data.password,
                }
            );

            window.localStorage.setItem('token', response.data.data.token);
            navigate('/');
        } catch (error) {
            const err = error as AxiosError as any;
            const errors = err.response?.data?.errors;
            if (Array.isArray(errors)) {
                return;
            }
            handleError(errors);
        }
    };

    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card sx={{ maxWidth: 300 }} variant="outlined" className="bg-white rounded-md shadow-md">
                <CardContent className="p-4">
                    <Typography variant="h4" align="center" className="mb-4 text-2xl font-bold">
                        Login
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} className="mb-2 text-gray-600">
                        Please Login To Continue
                    </Typography>
                    <div className="space-y-4">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                    helperText={errors.email?.message}
                                    error={!!errors.email}
                                    className="w-full"
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    type="password"
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    helperText={errors.password?.message}
                                    error={!!errors.password}
                                    className="w-full"
                                />
                            )}
                        />
                    </div>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit(onSubmit)}
                        color="success"
                        className="mt-4"
                    >
                        Login
                    </Button>
                    <Typography sx={{ fontSize: 14 }} className="mt-2 text-gray-600">
                        Or
                    </Typography>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleRegister}
                        color="success"
                        className="mt-2"
                    >
                        Register
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
