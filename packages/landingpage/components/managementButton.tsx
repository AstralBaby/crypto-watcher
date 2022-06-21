import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    ListItem,
    ListItemIcon, ListItemText,
    Slide,
    TextField
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {TransitionProps} from "@material-ui/core/transitions";
import axios from "axios";
import {Autocomplete} from "@mui/material";
import Typography from "@material-ui/core/Typography";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
})


export default function ManagementButton() {
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const [selected, setSelected] = useState<{item: any} | null>({})

    useEffect(() => {
      axios.get(`https://api.coingecko.com/api/v3/search/trending`).then(res => setSuggestions(res.data.coins))
    }, [setSuggestions])

    return <>
        <Button onClick={() => setOpen(true)}>Edit</Button>
        <Dialog TransitionComponent={Transition} open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                Edit table
            </DialogTitle>
            <DialogContent style={{width: 300}}>
                <Box mb={2}>
                    <Typography>
                        <b>Add new entry</b>
                    </Typography>
                    <Autocomplete fullWidth options={suggestions}
                                 getOptionLabel={option => option.item.name}
                                 value={selected}
                                 renderOption={(params, value) => <CoinOption {...params} option={value} onSelect={() => setSelected(value)}/>}
                                 renderInput={(params) => <CoinSearchbar {...params}></CoinSearchbar>}/>
                    <Button>
                        Add
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    </>
}

function CoinOption({option, onSelect}: any) {
    return <ListItem key={option.item.id} onClick={onSelect} style={{cursor: "pointer"}}>
        <ListItemIcon>
            <Avatar src={option.item.thumb} alt={option.item.name} />
        </ListItemIcon>
        <ListItemText primary={option.item.name} />
    </ListItem>
}
function CoinSearchbar(props: any) {
    function handleSearchbar (e) {
        console.log(e)
    }

    return <TextField {...props} placeholder="Search cryptocurrencies" onChange={e => handleSearchbar(e)}/>
}