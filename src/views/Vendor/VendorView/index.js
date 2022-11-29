import * as React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory, useParams } from "react-router-dom";
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    // root: {
    //   flexGrow: 1,
    // },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const useStyles1 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const itemData = [{
    img:'https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg?w=2000',
    title:'Shop'
},{
    img:'https://upload.wikimedia.org/wikipedia/commons/8/8e/Shop.svg',
    title:'Shop'
},{
    img:'https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg?w=2000',
    title:'Shop'
},{
    img:'https://upload.wikimedia.org/wikipedia/commons/8/8e/Shop.svg',
    title:'Shop'
},{
    img:'https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg?w=2000',
    title:'Shop'
},{
    img:'https://upload.wikimedia.org/wikipedia/commons/8/8e/Shop.svg',
    title:'Shop'
},{
    img:'https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg?w=2000',
    title:'Shop'
},{
    img:'https://upload.wikimedia.org/wikipedia/commons/8/8e/Shop.svg',
    title:'Shop'
},]

export default function VendorsView() {
  let history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const classes1 = useStyles1();

  const emptyText = 'text';

  return (
    <AdminLayout>
      {/* <Row className="overview-sec">
        <Col sm="6">
          <h3>{id}</h3>
        </Col>
      </Row> */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Grid item xs={5}>
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid container spacing={2}>
            <Grid container item xs={12}>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>{id}</Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper className={classes.paper}>571 Pavilions Ln, Sacramento, California, United States, 95825</Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.  <strong>898998989 / 78878878878</strong>
                            </Paper>
                            <Paper className={classes.paper}>
                                <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
                                    <Button>View Photos</Button>
                                    <Button>Send Feedback</Button>
                                    <Button>Send Email</Button>
                                    <Button>Delete Shop</Button>
                                </ButtonGroup>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes1.root}>
                        <ImageList className={classes1.imageList} cols={2}>
                            {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                                <img src={item.img} alt={item.title} />
                                <ImageListItemBar
                                title={item.title}
                                classes1={{
                                    root: classes1.titleBar,
                                    title: classes1.title,
                                }}
                                actionIcon={
                                    <IconButton aria-label={`star ${item.title}`}>
                                    <StarBorderIcon className={classes1.title} />
                                    </IconButton>
                                }
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                        </div>

                </Grid>
            </Grid>
        </Grid>
      </Paper>
    </AdminLayout>
  );
}
