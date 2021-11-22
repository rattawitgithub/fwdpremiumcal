import React, { useEffect } from 'react';
import Page from 'src/components/Page';
import {
  makeStyles,
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';

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

  const history = useSelector(state => Object.values(state.history));
  const currentUserId = useSelector(state => state.auth.userId);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  return (
    <Page className={classes.root} title="Calculation">
      <Container maxWidth={false}>
        <Box mb={2}>
          <Typography color="textPrimary" variant="h4">
            การคำนวณที่ผ่านมา
          </Typography>

          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {history &&
              history.map(row => {
                const {
                  baseAnnualPremium,
                  baseSumAssured,
                  paymentFrequencyCd,
                  planCode,
                  productFamilyCd,
                  productId,
                  productTypeCd
                } = row.result.quotationProductList[0];

                return (
                  <React.Fragment key={row.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Plan Code :{' '}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {planCode}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Product Id :{' '}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {productId}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Product Type Cd :{' '}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {productTypeCd}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Product Family Cd :{' '}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {productFamilyCd}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Payment Frequency Cd :{' '}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {paymentFrequencyCd}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Base Sum Assured :{' '}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {baseSumAssured}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Base Annual Premium :{' '}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {baseAnnualPremium}
                          </Typography>
                        }
                      />
                    </ListItem>

                    <Divider component="li" />
                  </React.Fragment>
                );
              })}
          </List>
        </Box>
      </Container>
    </Page>
  );
};

export default History;
