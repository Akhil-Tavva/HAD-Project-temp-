import React from 'react'
import {Form, Button, Input} from 'antd'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../redux/alertsSlice'
// FORGOT PASSWORD
import AsyncStorage from '@react-native-async-storage/async-storage'

function Login() { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('http://localhost:8081/auth/login', values);
            dispatch(hideLoading());
            console.log('Response data success:', response.data);

            if (response.data && response.data.title==='Success') {
                toast.success(response.data.message);
                toast("Redirecting to home page");
                console.log('Setting user details:',response.data.payload.role)
                AsyncStorage.setItem('User Details', response.data.payload)
                AsyncStorage.setItem("token", response.data.payload.token);
                if(response.data.payload.role === 'ADMIN'){
                    navigate("/admin");
                }
            } 
            else {
                console.log('Response data error:', response.data);
                toast.error(response.data && response.data.message ? response.data.message : "Unknown error occurred");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Something went wrong");
        }
    };
    function handleupdate(){
        navigate("/UpdatePassword");
    }
    return (
        <div className='auth'>
            <div className='auth-form card p-3'>
                <h1 className='card-title'>ForgetPassword</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email'/>
                    </Form.Item>
                    <Button className='primary-button my-2' htmlType='submit' onClick={handleupdate}> Send Otp </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login

// {/* <Form name="basic" labelCol={{ span: 8,}} wrapperCol={{ span: 16,}} style={{ maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinish} autoComplete="off" > */}
//                     {/* <Form.Item label="Username" name="username"
//                                 rules={[{
//                                         required: true,
//                                         message: 'Please input your username!',
//                                     },]} >
//                                     <Input placeholder='Username'/>
//                     </Form.Item>
                    
//                     <Form.Item label="Password" name="password" 
//                                 rules={[{
//                                         required: true,
//                                         message: 'Please input your password!',
//                                     },]} >
//                                     <Input.Password placeholder='Password'/>
//                     </Form.Item> */}