import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import LocationOnIcon from '@material-ui/icons/LocationOn';



class DestinationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                        Your Destination List
                    </Typography>
                    <List>
                        {this.props.desList.map((item) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <LocationOnIcon style={{ color: "#fc0303" }}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={item.destinationName}
                                    secondary={item.address} 
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => this.props.removeFunc("Hello dd")}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </div>
        )
    }
}

export default DestinationList;
