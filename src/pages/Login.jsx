import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import './Auth.scss';

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore(s => s.login);
    const signup = useAuthStore(s => s.signup);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        const result = login(form.email, form.password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    // 테스트 계정으로 빠른 로그인 (훅 규칙 준수 - getState() 사용)
    const handleTestLogin = () => {
        signup({ name: '테스트 사용자', email: 'test@aesop.com', password: 'test1234' });
        const result = login('test@aesop.com', 'test1234');
        if (result.success) navigate('/mypage');
    };

    return (
        <div className="auth-page">
            <div className="auth-page__header-space" />
            <div className="auth-page__inner">
                <h1 className="auth-page__title optima-40">로그인</h1>

                <form className="auth-page__form" onSubmit={handleSubmit}>
                    <div className="auth-page__field">
                        <label className="suit-14-m">이메일</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="suit-16-r"
                            placeholder="이메일을 입력하세요"
                            required
                        />
                    </div>
                    <div className="auth-page__field">
                        <label className="suit-14-m">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="suit-16-r"
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    {error && <p className="auth-page__error suit-14-m">{error}</p>}

                    <button type="submit" className="auth-page__submit suit-18-m">
                        로그인
                    </button>
                </form>

                <div className="auth-page__links suit-14-m">
                    <Link to="/find-account">계정 찾기</Link>
                    <span>|</span>
                    <Link to="/signup">회원가입</Link>
                </div>

                <button className="auth-page__test-btn suit-14-m" onClick={handleTestLogin}>
                    테스트 계정으로 로그인
                </button>
            </div>
        </div>
    );
};

export default Login;
