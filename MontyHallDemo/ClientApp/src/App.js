import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'; 
import TextField from '@mui/material/TextField'; 
import Typography from '@mui/material/Typography'; 
import FormControlLabel from '@mui/material/FormControlLabel'; 
import Checkbox from '@mui/material/Checkbox'; 
import Button from '@mui/material/Button'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const App = () => {

    const [numOfSimulations, setNumOfSimulations] = useState(1);
    const [switchDoor, setSwitchDoor] = useState(true);
    const [results, setResults] = useState(null);
    const [switchingPercentage, setSwitchingPercentage] = useState(null);
    const [notSwitchingPercentage, setNotSwitchingPercentage] = useState(null);

    useEffect(() => {
        if(numOfSimulations < 1) setNumOfSimulations(1)
    }, [numOfSimulations]);

    useEffect(() => {
        if (!results) return;
        const percentage = (results.filter((result) => result.won).length / results.length) * 100;
        console.log(percentage);
        if (switchDoor) {
            switchingPercentage ? setSwitchingPercentage((prevPercent) => (prevPercent + percentage) / 2) : setSwitchingPercentage(percentage);
        } else {
            notSwitchingPercentage ? setNotSwitchingPercentage((prevPercent) => (prevPercent + percentage) / 2) : setNotSwitchingPercentage(percentage);
        }
    }, [results]);

    const getSimulations = () => {
        fetch(`simulation/${numOfSimulations}/${switchDoor}`)
            .then((results) => { return results.json() })
            .then((data) => setResults(data))
    }

    return (
        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={5}>
                <Typography variant="h3">Monty Hall Demo</Typography>
            </Grid>

            <Grid item xs={8}>
                <Typography paragraph align="center">
                    This is a simulation of the popular math problem called Monty Hall paradox.
                </Typography>
                <Typography paragraph align="center">
                    Enter how many games you would like to simulate and whether or not the player switches doors.
                </Typography>
            </Grid>

            {switchingPercentage &&
                <Grid item xs={8}>
                    <Typography variant="h4">
                        Win rate when switching doors: {Math.floor(switchingPercentage)}%
                    </Typography>
                </Grid>
            }

            {notSwitchingPercentage &&
                <Typography variant="h4">
                    Win rate when not switching doors: {Math.floor(notSwitchingPercentage)}%
                </Typography>
            }

            <Grid item xs={8}>
                <TextField 
                    label="Number of simulations"
                    value={numOfSimulations}
                    onChange={(e) => setNumOfSimulations(Math.floor(e.target.value))}
                    type="number"
                    inputProps={{ min: 1 }}
                    sx={{marginRight: 4}}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            value={switchDoor}
                            onChange={(e) => setSwitchDoor(e.target.checked)}
                        />}
                    label="Switch door?"
                />
            </Grid>

            <Grid item xs={4}>
                <Button variant="contained" onClick={() => getSimulations()}>
                    Simulate!
                </Button>
            </Grid>

            {results &&
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Chosen door</TableCell>
                                    <TableCell align="right">Winning door</TableCell>
                                    <TableCell align="right">Won game?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((result, index) => (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell align="center">
                                            {result.chosenDoor}
                                        </TableCell>
                                        <TableCell align="center">
                                            {result.winningDoor}
                                        </TableCell>
                                        <TableCell align="center">
                                            {result.won ? "Yes!" : "No..."}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            }
        </Grid>
    )
}
export default App;
