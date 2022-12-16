import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    //declare posts as a variable and set it to the value of the posts state
    //useSelector is a hook that allows us to access the redux store
    //the state.posts is the name of the reducer in the index.js file
    //Why posts is undefined?  Because the reducer is not being called.
    //The reducer is not being called because the reducer is not being imported into the index.js file.
    //how to import the reducer into the index.js file?
    //import reducers from './reducers';
    //which index.js file?
    //the index.js file in the reducers folder
    
    const classes = useStyles();
    console.log(posts);

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;