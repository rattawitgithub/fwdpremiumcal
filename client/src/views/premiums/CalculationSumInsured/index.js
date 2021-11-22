import React, { useState } from 'react';
import Page from 'src/components/Page';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  makeStyles,
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import fwd from 'src/apis/fwd';
import { useDispatch, useSelector } from 'react-redux';
import { selectCalculation, createHistory } from 'src/actions';

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

const genderValue = [
  { name: 'ชาย', value: 'MALE' },
  { name: 'หญิง', value: 'FEMALE' }
];

const planValue = [
  { name: 'package 1 (benefit 200k)', value: 'T11A20' },
  { name: 'package 2 (benefit 500k)', value: 'T11A50' },
  { name: 'package 3 (benefit 1M)', value: 'T11AM1' }
];

const paymentFrequencyValue = [
  { name: 'รายปี', value: 'YEARLY' },
  { name: 'รายครึ่งปี', value: 'HALFYEARLY' },
  { name: 'ราย 3 เดือน', value: 'QUARTERLY' },
  { name: 'รายเดือน', value: 'MONTHLY' }
];

const CalculationSumInsured = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const calculated = useSelector(state => state.selected.calculated);

  const {
    dob,
    genderCd,
    planCode,
    premiumPerYear,
    paymentFrequency
  } = calculated.calterm;

  const dobDate = moment(dob, 'YYYY-MM-DD').toDate();
  const [selectedDate, setSelectedDate] = useState(dobDate);

  const [loading, setLoading] = useState(false);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleCalculation = async values => {
    await fwd
      .post('getProduct', values)
      .then(res => {
        setLoading(false);

        dispatch(selectCalculation({ calterm: values, result: res.data }));
        dispatch(createHistory({ calterm: values, result: res.data }));
        navigate('/app/display');
      })
      .catch(err => {
        setLoading(false);
      });
  };

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
            <Formik
              initialValues={{
                genderCd: genderCd,
                planCode: planCode,
                premiumPerYear: premiumPerYear,
                paymentFrequency: paymentFrequency
              }}
              validationSchema={Yup.object().shape({
                genderCd: Yup.string()
                  .max(255)
                  .required('กรุณาเลือกเพศ'),
                planCode: Yup.string()
                  .max(255)
                  .required('กรุณาเลือกแผนประกันภัย'),
                premiumPerYear: Yup.number()
                  .integer()
                  .required('กรุณากรอกเบี้ยประกันภัยที่ต้องการ'),
                paymentFrequency: Yup.string()
                  .max(255)
                  .required('กรุณาเลือกงวดการชำระเบี้ย')
              })}
              onSubmit={async (values, { resetForm }) => {
                setLoading(true);
                handleCalculation({
                  ...values,
                  dob: moment(selectedDate).format('YYYY-MM-DD')
                });
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={2}>
                    <Typography color="textPrimary" variant="h4">
                      คำนวนทุนประกันโดยระบุเบี้ยประกัน
                    </Typography>
                  </Box>

                  <Box mb={0}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        label="วันเกิด"
                        disableToolbar
                        autoOk
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Box>

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    error={Boolean(touched.genderCd && errors.genderCd)}
                  >
                    <InputLabel id="genderCdLabel">เพศ</InputLabel>
                    <Select
                      labelId="genderCdLabel"
                      value={values.genderCd}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="genderCd"
                    >
                      {genderValue.map(ddl => (
                        <MenuItem key={ddl.value} value={ddl.value}>
                          {ddl.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.genderCd && errors.genderCd}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    error={Boolean(touched.planCode && errors.planCode)}
                  >
                    <InputLabel id="planCodeLabel">แผนประกันภัย</InputLabel>
                    <Select
                      labelId="planCodeLabel"
                      value={values.planCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="planCode"
                    >
                      {planValue.map(ddl => (
                        <MenuItem key={ddl.value} value={ddl.value}>
                          {ddl.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.planCode && errors.planCode}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    error={Boolean(
                      touched.paymentFrequency && errors.paymentFrequency
                    )}
                  >
                    <InputLabel id="paymentFrequencyLabel">
                      งวดการชำระเบี้ย
                    </InputLabel>
                    <Select
                      labelId="paymentFrequencyLabel"
                      value={values.paymentFrequency}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="paymentFrequency"
                    >
                      {paymentFrequencyValue.map(ddl => (
                        <MenuItem key={ddl.value} value={ddl.value}>
                          {ddl.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.paymentFrequency && errors.paymentFrequency}
                    </FormHelperText>
                  </FormControl>

                  <TextField
                    error={Boolean(
                      touched.premiumPerYear && errors.premiumPerYear
                    )}
                    fullWidth
                    helperText={touched.premiumPerYear && errors.premiumPerYear}
                    label="เบี้ยประกันภัยที่ต้องการ"
                    margin="normal"
                    name="premiumPerYear"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.premiumPerYear}
                    variant="outlined"
                    type="number"
                    inputProps={{
                      maxLength: 30
                    }}
                  />

                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={loading}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      คำนวณ
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Container>
    </Page>
  );
};

export default CalculationSumInsured;
