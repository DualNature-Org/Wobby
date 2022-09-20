import { Paper, TableCell, TableHead, Table, TableRow,  Typography, Container, TableBody, Grid, Select, MenuItem, TextField, Button, Stack, Box, IconButton, Icon, Link } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Tasks() {
    const [pendingTasks, setPendingTasks] = useState([['New Task', '30/12/2022', 'Marrie', 'Not Done']])
    const [pendingPayments, setPendingPayments] = useState([['New Task', '01/12/2022', 'Marrie', 'Not Done']])
    const [filter, setFilter]= useState('None')
    const [input, setInput]= useState('')
    const [response, setResponse]= useState([])
    const [addForm, setAddForm]= useState(false)

    const [taskName, setTaskName]= useState('')
    const [taskPrice, setTaskPrice]= useState('sa')
    const [taskClient, setTaskClient]= useState('')
    const [taskDeadline, setTaskDeadline]= useState('')
    const [taskExpert, setTaskExpert]= useState('Dobby')
    const [taskCompensation, setTaskCompensation]= useState(taskPrice*0.2)
    const [taskTags, setTaskTags]= useState('')

    useEffect(() => {
        fetch('')
    })

    const handle_filter= (e) => {
        setFilter(e.target.value)
    }
    const handle_input= (e) =>{
        setInput(e.target.value)
    }
    const handle_find= (e) =>{
        fetch('http://127.0.0.1:5000/task/?'+filter+ '='+ input)
        .then(res => res.json())
        .then((data) => {
            setResponse(data['tasks'])
        })
    }
    const handle_assign= (e) =>{
        setAddForm(true)
    }
    const handle_add_task= ()=> {
        const request_data= {
            name: taskName,
            price: taskPrice,
            client: taskClient,
            deadline: taskDeadline,
            expert: taskExpert,
            compensation: taskCompensation,
            tags: taskTags
        }
        const requestOpts= {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify(request_data)
        }
        fetch('http://127.0.0.1:5000/task/add', requestOpts)
        .then(res => res.json())
        .then(data => console.log(data))
    }
    const handle_back_arrow= ()=> {
        setAddForm(false)
    }
    const handle_click= (e)=> {
        fetch('http://127.0.0.1:5000/task/add')
    }

    const show_response= () => {
        if(response != []){
            return (
                <Paper>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Assign Date</TableCell>
                                <TableCell align="right">Client</TableCell>
                                <TableCell align="right">Expert</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {response.map((task) => (
                                    <TableRow>
                                        <TableCell>
                                            <Link underline="hover" name={task[0]} onClick={handle_click}>{task[0]}</Link>
                                        </TableCell>
                                        <TableCell align="right">{task[1]}</TableCell>
                                        <TableCell align="right">{task[2]}</TableCell>
                                        <TableCell align="right">{task[3]}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Paper>
            )
        }
        return null
    }

    return(
        addForm ?
        <Container sx={{margin: '2rem 0'}}>
            <Paper sx={{padding: '1rem'}}>
                <Grid container justifyContent={'space-between'} marginBottom='1rem'>
                    <Grid item>
                        <Typography variant="h5">Add Task</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handle_back_arrow}><ArrowBackIcon></ArrowBackIcon></IconButton>
                    </Grid>
                </Grid>
                <Stack spacing={2} marginBottom='1rem'>
                    <TextField variant="standard" label='Name' type='text' value={taskName} onChange={(e) => setTaskName(e.target.value)}></TextField>
                    <TextField variant="standard" label='Price' type='number' value={taskPrice} onChange={(e) => setTaskPrice(e.target.value)}></TextField>
                    <TextField variant="standard" label='Client' type='text' value={taskClient} onChange={(e) => setTaskClient(e.target.value)}></TextField>
                    <TextField variant="standard" label='Deadline' type='date' value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)}></TextField>
                    <TextField variant="standard" label='Expert' type='text' value={taskExpert} onChange={(e) => setTaskExpert(e.target.value)}></TextField>
                    <TextField variant="standard" label='Compensation' type='number' value={taskCompensation} onChange={(e) => setTaskCompensation(e.target.value)}></TextField>
                    <TextField variant="standard" label='Tags' type='text' value={taskTags} onChange={(e) => setTaskTags(e.target.value)}></TextField>
                </Stack>
            </Paper>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={handle_add_task} sx={{marginTop: '1rem'}}>Submit</Button>
            </Box>
        </Container> :
        <Container sx={{marginTop: '1rem'}}>

            <Grid container alignItems='center' justifyContent= 'space-between'>
                <Grid item>
                    <Select label='Filter' value={filter} onChange={handle_filter}>
                        <MenuItem value={'Task'}>Task</MenuItem>
                        <MenuItem value={'Client'}>Client</MenuItem>
                        <MenuItem value={'None'}>All</MenuItem>
                    </Select> 
                    <TextField variant="outlined" label='Input' value={input} onChange={handle_input}/>
                    <Button variant="contained" onClick={handle_find} sx={{ marginLeft: '1rem'}}>Find Task</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handle_assign}>Assign Task</Button>
                </Grid>
            </Grid>

            <hr></hr>

            {show_response()}

            <Typography variant="h5" marginTop={2}>Pending Tasks</Typography>
            <Paper>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Deadline</TableCell>
                            <TableCell align="right">Client</TableCell>
                            <TableCell align="right">Submition</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {pendingTasks.map((task) => (
                                <TableRow>
                                    <TableCell>{task[0]}</TableCell>
                                    <TableCell align="right">{task[1]}</TableCell>
                                    <TableCell align="right">{task[2]}</TableCell>
                                    <TableCell align="right">{task[3]}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Paper>

            <Typography variant="h5" marginTop={2}>Pending Payments</Typography>
            <Paper>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Assign Date</TableCell>
                            <TableCell align="right">Client</TableCell>
                            <TableCell align="right">Payment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {pendingPayments.map((task) => (
                                <TableRow>
                                    <TableCell>{task[0]}</TableCell>
                                    <TableCell align="right">{task[1]}</TableCell>
                                    <TableCell align="right">{task[2]}</TableCell>
                                    <TableCell align="right">{task[3]}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Paper>

        </Container>
    )
}