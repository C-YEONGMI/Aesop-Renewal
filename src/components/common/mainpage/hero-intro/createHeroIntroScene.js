import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import {
    HERO_INTRO_ASSETS,
    HERO_INTRO_SEGMENTS,
    clamp01,
    easeInOutCubic,
    easeOutCubic,
    mix,
    progressBetween,
} from './heroIntroConfig';

const DPR_CAP = 1.3;
const BOOK_SIZE = 4.1;

const LOOKUP_NAMES = {
    cover: ['Book_Cover_001', 'Book_Cover', 'Cover', 'cover'],
    pageHolder: ['Page_Holder_001', 'Page_Holder', 'PageHolder', 'page_holder'],
    frontSheets: ['Sheets_001', 'Sheets', 'Sheet_Front', 'pages_front'],
    backSheets: ['Sheets_002', 'Sheet_Back', 'pages_back'],
};

const findObjectByNames = (root, names) =>
    names
        .map((name) => root.getObjectByName(name))
        .find(Boolean) ?? null;

const disposeMaterial = (material) => {
    if (!material) {
        return;
    }

    const materials = Array.isArray(material) ? material : [material];

    materials.forEach((entry) => {
        if (!entry) {
            return;
        }

        [
            'map',
            'alphaMap',
            'aoMap',
            'bumpMap',
            'displacementMap',
            'emissiveMap',
            'lightMap',
            'metalnessMap',
            'normalMap',
            'roughnessMap',
            'specularMap',
        ].forEach((key) => {
            if (entry[key]) {
                entry[key].dispose();
            }
        });

        entry.dispose();
    });
};

const getSize = (canvas) => ({
    width: canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth,
    height: canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight,
});

export const createHeroIntroScene = async ({ canvas }) => {
    if (!canvas) {
        throw new Error('A canvas element is required for the hero intro scene.');
    }

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_CAP));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 42);
    const focusTarget = new THREE.Vector3(0, 0.05, 0);
    const bookRig = new THREE.Group();
    scene.add(bookRig);

    const ambient = new THREE.AmbientLight(0xf0dfc2, 1.02);
    const keyLight = new THREE.SpotLight(0xffedd1, 2.1, 34, Math.PI * 0.17, 0.62, 1.35);
    keyLight.position.set(3.8, 4.2, 7.1);
    keyLight.target.position.set(0.3, 0.04, 0.2);
    const fillLight = new THREE.DirectionalLight(0xd3b08a, 0.58);
    fillLight.position.set(-2.6, 1.8, -1.6);
    const rimLight = new THREE.PointLight(0x9f6c45, 0.32, 18, 2);
    rimLight.position.set(-1.8, -0.3, 4.6);

    scene.add(ambient, keyLight, keyLight.target, fillLight, rimLight);

    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(HERO_INTRO_ASSETS.modelPath);

    const materials = await mtlLoader.loadAsync(HERO_INTRO_ASSETS.modelMtl);
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(HERO_INTRO_ASSETS.modelPath);

    const book = await objLoader.loadAsync(HERO_INTRO_ASSETS.modelObj);
    book.traverse((child) => {
        if (!child.isMesh) {
            return;
        }

        child.frustumCulled = true;

        if (child.material) {
            const materialsToAdjust = Array.isArray(child.material)
                ? child.material
                : [child.material];

            materialsToAdjust.forEach((entry) => {
                entry.side = THREE.FrontSide;
                entry.transparent = false;
                entry.depthWrite = true;
            });
        }
    });

    const box = new THREE.Box3().setFromObject(book);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    book.position.sub(center);
    book.scale.setScalar(BOOK_SIZE / maxDimension);
    bookRig.add(book);

    const coverGroup = findObjectByNames(book, LOOKUP_NAMES.cover);
    const pageHolderGroup = findObjectByNames(book, LOOKUP_NAMES.pageHolder);
    const sheetsFrontGroup = findObjectByNames(book, LOOKUP_NAMES.frontSheets);
    const sheetsBackGroup = findObjectByNames(book, LOOKUP_NAMES.backSheets);

    const basePose = {
        coverRotationX: coverGroup?.rotation.x ?? 0,
        coverRotationY: coverGroup?.rotation.y ?? 0,
        coverRotationZ: coverGroup?.rotation.z ?? 0,
        pageHolderRotationX: pageHolderGroup?.rotation.x ?? 0,
        pageHolderRotationY: pageHolderGroup?.rotation.y ?? 0,
        sheetsFrontY: sheetsFrontGroup?.position.y ?? 0,
        sheetsFrontZ: sheetsFrontGroup?.position.z ?? 0,
        sheetsFrontRotationY: sheetsFrontGroup?.rotation.y ?? 0,
        sheetsBackY: sheetsBackGroup?.position.y ?? 0,
        sheetsBackZ: sheetsBackGroup?.position.z ?? 0,
        sheetsBackRotationY: sheetsBackGroup?.rotation.y ?? 0,
    };

    const state = {
        progress: 0,
        active: false,
        destroyed: false,
        rafId: 0,
    };

    const updateScenePose = (time) => {
        const progress = clamp01(state.progress);
        const coverProgress = easeOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.cover)
        );
        const hingeProgress = easeInOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.hinge)
        );
        const pageRiffleProgress = easeOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.pageRiffle)
        );
        const settleProgress = easeOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.spreadSettle)
        );
        const portalProgress = easeInOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.portal)
        );
        const hingeOverlap = easeOutCubic(progressBetween(progress, 0.12, 0.44));
        const archivalDriftX = state.active ? Math.sin(time * 0.00017) * 0.022 : 0;
        const archivalDriftY = state.active ? Math.cos(time * 0.00013) * 0.014 : 0;
        const driftProgress = coverProgress * 0.45 + hingeProgress * 0.55;

        bookRig.rotation.x =
            mix(0.21, 0.08, hingeOverlap) - portalProgress * 0.05 + archivalDriftY * driftProgress;
        bookRig.rotation.y =
            mix(0.92, 0.24, hingeOverlap) + archivalDriftX * driftProgress;
        bookRig.rotation.z = mix(-0.015, 0.006, settleProgress);

        bookRig.position.x = mix(-1.08, -0.04, hingeOverlap) + archivalDriftX * 0.28;
        bookRig.position.y = mix(-0.26, 0.02, hingeOverlap) + archivalDriftY * 0.18;
        bookRig.position.z =
            mix(-0.82, 0.12, hingeProgress) +
            settleProgress * 0.14 -
            portalProgress * 0.62;

        const rigScale =
            mix(0.96, 1.05, hingeProgress) +
            pageRiffleProgress * 0.03 +
            settleProgress * 0.02 +
            portalProgress * 0.09;
        bookRig.scale.setScalar(rigScale);

        camera.position.x =
            mix(1.42, 0.38, hingeProgress) +
            settleProgress * 0.08 +
            archivalDriftX * 0.6;
        camera.position.y =
            mix(0.34, 0.18, hingeProgress) +
            coverProgress * 0.04 +
            archivalDriftY * 0.48 -
            portalProgress * 0.04;
        camera.position.z =
            mix(7.2, 5.32, hingeProgress) -
            pageRiffleProgress * 0.32 -
            settleProgress * 0.24 -
            portalProgress * 1.72;

        focusTarget.set(
            mix(0, 0.12, hingeProgress) + portalProgress * 0.06,
            mix(-0.06, 0.04, hingeProgress) + settleProgress * 0.02,
            mix(0, 0.16, settleProgress) + portalProgress * 0.1
        );
        camera.lookAt(focusTarget);

        ambient.intensity = mix(0.96, 1.14, hingeProgress + settleProgress * 0.18);
        keyLight.intensity = mix(1.98, 2.36, hingeProgress + settleProgress * 0.2);
        fillLight.intensity = mix(0.52, 0.7, settleProgress);
        rimLight.intensity = mix(0.24, 0.38, pageRiffleProgress * 0.4 + settleProgress * 0.6);

        if (coverGroup) {
            coverGroup.rotation.x = basePose.coverRotationX + hingeProgress * 0.01;
            coverGroup.rotation.y =
                basePose.coverRotationY +
                coverProgress * 0.08 +
                hingeOverlap * 0.22 +
                pageRiffleProgress * 0.03;
            coverGroup.rotation.z = basePose.coverRotationZ + hingeProgress * 0.015;
        }

        if (pageHolderGroup) {
            pageHolderGroup.rotation.x =
                basePose.pageHolderRotationX -
                hingeProgress * 0.018 -
                pageRiffleProgress * 0.022;
            pageHolderGroup.rotation.y =
                basePose.pageHolderRotationY + hingeProgress * 0.028;
        }

        if (sheetsFrontGroup) {
            sheetsFrontGroup.position.y =
                basePose.sheetsFrontY + pageRiffleProgress * 0.024 + settleProgress * 0.01;
            sheetsFrontGroup.position.z =
                basePose.sheetsFrontZ + hingeProgress * 0.018 + pageRiffleProgress * 0.04;
            sheetsFrontGroup.rotation.y =
                basePose.sheetsFrontRotationY + pageRiffleProgress * 0.03;
        }

        if (sheetsBackGroup) {
            sheetsBackGroup.position.y =
                basePose.sheetsBackY - pageRiffleProgress * 0.018 + settleProgress * 0.008;
            sheetsBackGroup.position.z =
                basePose.sheetsBackZ + hingeProgress * 0.014 - pageRiffleProgress * 0.022;
            sheetsBackGroup.rotation.y =
                basePose.sheetsBackRotationY - pageRiffleProgress * 0.018;
        }
    };

    const renderFrame = (time) => {
        state.rafId = 0;

        if (state.destroyed || !state.active) {
            return;
        }

        updateScenePose(time);
        renderer.render(scene, camera);
        state.rafId = window.requestAnimationFrame(renderFrame);
    };

    const resize = () => {
        if (state.destroyed) {
            return;
        }

        const { width, height } = getSize(canvas);

        if (!width || !height) {
            return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_CAP));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        updateScenePose(performance.now());
        renderer.render(scene, camera);
    };

    const start = () => {
        if (state.destroyed || state.active) {
            return;
        }

        state.active = true;

        if (!state.rafId) {
            state.rafId = window.requestAnimationFrame(renderFrame);
        }
    };

    const stop = () => {
        state.active = false;

        if (state.rafId) {
            window.cancelAnimationFrame(state.rafId);
            state.rafId = 0;
        }
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            stop();
            return;
        }

        if (!state.destroyed) {
            start();
        }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    resize();
    start();

    return {
        resize,
        setActive(nextActive) {
            if (nextActive) {
                start();
                return;
            }

            stop();
        },
        setProgress(nextProgress) {
            state.progress = clamp01(nextProgress);

            if (!state.active) {
                updateScenePose(performance.now());
                renderer.render(scene, camera);
            }
        },
        destroy() {
            if (state.destroyed) {
                return;
            }

            state.destroyed = true;
            stop();
            document.removeEventListener('visibilitychange', handleVisibilityChange);

            scene.traverse((child) => {
                if (!child.isMesh) {
                    return;
                }

                child.geometry?.dispose();
                disposeMaterial(child.material);
            });

            renderer.dispose();
            renderer.forceContextLoss();
        },
    };
};
