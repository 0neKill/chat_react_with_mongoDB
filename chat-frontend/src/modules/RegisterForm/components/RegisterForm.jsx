import React from "react";
import {Form} from "antd";
import {Link} from "react-router-dom";
import {UserOutlined, LockOutlined, MailOutlined, InfoCircleOutlined} from '@ant-design/icons';

import {Block, Button} from "../../../components";
import {FromField} from "../../../components";


const RegisterForm = (props) => {
    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props;
    const success = false;
    return (
        <>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <Block>
                {
                    !success ? (
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{remember: true}}
                            >
                                <FromField
                                    id='email'
                                    prefix={<MailOutlined className="site-form-item-icon"/>}
                                    placeholder="E-Mail"
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <FromField
                                    id='fullname'
                                    prefix={<UserOutlined className="site-form-item-icon"/>}
                                    placeholder="Ваше имя"
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <FromField
                                    id='password'
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    placeholder="Пароль"
                                    type="password"
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <FromField
                                    id='re_password'
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    placeholder="Повторите пароль"
                                    type="password"
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <Form.Item>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button">Регистрация</Button>
                                </Form.Item>
                                <Link className='auth__register-link' to='/login'>Войти в аккаунт</Link>
                            </Form>
                        ) :
                        (
                            <div className='auth__success-block'>
                                <div>
                                    <InfoCircleOutlined style={{fontSize: '50px', color: '#08c'}}/>
                                </div>
                                <h2>Подтвердите свой аккаунт</h2>
                                <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                            </div>
                        )
                }
            </Block>
        </>
    );
}

export default RegisterForm;