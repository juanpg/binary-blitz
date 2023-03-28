import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import CurrentChart from "./CurrentChart";

function CurrentStats({roundTimes}) {
    const { stats } = useContext(AppContext);
    const { highestRound } = stats.statistics;
    const totalTime = roundTimes.reduce((t, i) => t + i, 0);
    const rounds = roundTimes.length;
    const lastRound = rounds > 0 ? roundTimes[rounds - 1] / 1000 : 0;
    const secondsPerRound = rounds > 0 ? totalTime / rounds / 1000 : 0;
    const projectedScore = secondsPerRound > 0 ? Math.floor(Math.log(secondsPerRound/8/2)/Math.log(0.95)+101) : 0;

    return (
        <>
            <Grid gridTemplateColumns={{base: 'repeat(2, 1fr)', md:'repeat(4, 1fr)'}} textAlign='center' w='full'>
                <GridItem><Text as={rounds > highestRound ? 'mark' : ''}>Current score: {rounds}</Text></GridItem>
                <GridItem>Projected score: {projectedScore}</GridItem>
                <GridItem>Last: {lastRound.toFixed(3)}s</GridItem>
                <GridItem>Avg: {secondsPerRound.toFixed(3)}s</GridItem>
            </Grid>
            <CurrentChart roundTimes={roundTimes} />
        </>
    )
}

export default CurrentStats;