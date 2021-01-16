import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './DestinationList.css';

class DestinationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Grid item xs={12} spacing={2}>
                    <Typography variant="h4" align="center" className="Title">
                        Your Destination List
                    </Typography>
                    {this.props.desList.length == 0 
                    ?   <div className="EmptyList">List Empty</div>
                    :   <List>
                            {this.props.desList.map((item) => (
                                <ListItem className="ListItem">
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
                                        <IconButton edge="end" onClick={() => this.props.removeFunc(item.placeID)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    }
                </Grid>
            </div>
        )
    }
}

export default DestinationList;
