import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const normalize = (value) => value?.trim().toLowerCase() || '';

const DEFAULT_CARRIER = '대한민국 +82';

const toSafeUser = (user) => {
    const { password: _, ...safeUser } = user;
    return safeUser;
};

const buildUserRecord = (userData, overrides = {}) => {
    const normalizedUserId = normalize(userData.userId);
    const normalizedEmail = normalize(userData.email);
    const fallbackEmail = normalizedUserId
        ? `${normalizedUserId}@aesop.member`
        : `guest-${Date.now()}@aesop.member`;

    return {
        id: overrides.id || Date.now().toString(),
        userId: normalizedUserId,
        name: userData.name?.trim() || '',
        email: normalizedEmail || fallbackEmail,
        verificationEmail: normalizedEmail,
        password: userData.password,
        phone: userData.phone || '',
        carrier: userData.carrier || DEFAULT_CARRIER,
        birthDate: userData.birthDate || '',
        gender: userData.gender || '',
        addresses: overrides.addresses || [],
        createdAt: overrides.createdAt || new Date().toISOString(),
    };
};

const useAuthStore = create(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            user: null,
            users: [],

            signup: (userData) => {
                const users = get().users;
                const normalizedUserId = normalize(userData.userId);
                const normalizedEmail = normalize(userData.email);

                if (normalizedUserId && users.some((user) => normalize(user.userId) === normalizedUserId)) {
                    return { success: false, message: '이미 사용 중인 아이디입니다.' };
                }

                if (normalizedEmail && users.some((user) => normalize(user.email) === normalizedEmail)) {
                    return { success: false, message: '이미 사용 중인 이메일입니다.' };
                }

                const newUser = buildUserRecord(userData);

                set({ users: [...users, newUser] });
                return { success: true };
            },

            ensureTestAccount: (userData) => {
                const users = get().users;
                const normalizedUserId = normalize(userData.userId);
                const normalizedEmail = normalize(userData.email);

                const existingIndex = users.findIndex(
                    (user) =>
                        normalize(user.userId) === normalizedUserId ||
                        normalize(user.email) === normalizedEmail
                );

                if (existingIndex === -1) {
                    const nextUser = buildUserRecord(userData);
                    set({ users: [...users, nextUser] });
                    return { success: true, user: nextUser };
                }

                const existingUser = users[existingIndex];
                const updatedUser = buildUserRecord(userData, {
                    id: existingUser.id,
                    addresses: existingUser.addresses || [],
                    createdAt: existingUser.createdAt,
                });

                const nextUsers = [...users];
                nextUsers[existingIndex] = updatedUser;

                set((state) => ({
                    users: nextUsers,
                    user:
                        state.user?.id === updatedUser.id
                            ? toSafeUser(updatedUser)
                            : state.user,
                }));

                return { success: true, user: updatedUser };
            },

            login: (identifier, password) => {
                const normalizedIdentifier = normalize(identifier);
                const users = get().users;
                const user = users.find(
                    (entry) =>
                        entry.password === password &&
                        (
                            normalize(entry.email) === normalizedIdentifier ||
                            normalize(entry.userId) === normalizedIdentifier
                        )
                );

                if (!user) {
                    return {
                        success: false,
                        message: '아이디 또는 이메일, 비밀번호를 다시 확인해 주세요.',
                    };
                }

                set({ isLoggedIn: true, user: toSafeUser(user) });
                return { success: true };
            },

            logout: () => set({ isLoggedIn: false, user: null }),

            addAddress: (address) => {
                const user = get().user;
                if (!user) return;

                const updatedAddresses = [
                    ...(user.addresses || []),
                    { id: Date.now().toString(), ...address },
                ];

                const users = get().users.map((entry) =>
                    entry.id === user.id ? { ...entry, addresses: updatedAddresses } : entry
                );

                set({
                    user: { ...user, addresses: updatedAddresses },
                    users,
                });
            },

            findAccount: (identifier) => {
                const normalizedIdentifier = normalize(identifier);
                const users = get().users;

                return users.some(
                    (user) =>
                        normalize(user.email) === normalizedIdentifier ||
                        normalize(user.userId) === normalizedIdentifier
                );
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
