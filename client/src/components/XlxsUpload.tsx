import React, { useState } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Modal, Upload } from 'antd';

const { Dragger } = Upload;


const XlxsUpload: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState()
const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:3000/upload',
  onChange(info) {
    const { status, response} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully. ${response?.message}`);
      setData(response?.data)
      setIsModalOpen(true)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed. ${response?.message}`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return(
  <>
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
   <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
   <ReactJson src={data} displayObjectSize={false}/>
 </Modal>
 </>)
};

export default XlxsUpload;
