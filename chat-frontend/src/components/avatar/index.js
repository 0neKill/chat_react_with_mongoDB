import React from "react";
import PropsTypes from 'prop-types';

import './Avatar.scss';

import {generateAvatarFromHash} from '../../utils/helpers'


const Avatar = ({user}) => {
    if (user.avatar) {
        return <img className='avatar' src={user.avatar} alt={`${user.fullname} avatar`}/>;
    } else {
        const {color, colorLighten} = generateAvatarFromHash(user._id);
        const firstChar = user.fullname.charAt(0).toUpperCase();
        return (
            <div style={{background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`}}
                 className='avatar avatar--symbol'>{firstChar}</div>
        )
    }
};

Avatar.propTypes = {
    user: PropsTypes.object,
};

export default Avatar;