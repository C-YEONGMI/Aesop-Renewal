import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import {
    completeRedirectSocialLogin,
    consumeSocialReturnTo,
    getSocialProviderLabel,
    isRedirectSocialProvider,
} from '../lib/socialAuth';
import './Auth.scss';

const INITIAL_STATUS = {
    type: 'pending',
    title: '소셜 로그인을 확인하고 있습니다.',
    message: '잠시만 기다려 주세요. 계정 정보를 안전하게 불러오고 있습니다.',
};

const SocialAuthCallback = () => {
    const navigate = useNavigate();
    const { provider = '' } = useParams();
    const completeSocialLogin = useAuthStore((state) => state.completeSocialLogin);
    const [status, setStatus] = useState(INITIAL_STATUS);

    useEffect(() => {
        let isActive = true;

        const run = async () => {
            if (!isRedirectSocialProvider(provider)) {
                if (!isActive) {
                    return;
                }

                setStatus({
                    type: 'error',
                    title: '지원하지 않는 로그인 경로입니다.',
                    message: '로그인 페이지에서 다시 시도해 주세요.',
                });
                return;
            }

            try {
                const searchParams = new URLSearchParams(window.location.search);
                const { profile } = await completeRedirectSocialLogin(provider, searchParams);
                const result = completeSocialLogin(provider, profile);

                if (!result.success) {
                    throw new Error(result.message || `${getSocialProviderLabel(provider)} 로그인을 완료하지 못했습니다.`);
                }

                if (!isActive) {
                    return;
                }

                navigate(consumeSocialReturnTo(), { replace: true });
            } catch (error) {
                if (!isActive) {
                    return;
                }

                setStatus({
                    type: 'error',
                    title: `${getSocialProviderLabel(provider)} 로그인을 완료하지 못했습니다.`,
                    message: error.message || '잠시 후 다시 시도해 주세요.',
                });
            }
        };

        run();

        return () => {
            isActive = false;
        };
    }, [completeSocialLogin, navigate, provider]);

    return (
        <div className="auth-page auth-page--status">
            <div className="auth-page__header-space" />
            <div className="auth-page__inner">
                <div className="auth-page__status-card">
                    {status.type === 'pending' ? (
                        <span className="auth-page__status-spinner" aria-hidden="true" />
                    ) : null}

                    <h1 className="auth-page__status-title optima-40">{status.title}</h1>
                    <p className="auth-page__status-message suit-16-r">{status.message}</p>

                    {status.type === 'error' ? (
                        <div className="auth-page__status-actions suit-14-m">
                            <Link to="/login">로그인으로 돌아가기</Link>
                            <Link to="/">메인으로 이동</Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SocialAuthCallback;
