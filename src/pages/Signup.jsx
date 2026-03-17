import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import './Auth.scss';

const Signup = () => {
    const navigate = useNavigate();
    const signup = useAuthStore(s => s.signup);
    const login = useAuthStore(s => s.login);
    const [form, setForm] = useState({ name: '', email: '', password: '', passwordConfirm: '', phone: '' });
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        if (form.password !== form.passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.'); return;
        }
        const result = signup(form);
        if (result.success) {
            login(form.email, form.password);
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page__header-space" />
            <div className="auth-page__inner">
                <h1 className="auth-page__title optima-40">회원가입</h1>

                <form className="auth-page__form" onSubmit={handleSubmit}>
                    {[
                        { label: '이름', name: 'name', type: 'text', placeholder: '이름을 입력하세요' },
                        { label: '이메일', name: 'email', type: 'email', placeholder: '이메일을 입력하세요' },
                        { label: '연락처', name: 'phone', type: 'tel', placeholder: '연락처를 입력하세요' },
                        { label: '비밀번호', name: 'password', type: 'password', placeholder: '비밀번호를 입력하세요' },
                        { label: '비밀번호 확인', name: 'passwordConfirm', type: 'password', placeholder: '비밀번호를 다시 입력하세요' },
                    ].map(field => (
                        <div key={field.name} className="auth-page__field">
                            <label className="suit-14-m">{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                className="suit-16-r"
                                placeholder={field.placeholder}
                                required
                            />
                        </div>
                    ))}

                    {error && <p className="auth-page__error suit-14-m">{error}</p>}

                    <button type="submit" className="auth-page__submit suit-18-m">
                        회원가입
                    </button>
                </form>

                <div className="auth-page__links suit-14-m">
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
