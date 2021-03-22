import {withFormik} from 'formik';
import {connect} from 'react-redux';

import LoginForm from '../components/LoginForm';
import {userActions} from '../../../redux/actions';
import validate from '../../../utils/validations';


const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({email: '', password: ''}),
    validate: values => {
        const errors = {};
        validate({errors, values, isAuth: true});
        return errors;
    },
    handleSubmit: (values, {props, setSubmitting}) => {
        props.fetchUserLogin(values)
            .then(({status}) => {
                if (status === 'success') {
                    props.history.push('/');
                }
                setSubmitting(false);
            })
            .catch(err => {
                setSubmitting(false);
            });
    }
    ,
    displayName: 'LoginForm',
})(LoginForm);


export default connect(null, (dispatch => ({
    fetchUserLogin: (data) => dispatch(userActions.fetchUserLogin(data))
})))(MyEnhancedForm);

