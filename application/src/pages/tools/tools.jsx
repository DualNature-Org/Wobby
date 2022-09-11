import { Button, Grid, Stack } from "@mui/material";
import { Link, Routes, Route } from "react-router-dom";
import Playground from "./playground";
import './tools.css'


export default function Tools(){
    const tools = ['playground', 'writer', 'paraphraser', 'summariser']
    return(
        <Grid container>

            <Grid item xs= {2} mt={2}>
                <Stack spacing={1}>
                    {tools.map((tool) => {
                        return(
                            <Link to= {tool} style={{textDecoration: 'none', alignItems: 'center', display: 'grid'}}>
                                <Button>{tool}</Button>
                            </Link>
                        )
                    })}
                </Stack>
            </Grid>

            <Grid item xs= {10}>
                <Routes>
                    <Route path= {'playground'} element={<Playground />} />
                </Routes>
            </Grid>
        </Grid>
    )
}