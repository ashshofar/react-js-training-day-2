import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
});


class FolderList extends Component {
    
    checkFavorite = (value) => {
        if(value) {
            return <Star/>
        } 
    
        return <StarBorder/>
    }

    createList = item => {
        return <ListItem key={item.id}>
                    <img 
                        src={item.image_url} 
                        className="rounded-circle"
                        height="80"
                        width="80"
                        alt={item.name}
                        onClick={() => this.props.onView(item)}
                    />
                    <ListItemText primary={item.name} />
                    <div className="d-flex flex-row">
                        <div className="p-2">
                            <Button onClick={() => this.props.patchUser(item)}>
                                {this.checkFavorite(item.favorite)}
                            </Button>
                        </div>
                        <div className="p-2">
                            <Button onClick={() => this.props.deleteUser(item.id)}>
                                DELETE
                            </Button>
                        </div>
                    </div>
                </ListItem>
    }

    render() {
        const users = this.props.users;
        
        if(users) {
            const listItems = users.map(this.createList)
            
            return <List>{listItems}</List>
        }
    }
}

FolderList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);