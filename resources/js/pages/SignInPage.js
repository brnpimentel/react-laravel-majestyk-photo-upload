import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from "./../services/auth";

export default function SignInPage() {
    let navigate = useNavigate();

    const [loading, setLoading] = useState();
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
         email: '',
         password: '',
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

        login(form)
        .then(() => {
            alert('Successfully logged in!')
            navigate('/', { replace: true })
        })
        .catch(e => {
            setLoading(false)
            e.response.status == 422 && e.response.data.errors && setErrors(e.response.data.errors)
        });
    }

    return (
        <div>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit} className="mt-2 space-y-2">
                
             
                <input type="email" name="email"  placeholder="your email" value={form.email} onChange={handleChange} required></input>
                { errors.email && (<small className="error-msg">{errors.email.join(', ')}</small>)}
                
                <input type="password" name="password"  placeholder="your password" value={form.password} onChange={handleChange} required></input>
                { errors.password && (<small className="error-msg">{errors.password.join(', ')}</small>)}
              

                <button type="submit" className="block btn">{ loading && 'Loading...' || 'Enter' }</button>
        
            </form>
        </div>
    );
}
