import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 인증 스토어 - 로그인 상태, 사용자 정보 관리
const useAuthStore = create(
    persist(
        (set, get) => ({
            // 상태
            isLoggedIn: false,
            user: null,
            users: [], // 가입된 사용자 목록

            // 회원가입
            signup: (userData) => {
                const users = get().users;
                const exists = users.find(u => u.email === userData.email);
                if (exists) return { success: false, message: '이미 사용 중인 이메일입니다.' };

                const newUser = {
                    id: Date.now().toString(),
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    phone: userData.phone || '',
                    addresses: [],
                    createdAt: new Date().toISOString(),
                };
                set({ users: [...users, newUser] });
                return { success: true };
            },

            // 로그인
            login: (email, password) => {
                const users = get().users;
                const user = users.find(u => u.email === email && u.password === password);
                if (!user) return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };

                const { password: _, ...safeUser } = user;
                set({ isLoggedIn: true, user: safeUser });
                return { success: true };
            },

            // 로그아웃
            logout: () => set({ isLoggedIn: false, user: null }),

            // 배송지 추가
            addAddress: (address) => {
                const user = get().user;
                if (!user) return;
                const updated = { ...user, addresses: [...(user.addresses || []), { id: Date.now().toString(), ...address }] };
                const users = get().users.map(u => u.id === user.id ? { ...u, addresses: updated.addresses } : u);
                set({ user: updated, users });
            },

            // 계정 찾기
            findAccount: (email) => {
                const users = get().users;
                return users.find(u => u.email === email) ? true : false;
            },
        }),
        {
            name: 'aesop-auth',
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                user: state.user,
                users: state.users,
            }),
        }
    )
);

export default useAuthStore;
