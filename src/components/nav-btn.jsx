import React from "react";
import Box from '@mui/material/Box'
import {Link} from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'

class NavBtn extends React.Component{
    constructor(props){
        super(props)
    
    }

    render(){
        return(
            <Box
            sx={{
                padding: 1,
                width: 'max-content',
                '&:hover': {
                    backgroundColor: 'yellow',
                    opacity: [0.9, 0.8, 0.7],
                }
            }}>
            <Link to={this.props.link} style={{textDecoration: 'none', color: '#fff'}}>
                {this.props.name}
            </Link>                        
            </Box>
        )
    }
}

export default NavBtn