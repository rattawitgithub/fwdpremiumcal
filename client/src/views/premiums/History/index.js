import React, { useEffect } from 'react';
import Page from 'src/components/Page';
import { makeStyles, Container } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { fetchHistorys } from 'src/actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 310
  }
}));

const History = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistorys());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useSelector(state => state.history);
  console.log(history);

  return (
    <Page className={classes.root} title="Calculation">
      <Container maxWidth={false}></Container>
    </Page>
  );
};

export default History;
