// @ts-ignore
import React, {useEffect, useState} from "react";
import axios from 'axios'
import Layout from '../components/layout'
import {
    Container, IconButton, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite'
import DeleteIcon from '@material-ui/icons/Delete'
import {useSession} from "next-auth/react"

interface Props {
    data: any
}


export default function HomePage(props: Props) {
    const [favorites, setFavorites] = useState<Array<any>>([])
    const [entries, setEntries] = useState<Array<any>>(props.data)
    const { status, data: session } = useSession()

    //entries initial value comes from the ssr
    useEffect(() => {
        axios.get('api/records/highlight').then(({ data }) => setFavorites(data))

        const interval = setInterval(async () => {
            const { data } = await axios.get('/api/records/list')
            // get a comma separated list of coins from sanity entries
            const ids = data.map((entry: any) => entry.coinId).join(',')
            const { data: marketData } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    ids
                }
            })
            console.log("executing....")

            setEntries( data.map((entry: any) => ({...marketData.find((coin: any) => coin.id === entry.coinId), ...entry})) )
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {

    })

    const isHighlighted = (coin: string) => !!favorites.find(fav => fav.cryptocurrency == coin)

    async function handleFavorite(id: string) {
        const highlight = isHighlighted(id)

        if (!highlight) {
            setFavorites((prevState: Array<any>) => [...prevState, {cryptocurrency: id}])
        } else {
            setFavorites((prevState: Array<any>) => prevState.filter(fav => fav.cryptocurrency != id))
        }

        await axios.post('api/records/highlight', {coinId: id, highlight: !highlight})
    }

    async function handleDelete(id: string) {
        const response = await axios.delete('/api/records', { data: {id}})
        if (response.status === 202) {
            setEntries(prevState => prevState.filter(entry => entry.id !== id))
        }
    }

    return <Layout>
        <Container>
            <TableContainer style={{boxShadow: 'none'}} component={Paper}>
                <Table aria-label='Top trending cryptocurrencies'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ranking</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>
                                Current Price
                            </TableCell>
                            <TableCell>
                                Market Capitalization
                            </TableCell>
                            <TableCell>Price Change (24h)</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((item, idx: number) =>
                            <TableRow key={idx}>
                                <TableCell>
                                    {item.market_cap_rank}
                                </TableCell>
                                <TableCell>
                                    <img style={{verticalAlign: 'middle', marginRight: 5}} src={item.image} width={25} alt=""/>
                                    <b>{item.name}</b>
                                </TableCell>
                                <TableCell>
                                    {item.current_price}
                                </TableCell>
                                <TableCell>
                                    {item.market_cap}
                                </TableCell>
                                <TableCell>
                                    {item.price_change_24h}
                                </TableCell>
                                <TableCell>
                                    { status === "authenticated" && item.allowHighlight &&
                                        <IconButton onClick={() => handleFavorite(item.id)}>
                                            <FavoriteIcon style={{color: isHighlighted(item.id) ? 'red' : "grey"}}/>
                                        </IconButton>
                                    }
                                    { status === "authenticated" && session.user.isAdmin &&
                                        <IconButton onClick={() => handleDelete(item.id)}>
                                            <DeleteIcon></DeleteIcon>
                                        </IconButton>
                                    }
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
    const { data } = await axios.get(process.env.NEXTAUTH_URL + '/api/records/list')
    // get a comma separated list of coins from sanity entries
    const ids = data.map((entry: any) => entry.coinId).join(',')
    const { data: marketData } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
            vs_currency: 'usd',
            ids
        }
    })
    return { props: { data: data.map((entry: any) => ({...marketData.find((coin: any) => coin.id === entry.coinId), ...entry}) )}}
}

