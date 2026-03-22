import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { beginSocialLogin, consumeSocialReturnTo } from '../lib/socialAuth';
import './Auth.scss';

const TEST_ACCOUNT = {
    userId: 'testuser',
    name: '테스트 사용자',
    email: 'test@aesop.com',
    password: 'test1234',
    phone: '01012345678',
};

const SOCIAL_LOGIN_OPTIONS = [
    {
        provider: 'kakao',
        label: '카카오로 로그인',
        className: 'auth-page__social-icon-button--kakao',
    },
    {
        provider: 'naver',
        label: '네이버로 로그인',
        className: 'auth-page__social-icon-button--naver',
    },
    {
        provider: 'google',
        label: '구글로 로그인',
        className: 'auth-page__social-icon-button--google',
    },
];

const REMEMBER_IDENTIFIER_KEY = 'aesop-remembered-identifier';

const SOCIAL_LOGO_MAP = {
    kakao: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="32" fill="#FEE500" />
            <path
                d="M32 16C21.5 16 13 22.8 13 31.1c0 5.3 3.4 10 8.6 12.8l-1.8 6.8c-.1.4.4.8.8.5l8.1-5.4c1.1.1 2.2.2 3.3.2 10.5 0 19-6.8 19-15.1S42.5 16 32 16Z"
                fill="#191600"
            />
        </svg>
    ),
    naver: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="32" fill="#03C75A" />
            <path d="M22 18h8.2l11.6 16.6V18H50v28h-8.2L30.2 29.4V46H22V18Z" fill="#fff" />
        </svg>
    ),
    google: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <path
                d="M54.2 32.7c0-1.5-.1-2.9-.4-4.3H32v8.1h12.5c-.5 2.7-2.1 5-4.4 6.6v5.5h7.1c4.2-3.8 7-9.5 7-15.9Z"
                fill="#4285F4"
            />
            <path
                d="M32 55.2c6.3 0 11.5-2.1 15.3-5.6l-7.1-5.5c-2 1.4-4.5 2.2-8.2 2.2-6.3 0-11.6-4.2-13.5-10H11.2v5.7c3.8 7.5 11.6 12.2 20.8 12.2Z"
                fill="#34A853"
            />
            <path
                d="M18.5 36.3c-.5-1.4-.8-2.8-.8-4.3s.3-2.9.8-4.3V22h-7.3A23.2 23.2 0 0 0 8.8 32c0 3.7.9 7.1 2.4 10.1l7.3-5.8Z"
                fill="#FBBC05"
            />
            <path
                d="M32 17.7c3.4 0 6.4 1.2 8.8 3.4l6.6-6.6C43.4 10.8 38.3 8.8 32 8.8c-9.2 0-17 4.7-20.8 12.2l7.3 5.7c1.9-5.8 7.2-10 13.5-10Z"
                fill="#EA4335"
            />
        </svg>
    ),
};

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const completeSocialLogin = useAuthStore((state) => state.completeSocialLogin);
    const ensureTestAccount = useAuthStore((state) => state.ensureTestAccount);
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const [rememberIdentifier, setRememberIdentifier] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const rememberedIdentifier = window.localStorage.getItem(REMEMBER_IDENTIFIER_KEY);

        if (rememberedIdentifier) {
            setForm((current) => ({ ...current, identifier: rememberedIdentifier }));
            setRememberIdentifier(true);
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));

        if (error) {
            setError('');
        }
    };

    const syncRememberedIdentifier = (identifier) => {
        if (rememberIdentifier && identifier.trim()) {
            window.localStorage.setItem(REMEMBER_IDENTIFIER_KEY, identifier.trim());
            return;
        }

        window.localStorage.removeItem(REMEMBER_IDENTIFIER_KEY);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        const result = login(form.identifier, form.password);

        if (result.success) {
            syncRememberedIdentifier(form.identifier);
            navigate('/');
            return;
        }

        setError(result.message);
    };

    const handleSocialLogin = async (provider) => {
        setError('');

        try {
            const result = await beginSocialLogin(provider, { returnTo: '/mypage' });

            if (!result?.profile) {
                return;
            }

            const loginResult = completeSocialLogin(provider, result.profile);

            if (!loginResult.success) {
                setError(loginResult.message || '간편로그인을 완료하지 못했습니다.');
                return;
            }

            navigate(consumeSocialReturnTo());
        } catch (nextError) {
            setError(nextError.message || '간편로그인 처리 중 문제가 발생했습니다.');
        }
    };

    const handleTestLogin = () => {
        setError('');

        ensureTestAccount(TEST_ACCOUNT);
        setForm({ identifier: TEST_ACCOUNT.userId, password: TEST_ACCOUNT.password });

        const result = login(TEST_ACCOUNT.userId, TEST_ACCOUNT.password);

        if (result.success) {
            if (rememberIdentifier) {
                window.localStorage.setItem(REMEMBER_IDENTIFIER_KEY, TEST_ACCOUNT.userId);
            }
            navigate('/mypage');
            return;
        }

        setError(result.message || '테스트 계정 로그인에 실패했습니다.');
    };

    const handleRememberChange = (event) => {
        const nextChecked = event.target.checked;
        setRememberIdentifier(nextChecked);

        if (nextChecked && form.identifier.trim()) {
            window.localStorage.setItem(REMEMBER_IDENTIFIER_KEY, form.identifier.trim());
            return;
        }

        if (!nextChecked) {
            window.localStorage.removeItem(REMEMBER_IDENTIFIER_KEY);
        }
    };

    return (
        <div className="auth-page auth-page--login">
            <div className="auth-page__header-space" />
            <div className="auth-page__inner auth-page__inner--login">
                <h1 className="auth-page__title auth-page__title--login optima-40">로그인</h1>

                <form className="auth-page__form auth-page__form--login" onSubmit={handleSubmit}>
                    <div className="auth-page__field auth-page__field--line">
                        <label className="auth-page__sr-only" htmlFor="login-identifier">
                            아이디 또는 이메일
                        </label>
                        <div className="auth-page__line-control">
                            <User size={18} className="auth-page__input-icon" aria-hidden="true" />
                            <input
                                id="login-identifier"
                                type="text"
                                name="identifier"
                                value={form.identifier}
                                onChange={handleChange}
                                className="suit-16-r"
                                placeholder="ID를 입력해주세요"
                                autoComplete="username"
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-page__field auth-page__field--line">
                        <label className="auth-page__sr-only" htmlFor="login-password">
                            비밀번호
                        </label>
                        <div className="auth-page__line-control auth-page__line-control--password">
                            <Lock size={18} className="auth-page__input-icon" aria-hidden="true" />
                            <input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="suit-16-r"
                                placeholder="비밀번호 (8~12자리 영문+숫자+특수문자)"
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                className="auth-page__password-toggle auth-page__password-toggle--line"
                                onClick={() => setShowPassword((current) => !current)}
                                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <label className="auth-page__remember auth-page__remember--login suit-14-m" htmlFor="login-remember">
                        <input
                            id="login-remember"
                            type="checkbox"
                            checked={rememberIdentifier}
                            onChange={handleRememberChange}
                        />
                        <span>아이디 저장</span>
                    </label>

                    {error ? <p className="auth-page__error auth-page__error--login suit-14-m">{error}</p> : null}

                    <button type="submit" className="auth-page__submit auth-page__submit--login suit-16-r">
                        로그인
                    </button>
                </form>

                <div className="auth-page__quick-links suit-14-m">
                    <Link to="/find-account">아이디 찾기</Link>
                    <Link to="/find-account">비밀번호 찾기</Link>
                    <Link to="/signup">회원가입</Link>
                </div>

                <div className="auth-page__simple-login">
                    <div className="auth-page__divider auth-page__divider--simple" aria-hidden="true">
                        <span className="auth-page__divider-line" />
                        <span className="auth-page__divider-text suit-14-r">간편 로그인</span>
                        <span className="auth-page__divider-line" />
                    </div>

                    <div className="auth-page__social-icons">
                        {SOCIAL_LOGIN_OPTIONS.map((option) => (
                            <button
                                key={option.provider}
                                type="button"
                                className={`auth-page__social-icon-button ${option.className}`}
                                onClick={() => handleSocialLogin(option.provider)}
                                aria-label={option.label}
                                title={option.label}
                            >
                                <span
                                    className={`auth-page__social-icon-badge auth-page__social-icon-badge--${option.provider}`}
                                >
                                    {SOCIAL_LOGO_MAP[option.provider]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className="auth-page__test-btn auth-page__test-btn--login suit-12-r"
                    onClick={handleTestLogin}
                >
                    테스트 계정으로 로그인
                </button>
            </div>
        </div>
    );
};

export default Login;
