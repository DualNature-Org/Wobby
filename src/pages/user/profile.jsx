import { Box, Container } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { CartesianGrid, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from 'recharts'
import { GraphData } from "../../data/graph-data";

export default function Profile(props) {
  const handle_logout = () => {};
  return (
    <Box sx={{padding: '15px 0px 0px 15px'}}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <br />
        <Typography variant="h5" sx={{ width: "75%" }}>
          Hello, {props.username}
        </Typography>
        <br />
        <Button variant="contained">Change Password</Button>
        <Button
          variant="contained"
          color="error"
          sx={{ marginX: "5px" }}
          onClick={handle_logout}
        >
          Logout
        </Button>
      </Box>
      <Card sx={{ maxWidth: 275, border:'1px solid black', marginY: '40px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Credit Score
          </Typography>
          <Typography variant="h4" sx={{ mb: 1.5 }} color="text.secondary">
            345
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{padding:'25px 25px 50px 0px', height: '250px', boxShadow: 'none'}}>
      <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={200} data={GraphData}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal
              vertical={false}
              strokeWidth="1"
              stroke="#252525"
            />
            <XAxis
              dataKey="x"
              axisLine
              tickLine={false}
              tickMargin={10}
            />
            <YAxis 
              dataKey="revenue"
              axisLine={false}
              tickLine={false} 
              tickMargin={10} 
            />
            <Tooltip content="revenue" cursor={false} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#1672F8"
              strokeWidth="5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        </Card>
    </Box>
  );
}
