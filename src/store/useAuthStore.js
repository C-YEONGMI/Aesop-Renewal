import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_CARRIER = '대한민국 +82';

const SOCIAL_PROVIDER_LABELS = {
    google: '구글',
    kakao: '카카오',
    naver: '네이버',
};

const DEMO_SOCIAL_PROFILES = {
    google: {
        providerUserId: 'google-demo-user',
        userId: 'google_member',
        name: '구글 회원',
        email: 'google@aesop.member',
        phone: '01000000002',
    },
    kakao: {
        providerUserId: 'kakao-demo-user',
        userId: 'kakao_member',
        name: '카카오 회원',
        email: 'kakao@aesop.member',
        phone: '01000000001',
    },
    naver: {
        providerUserId: 'naver-demo-user',
        userId: 'naver_member',
        name: '네이버 회원',
        email: 'naver@aesop.member',
        phone: '01000000003',
    },
};

const normalize = (value) => value?.trim().toLowerCase() || '';

const sanitizeUserId = (value) =>
    normalize(value)
        .replace(/[^a-z0-9_-]/g, '')
        .slice(0, 32);

const toSafeUser = (user) => {
    const { password: _password, ...safeUser } = user;
    return safeUser;
};

const buildUserRecord = (userData, overrides = {}) => {
    const normalizedUserId = sanitizeUserId(userData.userId);
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
        password: userData.password || '',
        phone: userData.phone || '',
        carrier: userData.carrier || DEFAULT_CARRIER,
        birthDate: userData.birthDate || '',
        gender: userData.gender || '',
        authMethod: userData.authMethod || 'password',
        socialProvider: userData.socialProvider || '',
        socialId: userData.socialId || '',
        providerLabel: userData.providerLabel || '',
        avatarUrl: userData.avatarUrl || '',
        addresses: overrides.addresses || [],
        createdAt: overrides.createdAt || new Date().toISOString(),
    };
};

const buildSocialUserData = (provider, profileData = {}) => {
    const providerLabel = SOCIAL_PROVIDER_LABELS[provider] || provider;
    const providerUserId = String(
        profileData.providerUserId || profileData.id || profileData.sub || ''
    ).trim();
    const fallbackUserId = providerUserId ? `${provider}_${providerUserId}` : `${provider}_member`;
    const normalizedUserId = sanitizeUserId(profileData.userId || fallbackUserId) || `${provider}_member`;
    const normalizedEmail = normalize(profileData.email);

    return {
        userId: normalizedUserId,
        name: profileData.name?.trim() || `${providerLabel} 회원`,
        email: normalizedEmail || `${normalizedUserId}@aesop.member`,
        phone: profileData.phone?.trim() || '',
        birthDate: profileData.birthDate || '',
        gender: profileData.gender || '',
        authMethod: 'social',
        socialProvider: provider,
        socialId: providerUserId,
        providerLabel,
        avatarUrl: profileData.avatarUrl || profileData.picture || '',
    };
};

const findSocialUserIndex = (users, provider, profileData = {}) => {
    const providerUserId = String(
        profileData.providerUserId || profileData.id || profileData.sub || ''
    ).trim();
    const normalizedEmail = normalize(profileData.email);
    const normalizedUserId = sanitizeUserId(profileData.userId || '');

    return users.findIndex((user) => {
        if (providerUserId && user.socialProvider === provider && String(user.socialId || '') === providerUserId) {
            return true;
        }

        if (normalizedEmail && normalize(user.email) === normalizedEmail) {
            return true;
        }

        if (normalizedUserId && normalize(user.userId) === normalizedUserId) {
            return true;
        }

        return false;
    });
};

const upsertSocialUser = (users, provider, profileData = {}) => {
    const socialUserData = buildSocialUserData(provider, profileData);
    const existingIndex = findSocialUserIndex(users, provider, socialUserData);

    const nextUser = buildUserRecord(
        socialUserData,
        existingIndex >= 0
            ? {
                  id: users[existingIndex].id,
                  addresses: users[existingIndex].addresses || [],
                  createdAt: users[existingIndex].createdAt,
              }
            : {}
    );

    if (existingIndex === -1) {
        return {
            success: true,
            user: nextUser,
            users: [...users, nextUser],
        };
    }

    const nextUsers = [...users];
    nextUsers[existingIndex] = nextUser;

    return {
        success: true,
        user: nextUser,
        users: nextUsers,
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
                const normalizedUserId = sanitizeUserId(userData.userId);
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
                const normalizedUserId = sanitizeUserId(userData.userId);
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
                    user: state.user?.id === updatedUser.id ? toSafeUser(updatedUser) : state.user,
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
                        message: '아이디 또는 이메일과 비밀번호를 다시 확인해 주세요.',
                    };
                }

                set({ isLoggedIn: true, user: toSafeUser(user) });
                return { success: true };
            },

            completeSocialLogin: (provider, profileData = {}) => {
                const result = upsertSocialUser(get().users, provider, profileData);

                if (!result.success) {
                    return result;
                }

                set({
                    users: result.users,
                    isLoggedIn: true,
                    user: toSafeUser(result.user),
                });

                return { success: true, user: toSafeUser(result.user) };
            },

            loginWithSocial: (provider) => {
                const profile = DEMO_SOCIAL_PROFILES[provider];

                if (!profile) {
                    return { success: false, message: '지원하지 않는 소셜 로그인입니다.' };
                }

                return get().completeSocialLogin(provider, profile);
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

            updateProfile: (profileData) => {
                const currentUser = get().user;
                const users = get().users;

                if (!currentUser) {
                    return { success: false, message: '로그인이 필요합니다.' };
                }

                const currentUserRecord = users.find((entry) => entry.id === currentUser.id);
                if (!currentUserRecord) {
                    return { success: false, message: '회원 정보를 찾을 수 없습니다.' };
                }

                const nextEmail = normalize(profileData.email ?? currentUserRecord.email);
                const nextName = profileData.name?.trim();
                const nextPhone = profileData.phone?.trim();

                const duplicatedEmail =
                    nextEmail &&
                    users.some(
                        (entry) =>
                            entry.id !== currentUser.id &&
                            normalize(entry.email) === nextEmail
                    );

                if (duplicatedEmail) {
                    return { success: false, message: '이미 사용 중인 이메일입니다.' };
                }

                const updatedUser = {
                    ...currentUserRecord,
                    name: nextName ?? currentUserRecord.name,
                    email: nextEmail || currentUserRecord.email,
                    verificationEmail: nextEmail || currentUserRecord.verificationEmail,
                    phone: nextPhone ?? currentUserRecord.phone,
                };

                const nextUsers = users.map((entry) =>
                    entry.id === currentUser.id ? updatedUser : entry
                );

                set({
                    users: nextUsers,
                    user: toSafeUser(updatedUser),
                });

                return { success: true, user: toSafeUser(updatedUser) };
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
