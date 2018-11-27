import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

function DetailUser(props) {
    const { classes } = props;
    
    return (
        <div>
            <Button onClick={() => props.cancelView()}>
                Back
            </Button>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.user.data.image_url}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.user.data.name} - {props.user.data.phone}
                        </Typography>
                        <Typography component="p">
                            {props.user.data.address}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

DetailUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailUser);