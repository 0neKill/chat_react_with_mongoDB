import React from 'react';

import {Block} from '../../../components';
import {Result, Button, Spin} from "antd";

const CheckEmailForm = ({info, verified, loading, history}) => {
    return (
        <Block>
            {
                !loading ?
                    <Result
                        status={info.status}
                        title={info.title}
                        subTitle={info.message}
                        extra={[
                            info.status === 'success' && verified &&
                            <Button type="primary" key="console" onClick={() => history.push('/login')}>
                                Войти
                            </Button>,
                        ]}
                    /> :
                    <Spin/>
            }
        </Block>
    );
};
export default CheckEmailForm;