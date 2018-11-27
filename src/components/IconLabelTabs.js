import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const styles = {
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },
};

class IconLabelTabs extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <Paper square className={classes.root}>
                <Tabs
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    fullWidth
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    <Tab icon={<PhoneIcon />} label="PHONE BOOKS" />
                    <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                    <Tab icon={<PersonPinIcon />} label="ADD CONTACT" />
                </Tabs>

                {this.props.children}
            </Paper>
        );
    }
}

IconLabelTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelTabs);