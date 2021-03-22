import React from "react";

import readeSvg from "../../assets/img/readed.svg";
import noReade from "../../assets/img/noreaded.svg";

const IconReaded = ({isMe = false, isReaded}) => {
    return (
        (isMe && isReaded) ?
            (<img className='message__icon-reade' src={readeSvg} alt="reader Icon"/>) :
            (isMe && !isReaded) && (
                <img className='message__icon-reade message__icon-reade--no' src={noReade} alt="reader Icon"/>)
    )
}
export default IconReaded;