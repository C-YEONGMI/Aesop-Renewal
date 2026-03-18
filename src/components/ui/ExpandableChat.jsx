import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, CornerDownLeft, MessageCircle, Mic, Paperclip, X } from 'lucide-react';
import './ExpandableChat.scss';

const INITIAL_MESSAGES = [
    {
        id: 1,
        sender: 'bot',
        content: '안녕하세요. Aesop 상담 도우미입니다. 찾고 계신 제품이나 향, 사용감에 대해 편하게 말씀해주세요.',
    },
    {
        id: 2,
        sender: 'bot',
        content: '피부 타입, 선호하는 향 계열, 선물용 여부를 알려주시면 조금 더 빠르게 도와드릴 수 있어요.',
    },
];

const QUICK_REPLIES = [
    '말씀해주신 내용을 바탕으로 피부 타입과 사용 시점을 함께 고려해 제품을 추천드릴게요.',
    '향과 사용감 중심으로 몇 가지 잘 맞을 만한 제품군을 먼저 추려보는 방식이 좋겠습니다.',
    '선물용이라면 패키지 인상과 향의 호불호까지 함께 고려해서 제안드릴 수 있어요.',
];

const ExpandableChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const bodyRef = useRef(null);
    const inputRef = useRef(null);
    const timeoutRef = useRef(null);

    const nextReply = useMemo(
        () => QUICK_REPLIES[messages.filter((message) => message.sender === 'user').length % QUICK_REPLIES.length],
        [messages]
    );

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        requestAnimationFrame(() => {
            if (bodyRef.current) {
                bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
            }

            inputRef.current?.focus();
        });
    }, [isOpen, messages, isLoading]);

    useEffect(() => () => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const value = input.trim();

        if (!value || isLoading) {
            return;
        }

        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                sender: 'user',
                content: value,
            },
        ]);
        setInput('');
        setIsLoading(true);

        timeoutRef.current = window.setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: prev.length + 1,
                    sender: 'bot',
                    content: nextReply,
                },
            ]);
            setIsLoading(false);
        }, 900);
    };

    return (
        <div className={`expandable-chat ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
            <div className="expandable-chat__panel" role="dialog" aria-modal="false" aria-label="실시간 상담">
                <div className="expandable-chat__header">
                    <div className="expandable-chat__eyebrow suit-14-m">Aesop Concierge</div>
                    <div className="expandable-chat__title-wrap">
                        <div className="expandable-chat__avatar" aria-hidden="true">
                            <Bot size={18} strokeWidth={1.8} />
                        </div>
                        <div>
                            <h2 className="expandable-chat__title">실시간 상담</h2>
                            <p className="expandable-chat__subtitle">
                                제품 추천, 향 계열, 선물 상담까지 도와드립니다.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="expandable-chat__close"
                        onClick={onClose}
                        aria-label="채팅 닫기"
                    >
                        <X size={18} strokeWidth={1.8} />
                    </button>
                </div>

                <div className="expandable-chat__body" ref={bodyRef}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`expandable-chat__message expandable-chat__message--${message.sender}`}
                        >
                            {message.sender === 'bot' && (
                                <div className="expandable-chat__message-avatar" aria-hidden="true">
                                    <MessageCircle size={16} strokeWidth={1.8} />
                                </div>
                            )}
                            <div className="expandable-chat__bubble">{message.content}</div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="expandable-chat__message expandable-chat__message--bot">
                            <div className="expandable-chat__message-avatar" aria-hidden="true">
                                <MessageCircle size={16} strokeWidth={1.8} />
                            </div>
                            <div className="expandable-chat__bubble expandable-chat__bubble--loading">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    )}
                </div>

                <div className="expandable-chat__footer">
                    <form className="expandable-chat__composer" onSubmit={handleSubmit}>
                        <textarea
                            ref={inputRef}
                            className="expandable-chat__input"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="궁금한 점을 입력해보세요."
                            rows={1}
                        />
                        <div className="expandable-chat__actions">
                            <div className="expandable-chat__tools">
                                <button type="button" className="expandable-chat__tool-btn" aria-label="파일 첨부">
                                    <Paperclip size={16} strokeWidth={1.8} />
                                </button>
                                <button type="button" className="expandable-chat__tool-btn" aria-label="음성 입력">
                                    <Mic size={16} strokeWidth={1.8} />
                                </button>
                            </div>
                            <button type="submit" className="expandable-chat__send-btn" disabled={!input.trim() || isLoading}>
                                보내기
                                <CornerDownLeft size={14} strokeWidth={1.8} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExpandableChat;
