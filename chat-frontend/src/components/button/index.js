import React from 'react';
import PropsTypes from 'prop-types';
import classNames from 'classnames';
import {Button as BaseButton} from 'antd';

import './Button.scss';

const Button = (props) => {
    return <BaseButton  {...props} className={classNames('button', props.className,{'button--large':props.size==='large'})}/>
};

Button.propTypes = {
    className: PropsTypes.string
}

export default Button;