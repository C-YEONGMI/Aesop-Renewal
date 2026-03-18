// ScrollTrigger가 연결된 타임라인 생성
// .con3 구간에 진입하면 타임라인 전체가 스크롤에 연동됨
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.con3', // 스크롤 기준이 되는 섹션
        start: 'top 40%', // .con3의 top이 뷰포트 40% 지점에 닿을 때 시작
        end: 'bottom top', // .con3의 bottom이 뷰포트 top에 닿을 때 종료
        scrub: 1, // 스크롤 ↔ 애니메이션 1초 지연 동기화
    },
});

// 왼쪽 요소(.rl)
// 화면 아래(350%)에서 시작 → 화면 위(-150%)까지 관통 이동
// 타임라인 시작 시점(0초)에 배치
tl.fromTo(
    '.rl',
    { y: '350%' }, // 시작 위치 (아래쪽)
    { y: '-150%' }, // 종료 위치 (위쪽)
    0
);

// 오른쪽 요소(.rr)
// .rl과 동일한 타이밍에 시작하지만 이동 범위만 다름
tl.fromTo(
    '.rr',
    { y: '300%' }, // 시작 위치
    { y: '-50%' }, // 종료 위치
    0
);

// 제목 텍스트 가로 이동 애니메이션
// 타임라인과는 별도의 ScrollTrigger 사용
gsap.fromTo(
    '.rtitle',
    { x: '100%' }, // 화면 오른쪽 바깥에서 시작
    {
        x: '-120%', // 화면 왼쪽 바깥까지 이동
        scrollTrigger: {
            trigger: '.rtitle', // 제목 자체가 트리거
            start: 'center center', // 제목 중앙이 화면 중앙에 오면 시작
            end: 'bottom center', // 제목 bottom이 화면 중앙에 닿으면 종료
            endTrigger: '.con3', // 종료 기준을 .con3까지 확장
            pin: true, // 스크롤 중 제목 고정
            scrub: 1, // 스크롤과 애니메이션 동기화
        },
    },
    0
);
