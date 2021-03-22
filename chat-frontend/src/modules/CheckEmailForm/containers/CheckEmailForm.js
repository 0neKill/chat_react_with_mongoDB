import React, {useEffect, useRef, useState} from "react";

import CheckEmailForm from '../component/CheckEmailForm';
import {userApi} from '../../../utils/api';


const renderTextInfo = ({hash, verified}) => {
    if (hash) {
        if (verified) {
            return {
                status: 'success',
                title: 'Готово!',
                message: 'Аккаунт успешно подтвержден!',
            };
        } else {
            return {
                status: 'error',
                title: 'Ошибка',
                message: 'Вы указали несуществующий или неверный хеш.',
            }
        }
    } else {
        return {
            status: 'info',
            title: 'Подтвердите почту',
            message: 'Ссылка с подтверждением аккаунта отправлена на E-Mail.',
        }
    }
}

const CheckEmail = (props) => {
    const hashRef = useRef(props.location.search.split('?hash=')[1]);
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(!!hashRef.current);
    const [info, setInfo] = useState(renderTextInfo({hash: hashRef.current, verified}));

    const setState = ({verified, loading}) => {
        setLoading(loading);
        setVerified(verified);
        setInfo(renderTextInfo({hash: hashRef.current, verified}))
    }

    useEffect(() => {
        if (hashRef.current) {
            userApi.verifyUser(hashRef.current)
                .then(() => {
                    setState({
                        verified: true,
                        loading: false,
                    })
                })
                .catch(() => {
                    setState({
                        verified: false,
                        loading: false,
                    })
                })
        }
    }, []);

    return <CheckEmailForm
        {...props}
        info={info}
        verified={verified}
        loading={loading}
    />
};
export default CheckEmail;




