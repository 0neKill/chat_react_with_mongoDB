import React from "react";
import {Link} from 'react-router-dom';
import {Form, Input} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import {validateField} from '../../../utils/helpers';
import {Block, Button} from "../../../components";


const LoginForm = (props) => {
    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid
    } = props;
    return (
        <>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                >
                    <Form.Item
                        validateStatus={validateField('email', touched, errors)}
                        help={touched.email && errors.email}
                        hasFeedback
                    >
                        <Input
                            id='email'
                            size='large'
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Ваше имя"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField('password', touched, errors)}
                        help={touched.password && errors.password}
                        hasFeedback
                    >
                        <Input
                            id='password'
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            size='large'
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item>
                        {isSubmitting && !isValid && <span>Ошибка!</span>}
                        <Button
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">Войти в аккаунт</Button>
                    </Form.Item>

                    <Link className='auth__register-link' to='/register'>Зарегистрироваться</Link>
                </Form>
            </Block>
        </>
    );
};

export default LoginForm;