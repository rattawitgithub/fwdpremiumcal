import React from 'react';
import Page from 'src/components/Page';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider
} from '@material-ui/core';
import { useSelector } from 'react-redux';

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

const CalculationDisplay = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const calculated = useSelector(state => state.selected.calculated);
  console.log(calculated.result.quotationProductList);

  return (
    <Page className={classes.root} title="Calculation">
      <Container maxWidth={false}>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {calculated.result.quotationProductList &&
                calculated.result.quotationProductList.map(row => (
                  <React.Fragment key={row.productId}>
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
                            {row.planCode}
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
                            {row.productId}
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
                            {row.productTypeCd}
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
                            {row.productFamilyCd}
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
                            {row.paymentFrequencyCd}
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
                            {row.baseSumAssured}
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
                            {row.baseAnnualPremium}
                          </Typography>
                        }
                      />
                    </ListItem>

                    <Divider component="li" />
                  </React.Fragment>
                ))}
            </List>

            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={() => {
                  navigate('/app/calpremium');
                }}
              >
                คำนวณเบี้ยใหม่
              </Button>
            </Box>
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={() => {
                  navigate('/app/calsuminsured');
                }}
              >
                คำนวณทุนใหม่
              </Button>
            </Box>
          </Container>
        </Box>
      </Container>
    </Page>
  );
};

export default CalculationDisplay;
