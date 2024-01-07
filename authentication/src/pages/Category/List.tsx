import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Container, Typography, Button} from '@mui/material';
import { useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Category {
    id: string;
    name: string;
    is_active: boolean;
}

const List = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<Category[]>([])

    const handleEdit = (id: string) => () => {
        navigate(`/edit/${id}`);
    }

    const token = window.localStorage.getItem('token')

    const fetchList = async () => {
        const response = await axios.get('https://mock-api.arikmpt.com/api/category' , {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        setRows(response.data.data)
    }

    useEffect(
        () => {
            fetchList()
        },
        []
    )

    const handleDelete = (id: string) => async () => {
        try {
            await axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })

            fetchList()
        } catch (error) {
            
        }
    }

    return (
        <div className='content'>
            <Container maxWidth="md">
                <div className='category-list'>
                    <Typography variant="h4" component="h4" className="text-center text-2xl font-bold mb-4">
                        List Of Category
                    </Typography>
                    <Link to={'/add'} className="text-blue-500 hover:underline mb-2 inline-block">Add New Category</Link>
                    <Link to={'/login'} className="text-blue-500 hover:underline mb-2 inline-block ml-4">Logout</Link>
                    <TableContainer component={Paper}>
                        <Table className="min-w-max" aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="font-semibold">ID</TableCell>
                                    <TableCell className="font-semibold" align="center">Name</TableCell>
                                    <TableCell className="font-semibold" align="center">Status</TableCell>
                                    <TableCell className="font-semibold" align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.is_active ? 'Active' : 'Deactive'}</TableCell>
                                            <TableCell align="center">
                                                <div className="space-x-2">
                                                    <Button size="small" variant="contained" className="bg-red-500 text-white" onClick={handleEdit(row.id)}>Edit</Button>
                                                    <Button size="small" variant="outlined" className="border-red-500 text-red-500" onClick={handleDelete(row.id)}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        </div>
    )
}

export default List;
