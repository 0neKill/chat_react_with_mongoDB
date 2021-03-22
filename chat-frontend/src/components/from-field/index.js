import React from 'react';
import {Form, Input} from "antd";
import {validateField} from "../../utils/helpers";

const FromField = ({touched, errors, handleChange, handleBlur, prefix, placeholder, id,type}) => {
    return (
        <Form.Item
            validateStatus={validateField(id, touched, errors)}
            help={touched[id] && errors[id]}
            hasFeedback
        >
            <Input
                id={id}
                prefix={prefix}
                placeholder={placeholder}
                size='large'
                onChange={handleChange}
                onBlur={handleBlur}
                type={type}
            />
        </Form.Item>
    );
};

export default FromField;