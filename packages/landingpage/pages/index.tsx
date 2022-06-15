// @ts-ignore
import React from "react";
import axios from 'axios'
import Layout from '../components/layout'
import {
    Card, CardActionArea, CardContent, CardMedia, Container, Grid, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography,
} from "@material-ui/core";

interface Props {
    data: any
}

// function TrendingCard({data}) {
//     return <Grid sm={4}>
//         {JSON.stringify(data)}
//         <Card>
//             <CardActionArea>
//                 <CardMedia
//                     component="img"
//                     alt="Contemplative Reptile"
//                     height="200"
//                     image={data.item.large}
//                     title="Contemplative Reptile"
//                 />
//             </CardActionArea>
//             <CardContent>
//                 <Typography gutterBottom variant="h5" component="h2">
//                     Lizard
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" component="p">
//                     Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//                     across all continents except Antarctica
//                 </Typography>
//             </CardContent>
//         </Card>
//     </Grid>
// }

export default function HomePage(props: Props) {

    return <Layout>
        <Container>
            <TableContainer style={{boxShadow: 'none'}} component={Paper}>
                <Table aria-label='Top trending cryptocurrencies'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ranking</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.coins.map(({item}) =>
                            <TableRow>
                                <TableCell>
                                    {item.market_cap_rank}
                                </TableCell>
                                <TableCell >
                                    <img style={{verticalAlign: 'middle'}} src={item.thumb} width={25} alt=""/>
                                    {item.name}
                                </TableCell>
                                <TableCell>
                                    {item.score}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </Layout>
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await axios.get(`https://api.coingecko.com/api/v3/search/trending`)

    // Pass data to the page via props
    return { props: { data: res.data } }
}

