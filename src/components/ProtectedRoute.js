import React, { useEffect } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {hideLoading, showLoading} from '../redux/alertsSlice'
import {setUser} from '../redux/userSlice'

function ProtectedRoute(props) {
    const {user} = useSelector((state)=> state.user)
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const getUser = async() => {
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/users/get-user-info-by-id',{token: localStorage.getItem('token')},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                dispatch(setUser(response.data.data));
            }
            else{
                localStorage.clear();
                navigate("/");
            }
            
        }catch(error){
            dispatch(hideLoading());
            localStorage.clear();
            navigate("/");
        }
    ;}
    
    useEffect(()=>{
        if(!user){
            getUser();
        }
    }, [user]);
    if(localStorage.getItem("token")){
        return props.children;
    }
    else{
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute