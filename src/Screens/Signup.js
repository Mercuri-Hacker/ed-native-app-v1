import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost/8000';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

import CustomInput from '../CustomInput/CustomInput';

const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  mobile_number: yup
    .string()
    // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Enter a valid phone number',
    )
    .required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),

  job_role: yup.string().required('Job Role is required'),

  status: yup.string().required('Status is required'),
});

const CreateEmployee = () => {
  function handleCrateEmployee(userObject) {
    axios
      .post('/user/create', userObject)
      .then(res => {
        debugger;
        console.log(res.data);
      })
      .catch(error => {
        debugger;
        console.log(error);
      });
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Text>Create Employee</Text>

          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              name: '',
              email: '',
              mobile_number: '',
              job_role: '',
              status: '',
            }}
            onSubmit={values => {
              console.log(values);
              handleCrateEmployee(values);
            }}>
            {({handleSubmit, isValid, values}) => (
              <>
                <Field component={CustomInput} name="name" placeholder="Name" />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="mobile_number"
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                />
                {/* <Field
                  component={CustomInput}
                  name="address"
                  placeholder="Address"
                /> */}
                <Field
                  component={CustomInput}
                  name="job_role"
                  placeholder="Job Role"
                />
                <Field
                  component={CustomInput}
                  name="status"
                  placeholder="Status"
                  // secureTextEntry
                />

                <Button
                  onPress={handleSubmit}
                  title="CREATE"
                  disabled={!isValid || values.email === ''}
                />
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#000',
  },
});

export default CreateEmployee;
