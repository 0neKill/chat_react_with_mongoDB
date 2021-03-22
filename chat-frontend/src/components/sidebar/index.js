import React from 'react';
import {FormOutlined, TeamOutlined} from "@ant-design/icons";
import {Button, Modal, Form, Select,} from "antd";
import TextArea from "antd/es/input/TextArea";

import './SideBar.scss';

import {Dialogs} from "../../containers";


const Sidebar = ({
                     userData,
                     visible,
                     loading,
                     users,
                     valueMessage,
                     valueUser,
                     handleVisible,
                     handleChange,
                     handleSearch,
                     handleSetMessage,
                     handleCreate
                 }) => {
    const {Option} = Select;
    const options = users.map(user => <Option key={user._id}>{user.fullname} (email: {user.email})</Option>);
    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <div>
                    <TeamOutlined/>
                    <span>Список диалогов</span>
                </div>
                <Button type="ghost" shape="circle" icon={<FormOutlined/>} onClick={handleVisible}/>
            </div>
            <div className="chat__sidebar-dialogs">
                <Dialogs userData={userData}/>
            </div>
            <Modal
                title="Создать диалог"
                visible={visible}
                onCancel={handleVisible}
                footer={[
                    <Button key="back" onClick={handleVisible}>
                        Закрыть
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        disabled={!valueMessage}
                        loading={loading}
                        onClick={handleCreate}
                    >
                        Создать
                    </Button>,
                ]}>
                <Form className="add-dialog-form"   layout="vertical">
                    <Form.Item
                        label="Введите имя пользователя или E-Mail"

                    >
                        <Select
                            showSearch
                            value={valueUser}
                            placeholder='Введите имя пользователя'
                            style={{ width: '100%' }}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            notFoundContent={null}

                            onSearch={handleSearch}
                            onChange={handleChange}
                        >
                            {options}
                        </Select>
                    </Form.Item>
                    {
                        valueUser &&
                        <Form.Item label="Введите сообщение">
                            <TextArea
                                autosize={{ minRows: 3, maxRows: 10 }}
                                value={valueMessage}
                                onChange={handleSetMessage}
                            />
                        </Form.Item>
                    }
                </Form>
            </Modal>
        </div>
    );
};

export default Sidebar;