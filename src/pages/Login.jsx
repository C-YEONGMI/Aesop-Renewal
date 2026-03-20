import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import './Auth.scss';

const TEST_ACCOUNT = {
    userId: 'testuser',
    name: '테스트 사용자',
    email: 'test@aesop.com',
    password: 'test1234',
    phone: '01012345678',
};

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const ensureTestAccount = useAuthStore((state) => state.ensureTestAccount);
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));

        if (error) {
            setError('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        const result = login(form.identifier, form.password);

        if (result.success) {
            navigate('/');
            return;
        }

        setError(result.message);
    };

    const handleTestLogin = () => {
        setError('');

        ensureTestAccount(TEST_ACCOUNT);
        setForm({ identifier: TEST_ACCOUNT.userId, password: TEST_ACCOUNT.password });

        const result = login(TEST_ACCOUNT.userId, TEST_ACCOUNT.password);

        if (result.success) {
            navigate('/mypage');
            return;
        }

        setError(result.message || '테스트 계정 로그인에 실패했습니다.');
    };

    return (
        <div className="auth-page">
            <div className="auth-page__header-space" />
            <div className="auth-page__inner">
                <h1 className="auth-page__title optima-40">로그인</h1>

                <form className="auth-page__form" onSubmit={handleSubmit}>
                    <div className="auth-page__field">
                        <label className="suit-14-m" htmlFor="login-identifier">
                            아이디 또는 이메일
                        </label>
                        <input
                            id="login-identifier"
                            type="text"
                            name="identifier"
                            value={form.identifier}
                            onChange={handleChange}
                            className="suit-16-r"
                            placeholder="아이디 또는 이메일을 입력해 주세요"
                            required
                        />
                    </div>

                    <div className="auth-page__field">
                        <label className="suit-14-m" htmlFor="login-password">
                            비밀번호
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="suit-16-r"
                            placeholder="비밀번호를 입력해 주세요"
                            required
                        />
                    </div>

                    {error ? <p className="auth-page__error suit-14-m">{error}</p> : null}

                    <button type="submit" className="auth-page__submit suit-18-m">
                        로그인
                    </button>
                </form>

                <div className="auth-page__links suit-14-m">
                    <Link to="/find-account">계정 찾기</Link>
                    <span>|</span>
                    <Link to="/signup">회원가입</Link>
                </div>

                <button type="button" className="auth-page__test-btn suit-14-m" onClick={handleTestLogin}>
                    테스트 계정으로 로그인
                </button>
            </div>
        </div>
    );
};

export default Login;
