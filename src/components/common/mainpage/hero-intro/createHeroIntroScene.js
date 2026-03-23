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

const DPR_CAP = 1.35;
const BOOK_SIZE = 3.9;

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
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 40);
    const focusTarget = new THREE.Vector3(0, 0.1, 0);
    const bookRig = new THREE.Group();
    scene.add(bookRig);

    const ambient = new THREE.AmbientLight(0xf4e4c1, 1.05);
    const keyLight = new THREE.SpotLight(0xffeed6, 2.45, 32, Math.PI * 0.19, 0.55, 1.2);
    keyLight.position.set(4.8, 4.8, 7);
    keyLight.target.position.set(0, 0.1, 0.2);
    const rimLight = new THREE.DirectionalLight(0xcead81, 0.88);
    rimLight.position.set(-4, 2.8, -2.4);
    const fillLight = new THREE.PointLight(0xb37e4c, 0.55, 18, 2.2);
    fillLight.position.set(-1.2, -0.4, 3.8);

    scene.add(ambient, keyLight, keyLight.target, rimLight, fillLight);

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

        if (!Array.isArray(child.material) && child.material) {
            child.material.side = THREE.FrontSide;
        }
    });

    const box = new THREE.Box3().setFromObject(book);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    book.position.sub(center);
    book.scale.setScalar(BOOK_SIZE / maxDimension);
    bookRig.add(book);

    const coverGroup = book.getObjectByName('Book_Cover_001');
    const pageHolderGroup = book.getObjectByName('Page_Holder_001');
    const sheetsFrontGroup = book.getObjectByName('Sheets_001');
    const sheetsBackGroup = book.getObjectByName('Sheets_002');

    const basePose = {
        coverRotationY: coverGroup?.rotation.y ?? 0,
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
        const openingProgress = easeInOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.opening)
        );
        const botanicalProgress = easeInOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.botanical)
        );
        const holdProgress = easeOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.hold)
        );
        const exitProgress = easeInOutCubic(
            progressBetween(progress, ...HERO_INTRO_SEGMENTS.exit)
        );
        const coverLiftProgress = easeInOutCubic(progressBetween(progress, 0.06, 0.38));
        const pageTurnProgress = easeOutCubic(progressBetween(progress, 0.24, 0.76));

        const idleY = state.active ? Math.sin(time * 0.00062) : 0;
        const idleX = state.active ? Math.cos(time * 0.00083) : 0;

        bookRig.rotation.x =
            mix(0.3, 0.03, Math.min(openingProgress + botanicalProgress * 0.28, 1)) +
            idleX * 0.017 -
            exitProgress * 0.04;
        bookRig.rotation.y =
            mix(1.16, -0.08, Math.min(openingProgress + botanicalProgress * 0.38, 1)) +
            idleY * 0.038;
        bookRig.rotation.z = 0;

        bookRig.position.x =
            mix(-1.22, 0.04, Math.min(openingProgress + botanicalProgress * 0.28, 1)) +
            botanicalProgress * 0.12 +
            exitProgress * 0.48;
        bookRig.position.y =
            mix(-0.62, 0.02, Math.min(openingProgress + botanicalProgress * 0.22, 1)) +
            idleX * 0.05 -
            exitProgress * 0.16;
        bookRig.position.z =
            mix(-1.34, 0.12, openingProgress) +
            botanicalProgress * 0.34 -
            exitProgress * 1.18;

        const rigScale =
            mix(0.9, 1.16, openingProgress) +
            botanicalProgress * 0.14 +
            holdProgress * 0.04 +
            exitProgress * 0.22;
        bookRig.scale.setScalar(rigScale);

        camera.position.x =
            mix(1.52, 0.28, openingProgress) + botanicalProgress * 0.14;
        camera.position.y =
            mix(0.52, 0.18, openingProgress) +
            idleY * 0.04 -
            exitProgress * 0.06 +
            coverProgress * 0.03;
        camera.position.z =
            mix(7.5, 4.68, openingProgress) -
            botanicalProgress * 0.56 -
            holdProgress * 0.28 -
            exitProgress * 1.42;

        focusTarget.set(
            mix(0, 0.2, botanicalProgress),
            mix(-0.06, 0.08, openingProgress) + holdProgress * 0.06,
            mix(0, 0.18, holdProgress)
        );
        camera.lookAt(focusTarget);

        ambient.intensity = mix(0.92, 1.28, openingProgress * 0.55 + botanicalProgress * 0.45);
        keyLight.intensity = mix(2.15, 3.15, openingProgress * 0.55 + holdProgress * 0.45);
        fillLight.intensity = mix(0.42, 0.86, botanicalProgress);

        if (coverGroup) {
            coverGroup.rotation.y =
                basePose.coverRotationY +
                coverLiftProgress * 0.18 +
                openingProgress * 0.08 +
                pageTurnProgress * 0.03 +
                idleY * 0.01;
        }

        if (pageHolderGroup) {
            pageHolderGroup.rotation.x =
                basePose.pageHolderRotationX -
                openingProgress * 0.018 -
                pageTurnProgress * 0.045 +
                botanicalProgress * -0.012 +
                idleX * 0.008;
            pageHolderGroup.rotation.y =
                basePose.pageHolderRotationY + openingProgress * 0.04;
        }

        if (sheetsFrontGroup) {
            sheetsFrontGroup.position.y =
                basePose.sheetsFrontY + botanicalProgress * 0.03 + pageTurnProgress * 0.018;
            sheetsFrontGroup.position.z =
                basePose.sheetsFrontZ + holdProgress * 0.035 + pageTurnProgress * 0.045;
            sheetsFrontGroup.rotation.y =
                basePose.sheetsFrontRotationY + pageTurnProgress * 0.026;
        }

        if (sheetsBackGroup) {
            sheetsBackGroup.position.y =
                basePose.sheetsBackY - botanicalProgress * 0.026 - pageTurnProgress * 0.014;
            sheetsBackGroup.position.z =
                basePose.sheetsBackZ + openingProgress * 0.02 - pageTurnProgress * 0.028;
            sheetsBackGroup.rotation.y =
                basePose.sheetsBackRotationY - pageTurnProgress * 0.022;
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
