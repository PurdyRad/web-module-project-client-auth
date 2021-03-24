import React, {useState} from 'react';
import axios from 'axios';

const initialFormValues = {
    name: '',
    password: '',
}

const Login = (props) => {
    const [formValues, setFormValues]= useState(initialFormValues);


    const changer = e => {
        setFormValues({
            formValues: {...formValues,
                [e.target.name]: e.target.value
            }
        });
    };

    let login = e => {
        console.log('e', e)
        e.preventDefault();

        axios.post('http://localhost:5000/api/login', { username: 'Lambda School', password: 'i<3Lambd4' })
        .then(res => {
            console.log('resLogin:', res)
            localStorage.setItem('token', res.data.payload)
            props.history.push('/protected')
        })
        .catch(err => {
            console.log('err:', err.response)
        })
    };

    return (
        <div>
            <form onSubmit={login}>
                <input 
                type='text' 
                value={formValues.username} 
                onChange={changer}
                placeholder='Username...' />

                <input 
                type='password' 
                value={formValues.password} 
                onChange={changer}
                placeholder='Password..' />
                <button>Gain Instant Access!</button>
            </form>
        </div>
    );
}

export default Login
