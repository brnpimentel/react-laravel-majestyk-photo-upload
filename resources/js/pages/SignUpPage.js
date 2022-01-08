import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from "./../services/auth";

export default function SignUpPage() {
    let navigate = useNavigate();

    const [loading, setLoading] = useState();
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
         name: '',
         email: '',
         password: '',
         password_confirmation: ''
     });

     const handleChange = (evt) => {
         setForm({
             ...form,
             [evt.target.name]: evt.target.value
         });
     }
     
    const handleSubmit = evt => {
        evt.preventDefault();
        setLoading(true)

        register(form)
        .then(() => {
            alert('Successfully registered!')
            navigate('/', { replace: true })
        })
        .catch(e => {
            setLoading(false)
            // console.log(e);
            e.response.status == 422 && e.response.data.errors && setErrors(e.response.data.errors)
        });
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="mt-2 space-y-2">
                
                <input type="text" name="name" placeholder="your name" value={form.name} onChange={handleChange} autoFocus required></input>
                { errors.name && (<small className="error-msg">{errors.name.join(', ')}</small>)}
                
                <input type="email" name="email"  placeholder="your email" value={form.email} onChange={handleChange} required></input>
                { errors.email && (<small className="error-msg">{errors.email.join(', ')}</small>)}
                
                <input type="password" name="password"  placeholder="your password" value={form.password} onChange={handleChange} required></input>
                { errors.password && (<small className="error-msg">{errors.password.join(', ')}</small>)}
                
                <input type="password" name="password_confirmation" placeholder="confirm your password" value={form.password_confirmation} onChange={handleChange} required></input>
                { errors.password_confirmation && (<small className="error-msg">{errors.password_confirmation.join(', ')}</small>)}

                <button type="submit" className="block btn">{ loading && 'Loading...' || 'Register' }</button>
        
            </form>
        </div>
    );
}
