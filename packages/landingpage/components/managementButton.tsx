import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle, FormControlLabel, Grid,
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
import {useSession} from "next-auth/react";

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
    const [allowHighlight, setAllowHighlight] = useState(true)

    async function addEntry() {
        if (!selected) return

        const record = {
            name: selected.name,
            thumbnail: selected.thumb,
            coinId: selected.id,
            allowHighlight,
        }
        const response = await axios.post('api/records', {record})
        if (response.status === 201) {
            setOpen(false)
            //reset init values
            setSelected(null)
            setAllowHighlight(true)

            //should use flux instead ghahaha
            const newRecordEvent = new CustomEvent("new-record")
            document.dispatchEvent(newRecordEvent)
        }
    }

    useEffect(() => {
      axios.get(`https://api.coingecko.com/api/v3/search/trending`).then(res => {
          setSuggestions(res.data.coins.map((i: any) => i.item))
      })
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
                        <Box mb={2}>
                            <Autocomplete fullWidth
                                          options={suggestions}
                                          getOptionLabel={option => option.name || ''}
                                          value={selected}
                                          renderOption={(params, value) => <CoinOption {...params} option={value} onSelect={() => setSelected(value)}/>}
                                          renderInput={(params) => <CoinSearchbar {...params}/>}/>
                        </Box>
                        <Box mb={2}>
                            <FormControlLabel control={<Checkbox defaultChecked value={allowHighlight} onChange={() => setAllowHighlight(prevState => !prevState)} />} label="Can be highlighted" />
                        </Box>
                        <Box mb={2}>
                            <Button onClick={addEntry}>
                                Add
                            </Button>
                        </Box>
                </Box>
            </DialogContent>
        </Dialog>
    </>
}

function CoinOption({option, onSelect}: any) {
    return <ListItem key={option.id} onClick={onSelect} style={{cursor: "pointer"}}>
        <ListItemIcon>
            <Avatar src={option.thumb} alt={option.name} />
        </ListItemIcon>
        <ListItemText primary={option.name} />
    </ListItem>
}
function CoinSearchbar(props: any) {
    return <TextField {...props} placeholder="Search cryptocurrencies" />
}