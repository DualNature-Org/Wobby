import { Box } from "@mui/system";

export default function Playground(){
    return(
        <Box sx={{
            height: 500,
            borderLeft: "solid #333 2px",                        
        }}>
            <Box sx={{
                height: 50,
                backgroundColor: '#e1ccef'
            }}>

            </Box>
            <textarea className="playground-text" placeholder="Enter text"> </textarea>
        </Box>
    )
}