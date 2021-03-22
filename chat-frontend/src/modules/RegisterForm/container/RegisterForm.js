import {withFormik} from 'formik';
import {connect} from 'react-redux';

import RegisterForm from '../components/RegisterForm';
import validate from '../../../utils/validations';
import {userActions} from "../../../redux/actions";

const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({email: '', fullName: '', password: '', re_password: ''}),
    validate: values => {
        const errors = {};
        validate({errors, values, isAuth: false});
        return errors;
    },
    handleSubmit: (values, {props, setSubmitting}) => {
        props.fetchUserRegister(values)
            .then((data) => {
                if (data.status === 'success') {
                    props.history.push('/register/verify')
                }
            })
            .catch(() => {
                setSubmitting(false);
            });
    },
    displayName: 'RegisterForm',
})(RegisterForm);

export default connect(null, (dispatch) => ({
    fetchUserRegister: (data) => dispatch(userActions.fetchUserRegister(data)),
}))(MyEnhancedForm);
