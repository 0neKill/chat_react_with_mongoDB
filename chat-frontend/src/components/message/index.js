import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Popover, Button, Image} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import reactStringReplace from 'react-string-replace';
import {Emoji} from "emoji-mart";

import waveSvg from '../../assets/img/wave.svg';
import pauseSvg from '../../assets/img/pause.svg';
import playSvg from '../../assets/img/play.svg';

import './Message.scss';

import {Time, IconReaded, Avatar} from "../";
import {convertCurrentTime} from "../../utils/helpers/";


const MessageAudio = ({audio}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioElem = useRef(0);

    useEffect(() => {
        audioElem.current.addEventListener('durationchange', e => {
            setCurrentTime(e.target.duration);
        });
        audioElem.current.addEventListener('playing', e => {
            setIsPlaying(true);
        });
        audioElem.current.addEventListener('pause', e => {
            setIsPlaying(false);
        });
        audioElem.current.addEventListener('ended', e => {
            setCurrentTime(e.target.duration);
            setProgress(0);
            setIsPlaying(false);
        });
        audioElem.current.addEventListener('timeupdate', e => {
            const duration = (e.target && e.target.duration) || 0;
            setCurrentTime(e.target.currentTime);
            setProgress((e.target.currentTime / duration) * 110);
        });
    }, []);

    const audioPlay = () => {
        if (!isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    }
    return (
        <div className="message__audio">
            <audio ref={audioElem} src={audio} preload='auto'/>
            <div className="message__audio-progress" style={{width: `${progress}%`}}></div>
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={audioPlay}>
                        {isPlaying ? <img src={pauseSvg} alt="Pause"/> :
                            <img src={playSvg} alt="Play"/>}
                    </button>
                </div>
                <div className="message__audio-wave"><img src={waveSvg} alt="Wave svg"/></div>
                <span className='message__audio-duration'>{convertCurrentTime(currentTime)}</span>
            </div>
        </div>
    );
};

const Message = ({_id, avatar, user, text, date, attachments, isMe, isRead, isTyping, audio, handleRemoveMessage}) => {
    return (
        <div className={
            classNames('message',
                {
                    'message--isme': isMe,
                    'message--is-typing': isTyping,
                    'message--is-audio': audio,
                    'message--image': (!text && attachments && !audio) && attachments.length === 1
                })
        }>
            <div className="message__content">
                <IconReaded isMe={isMe} isReaded={isRead}/>
                {
                    isMe && <Popover content={<Button onClick={handleRemoveMessage}>Удалить</Button>} trigger="click">
                        <div className='message__icon-more'>
                            <EllipsisOutlined style={{fontSize: '10px'}}/>
                        </div>
                    </Popover>
                }
                <div className="message__avatar">
                    <Avatar user={user}/>
                </div>
                <div className="message__info">
                    {(audio || text || isTyping) &&
                    <div className='message__bubble'>
                        {text && <p className="message__text">{
                            reactStringReplace(text, /:(.+?):/g, ((match, index) => (
                                <Emoji key={index} emoji={match} size={16} set={'apple'}/>
                            )))
                        }</p>}
                        {
                            isTyping &&
                            <div className="message__typing">
                                <span/>
                                <span/>
                                <span/>
                            </div>
                        }
                        {
                            audio && <MessageAudio audio={audio}/>
                        }
                    </div>
                    }
                    {!audio && attachments.length > 0 && <div className="message__attachments">
                        {
                            attachments.map(item => {
                                return (
                                    <div key={Math.random()} className='message__attachments-item'>
                                        {/*<img src={item.url} alt={item.filename}/>*/}
                                        <Image src={item.url}/>
                                    </div>
                                )
                            })
                        }
                    </div>}
                    {date && <span className="message__date">{<Time date={date}/>}</span>}
                </div>
            </div>
        </div>
    );
};

Message.defaultProps = {
    user: {},
    attachments:[]
}

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.object,
    attachment: PropTypes.array,
    isTyping: PropTypes.bool,
}

export default Message;