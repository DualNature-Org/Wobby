import {Paper, CardContent, CardActions, Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom'

export default function Card(props) {
    return(
        <Paper elevation={2}>
            <CardContent>
                <Typography variant='h5'>
                    {props.name}
                </Typography>
                <br/>
                <Typography variant="body1">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to='/tools/playground'>
                    <Button size="small">Try Now</Button>
                </Link>
            </CardActions>
        </Paper>
    )
}