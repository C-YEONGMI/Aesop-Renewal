import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSupportStore from '../store/useSupportStore';
import useAuthStore from '../store/useAuthStore';
import './Support.scss';

const TABS = [
    { key: 'notices', label: '공지사항' },
    { key: 'faq', label: 'FAQ' },
    { key: 'contact', label: '문의하기' },
    { key: 'live-chat', label: '실시간 상담' },
    { key: 'store-locator', label: '매장 찾기', link: '/store-locator' },
];

const Support = ({ tab: propTab }) => {
    const { tab: paramTab } = useParams();
    const activeTab = propTab || paramTab || 'notices';

    const notices = useSupportStore(s => s.notices);
    const faqs = useSupportStore(s => s.faqs);
    const createInquiry = useSupportStore(s => s.createInquiry);
    const user = useAuthStore(s => s.user);
    const isLoggedIn = useAuthStore(s => s.isLoggedIn);

    const [form, setForm] = useState({ subject: '', content: '' });
    const [openFaq, setOpenFaq] = useState(null);

    const handleInquiry = e => {
        e.preventDefault();
        if (!isLoggedIn) { alert('로그인이 필요합니다.'); return; }
        createInquiry({ ...form, userId: user.id, userName: user.name });
        alert('문의가 접수되었습니다.');
        setForm({ subject: '', content: '' });
    };

    return (
        <div className="support-page">
            <div className="support-page__header-space" />
            <div className="support-page__inner">
                <h1 className="optima-40 support-page__title">고객지원</h1>

                {/* 탭 */}
                <div className="support-page__tabs">
                    {TABS.map(t => (
                        t.link ? (
                            <Link key={t.key} to={t.link} className="support-page__tab optima-16">
                                {t.label}
                            </Link>
                        ) : (
                            <Link
                                key={t.key}
                                to={`/support/${t.key}`}
                                className={`support-page__tab optima-16 ${activeTab === t.key ? 'active' : ''}`}
                            >
                                {t.label}
                            </Link>
                        )
                    ))}
                </div>

                {/* 공지사항 */}
                {activeTab === 'notices' && (
                    <div className="support-page__content">
                        {notices.map(n => (
                            <div key={n.id} className="support-page__notice">
                                <p className="suit-18-m support-page__notice-title">{n.title}</p>
                                <p className="suit-12-r support-page__notice-date">{n.date}</p>
                                <p className="suit-16-r support-page__notice-content">{n.content}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* FAQ */}
                {activeTab === 'faq' && (
                    <div className="support-page__content">
                        {faqs.map(f => (
                            <div key={f.id} className="support-page__faq">
                                <button
                                    className="support-page__faq-q suit-18-m"
                                    onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)}
                                >
                                    <span className="support-page__faq-cat suit-12-r">{f.category}</span>
                                    {f.question}
                                    <svg className={`support-page__faq-arrow ${openFaq === f.id ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {openFaq === f.id && (
                                    <p className="support-page__faq-a suit-16-r">{f.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 문의하기 */}
                {activeTab === 'contact' && (
                    <div className="support-page__content">
                        <form className="support-page__form" onSubmit={handleInquiry}>
                            <div className="support-page__field">
                                <label className="suit-14-m">제목</label>
                                <input
                                    type="text"
                                    value={form.subject}
                                    onChange={e => setForm({ ...form, subject: e.target.value })}
                                    className="suit-16-r"
                                    placeholder="문의 제목을 입력하세요"
                                    required
                                />
                            </div>
                            <div className="support-page__field">
                                <label className="suit-14-m">내용</label>
                                <textarea
                                    value={form.content}
                                    onChange={e => setForm({ ...form, content: e.target.value })}
                                    className="suit-16-r"
                                    placeholder="문의 내용을 입력하세요"
                                    rows={8}
                                    required
                                />
                            </div>
                            <button type="submit" className="support-page__submit suit-18-m">
                                문의 접수하기
                            </button>
                        </form>
                    </div>
                )}

                {/* 실시간 상담 */}
                {activeTab === 'live-chat' && (
                    <div className="support-page__content support-page__live-chat">
                        <p className="optima-20">실시간 상담</p>
                        <p className="suit-18-r">평일 10:00 - 18:00 운영</p>
                        <p className="suit-16-r">상담 가능 시간 외에는 이메일 문의를 이용해주세요.</p>
                        <a href="mailto:support@aesop.kr" className="support-page__email-link optima-16">
                            support@aesop.kr
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Support;
