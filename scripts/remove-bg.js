import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';

const urls = [
    {
        name: 'SK52.png',
        url: 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw76bc2cc6/images/products/SK52/Aesop-Skin-Protective-Lip-Balm-SPF30-5-5g-large.jpg'
    },
    {
        name: 'SK68.png',
        url: 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dwa86b8815/images/products/SK68/Aesop_Skin_Protective_Facial_Lotion_SPF50_50mL_NGL_Front_2000x2000px.jpg'
    },
    {
        name: 'APB324.png',
        url: 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dwbc198837/images/products/APB324/Aesop_Kits_Fragrance_Anthology_Volume_I_Front_A_2000x2000px.jpg'
    }
];

const publicDir = './public/images';
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// URL로부터 base64 문자열을 가져옵니다.
const fetchAsBase64 = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve(`data:image/jpeg;base64,${buffer.toString('base64')}`);
            });
            res.on('error', reject);
        }).on('error', reject);
    });
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const item of urls) {
        await page.goto('about:blank');
        console.log(`Downloading and processing ${item.name}...`);

        try {
            // Node.js에서 먼저 이미지를 받아 base64로 변환 (CORS 우회)
            const base64Src = await fetchAsBase64(item.url);

            const resultBase64 = await page.evaluate(async (imgSrc) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d', { willReadFrequently: true });
                        ctx.drawImage(img, 0, 0);

                        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const data = imgData.data;

                        for (let i = 0; i < data.length; i += 4) {
                            const r = data[i], g = data[i + 1], b = data[i + 2];
                            // 너무 밝은 픽셀(배경색) 투명화
                            if (r > 240 && g > 240 && b > 235) {
                                data[i + 3] = 0; // alpha 투명화
                            } else if (r > 230 && g > 230 && b > 225) {
                                // 경계 페더링
                                data[i + 3] = 100;
                            } else if (r > 220 && g > 220 && b > 215) {
                                // 조금 더 어두운 경계
                                data[i + 3] = 200;
                            }
                        }

                        ctx.putImageData(imgData, 0, 0);
                        resolve(canvas.toDataURL('image/png'));
                    };
                    img.onerror = (e) => reject(`Failed to load base64 image`);
                    img.src = imgSrc;
                });
            }, base64Src);

            const base64Content = resultBase64.replace(/^data:image\/png;base64,/, "");
            fs.writeFileSync(path.join(publicDir, item.name), base64Content, 'base64');
            console.log(`Saved ${item.name}`);
        } catch (err) {
            console.error(`Error on ${item.name}:`, err);
        }
    }

    await browser.close();
    console.log('All done!');
})();
