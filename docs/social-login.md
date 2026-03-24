# Social Login Setup

이 프로젝트는 다음 방식으로 간편로그인을 처리합니다.

- Google: 프런트엔드에서 팝업 로그인 후 사용자 프로필 조회
- Kakao: 프런트엔드에서 인가 코드 수신 후 `/api/oauth/kakao/exchange`에서 토큰 교환
- Naver: 프런트엔드에서 인가 코드 수신 후 `/api/oauth/naver/exchange`에서 토큰 교환

## 1. 콜백 URL 등록

각 개발자 콘솔에 아래 콜백 URL을 등록해야 합니다.

- `http://localhost:5173/auth/callback/google`
- `http://localhost:5173/auth/callback/kakao`
- `http://localhost:5173/auth/callback/naver`

배포 환경에서는 도메인에 맞춰 동일한 경로를 추가로 등록하세요.

## 2. `.env.local` 설정

`.env.example`을 참고해 아래 값을 채우면 됩니다.

- `VITE_GOOGLE_CLIENT_ID`
- `VITE_KAKAO_REST_API_KEY`
- `VITE_NAVER_CLIENT_ID`
- `KAKAO_REST_API_KEY`
- `KAKAO_CLIENT_SECRET`
- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`

같은 값이 프런트/서버 모두 필요한 경우가 있어 `VITE_*`와 서버용 키를 나눠 두었습니다.

## 3. 제공된 서버 교환 엔드포인트

이 저장소에는 아래 엔드포인트 예시가 포함되어 있습니다.

- `api/oauth/kakao/exchange.js`
- `api/oauth/naver/exchange.js`

프런트는 기본적으로 아래 경로를 호출합니다.

- `/api/oauth/kakao/exchange`
- `/api/oauth/naver/exchange`

`npm run dev`로 실행할 때도 `vite.config.js`에서 같은 경로를 프록시하도록 연결해 두었습니다.

다른 백엔드를 쓰고 싶다면 `VITE_OAUTH_PROXY_BASE_URL` 또는 개별 `VITE_*_EXCHANGE_ENDPOINT`를 지정하면 됩니다.

## 4. 참고사항

- Google은 공식 GIS 팝업 흐름을 사용합니다.
- Kakao JavaScript SDK v2는 팝업에서 직접 토큰을 받는 예전 방식 대신 인가 코드 기반 흐름을 권장합니다.
- Naver는 공식 개발가이드 기준으로 `code`, `state`를 콜백으로 받고 서버에서 토큰 발급 후 프로필을 조회하도록 맞췄습니다.
