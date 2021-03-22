import React, {useEffect} from "react";
import {Upload, Modal} from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const UploadFile = ({attachments, removeAttachment}) => {
    const [state, setState] = React.useState({
        previewVisible: false,
        previewImage: '',
        fileList: attachments
    });
    useEffect(() => {
        setState(prevState => ({
            ...state,
            fileList: attachments
        }));
    }, [attachments]);

    const handleCancel = () => setState(prevState => ({...state, previewVisible: false}));

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setState((prevState) => ({
            ...prevState,
            previewImage: file.url || file.preview,
            previewVisible: true
        }));

    };

    const handleChange = ({fileList}) => setState(prevState => ({...state, fileList}));

    const {previewVisible, previewImage, fileList} = state;

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(file)=>removeAttachment(file.uid)}
            >
            </Upload>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </>
    );
}
export default UploadFile;