import time
import urllib.request
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# 1. 크롬 브라우저 자동 설정 및 실행
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 2. 이솝 네이버 스토어 제품 상세 페이지 접속
# 추출하고 싶은 실제 제품의 URL로 변경해 주세요.
url = "https://brand.naver.com/aesopskincare/products/특정제품번호" 
driver.get(url)
time.sleep(3) # 페이지의 기본 HTML이 로딩될 때까지 대기

# 3. 스크롤을 내려 지연 로딩(Lazy Loading)된 이미지 렌더링 유도
# 자바스크립트 명령어를 실행해 화면을 10번에 걸쳐 천천히 아래로 내립니다.
for i in range(1, 11):
    driver.execute_script(f"window.scrollTo(0, document.body.scrollHeight * {i} / 10);")
    time.sleep(1) # 이미지가 서버에서 불러와질 시간을 줍니다.

# 4. 상세 페이지 영역의 이미지 태그 찾기
# F12 개발자 도구를 열어 확인한 CSS 선택자를 사용합니다. 
# (보통 네이버 상세페이지 본문은 '.se-main-container img' 에 있습니다)
image_elements = driver.find_elements(By.CSS_SELECTOR, ".se-main-container img")

print(f"총 {len(image_elements)}개의 이미지를 찾았습니다. 다운로드를 시작합니다.")

# 5. 이미지 src 속성 추출 및 다운로드
for index, img in enumerate(image_elements):
    src = img.get_attribute('src') # <img> 태그의 src 주소 가져오기
    if src:
        # 파일명 지정 (예: aesop_product_1.jpg)
        filename = f"aesop_product_{index+1}.jpg"
        
        # 이미지 URL에 접속해 파일로 저장
        urllib.request.urlretrieve(src, filename)
        print(f"{filename} 저장 완료")

# 6. 작업 완료 후 브라우저 종료
driver.quit()