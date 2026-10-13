/**
 * SpatialCommerce 3D — Core Application Script
 * Orchestrated for Multi-Subject Capstone Project
 * Integrates Three.js, WebXR Device API, and AI Spatial UI Command Processor
 */

// Scene Globals
let scene, camera, renderer, controls;
let productGroup, chassisMesh, dialMesh, strapMesh, crownMesh, accentMesh;
let isRotating = true;
let isWireframe = false;
let cameraRig;

// Preset Catalog for AI Spatial Engine
const AI_STYLE_PRESETS = {
    cyberpunk: {
        name: "Cyberpunk Neon",
        chassisColor: 0x111625,
        accentColor: 0x00f0ff,
        strapColor: 0x1f1b2e,
        metalness: 0.9,
        roughness: 0.2,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.6,
        chassisLabel: "Dark Anodized Aluminum",
        finishLabel: "Neon Photonic Luminescence"
    },
    stealth: {
        name: "Stealth Matte Black",
        chassisColor: 0x1a1a1a,
        accentColor: 0x2e2e2e,
        strapColor: 0x0f0f0f,
        metalness: 0.2,
        roughness: 0.85,
        emissive: 0x000000,
        emissiveIntensity: 0.0,
        chassisLabel: "Cerakote Matte Composite",
        finishLabel: "Non-Reflective Stealth"
    },
    luxury: {
        name: "24K Royal Gold",
        chassisColor: 0xffd700,
        accentColor: 0xffaa00,
        strapColor: 0x2b1d0c,
        metalness: 0.95,
        roughness: 0.15,
        emissive: 0x553300,
        emissiveIntensity: 0.2,
        chassisLabel: "24-Karat Forged Gold",
        finishLabel: "Mirror Hand-Polished"
    },
    emerald: {
        name: "Titanium Emerald",
        chassisColor: 0x2c4a3e,
        accentColor: 0x00ff88,
        strapColor: 0x142b20,
        metalness: 0.8,
        roughness: 0.3,
        emissive: 0x003311,
        emissiveIntensity: 0.3,
        chassisLabel: "Aerospace Emerald Ti-64",
        finishLabel: "Micro-Satin Brushed"
    },
    ruby: {
        name: "Crimson Gloss",
        chassisColor: 0x8b0000,
        accentColor: 0xff2a55,
        strapColor: 0x2d0c14,
        metalness: 0.7,
        roughness: 0.1,
        emissive: 0x440011,
        emissiveIntensity: 0.4,
        chassisLabel: "Liquid Crimson Ceramic",
        finishLabel: "High-Gloss Clearcoat"
    }
};

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    buildProceduralProduct();
    setupLighting();
    setupWebXR();
    setupUIEventListeners();
    animate();
});

/**
 * 1. Initialize Three.js Engine & Viewport
 */
function initThreeScene() {
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera Rig
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1322);

    cameraRig = new THREE.Group();
    scene.add(cameraRig);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);
    cameraRig.add(camera);

    // Renderer with Tone Mapping & XR support
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    // Orbit Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 8;
    controls.minDistance = 1.5;
    controls.target.set(0, 0, 0);

    // Responsive Resize Listener
    window.addEventListener('resize', onWindowResize);
}

/**
 * 2. Build High-Fidelity Procedural 3D Smartwatch Geometry
 */
function buildProceduralProduct() {
    productGroup = new THREE.Group();

    // A. Main Chassis / Case (Cylinder with chamfered geometry)
    const caseGeom = new THREE.CylinderGeometry(1.0, 1.0, 0.35, 64);
    const caseMat = new THREE.MeshStandardMaterial({
        color: 0x111625,
        metalness: 0.9,
        roughness: 0.25,
        envMapIntensity: 1.0
    });
    chassisMesh = new THREE.Mesh(caseGeom, caseMat);
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    productGroup.add(chassisMesh);

    // B. Bezel Accent Ring
    const ringGeom = new THREE.TorusGeometry(1.02, 0.06, 32, 100);
    const accentMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.5
    });
    accentMesh = new THREE.Mesh(ringGeom, accentMat);
    accentMesh.rotation.x = Math.PI / 2;
    accentMesh.position.y = 0.16;
    productGroup.add(accentMesh);

    // C. Digital Photonic Dial Screen (Inner Face)
    const dialGeom = new THREE.CylinderGeometry(0.92, 0.92, 0.02, 64);
    const dialMat = new THREE.MeshStandardMaterial({
        color: 0x050811,
        metalness: 0.1,
        roughness: 0.1,
        emissive: 0x003344,
        emissiveIntensity: 0.4
    });
    dialMesh = new THREE.Mesh(dialGeom, dialMat);
    dialMesh.position.y = 0.18;
    productGroup.add(dialMesh);

    // Procedural Dial Markers (Ticks)
    const ticksGroup = new THREE.Group();
    for (let i = 0; i < 12; i++) {
        const tickGeom = new THREE.BoxGeometry(0.04, 0.01, 0.12);
        const tickMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
        const tick = new THREE.Mesh(tickGeom, tickMat);
        const angle = (i / 12) * Math.PI * 2;
        tick.position.set(Math.sin(angle) * 0.78, 0.19, Math.cos(angle) * 0.78);
        tick.rotation.y = angle;
        ticksGroup.add(tick);
    }
    productGroup.add(ticksGroup);

    // D. Digital Sensor Crown (Right-side button)
    const crownGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 32);
    crownGeom.rotateZ(Math.PI / 2);
    const crownMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        metalness: 0.9,
        roughness: 0.3
    });
    crownMesh = new THREE.Mesh(crownGeom, crownMat);
    crownMesh.position.set(1.08, 0, 0);
    crownMesh.castShadow = true;
    productGroup.add(crownMesh);

    // E. Ergonomic Silicone / Mesh Wrist Straps (Top and Bottom)
    const strapMat = new THREE.MeshStandardMaterial({
        color: 0x1f1b2e,
        metalness: 0.1,
        roughness: 0.8
    });

    // Top Strap
    const topStrapGeom = new THREE.BoxGeometry(0.85, 0.14, 1.4);
    const topStrap = new THREE.Mesh(topStrapGeom, strapMat);
    topStrap.position.set(0, -0.05, -1.45);
    topStrap.rotation.x = -0.22;
    topStrap.castShadow = true;
    productGroup.add(topStrap);

    // Bottom Strap
    const botStrapGeom = new THREE.BoxGeometry(0.85, 0.14, 1.4);
    const botStrap = new THREE.Mesh(botStrapGeom, strapMat);
    botStrap.position.set(0, -0.05, 1.45);
    botStrap.rotation.x = 0.22;
    botStrap.castShadow = true;
    productGroup.add(botStrap);

    strapMesh = [topStrap, botStrap];

    // Initial slight tilt for optimal beauty shot
    productGroup.rotation.x = 0.35;
    productGroup.rotation.y = -0.4;
    scene.add(productGroup);
}

/**
 * 3. Studio Lighting Rig
 */
function setupLighting() {
    // Ambient / Hemisphere Light
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1b2033, 0.7);
    scene.add(hemiLight);

    // Key Light (Warm Direct Light with Soft Shadow)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Fill Light (Cool Cyan Tone)
    const fillLight = new THREE.PointLight(0x00f0ff, 1.2, 20);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    // Rim Light (Purple Backlight for Depth)
    const rimLight = new THREE.PointLight(0x9d4edd, 1.0, 15);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);
}

/**
 * 4. WebXR Session Bridge (Includes Bugfix from Post-Mortem)
 */
function setupWebXR() {
    const mountPoint = document.getElementById('xr-button-mount');
    if (window.VRButton) {
        const vrBtn = VRButton.createButton(renderer);
        mountPoint.appendChild(vrBtn);

        // Academic Bugfix Listener: Detach OrbitControls during WebXR active session
        renderer.xr.addEventListener('sessionstart', () => {
            controls.enabled = false;
            cameraRig.position.set(0, 1.0, 1.8);
            console.log('[WebXR] Session engaged: OrbitControls detached cleanly.');
        });

        renderer.xr.addEventListener('sessionend', () => {
            controls.enabled = true;
            camera.position.set(0, 1.2, 3.8);
            controls.target.set(0, 0, 0);
            console.log('[WebXR] Session ended: Desktop OrbitControls restored.');
        });
    }
}

/**
 * 5. UI Interaction & AI Spatial Interface
 */
function setupUIEventListeners() {
    // Turntable Toggle
    document.getElementById('btn-rotate').addEventListener('click', () => {
        isRotating = !isRotating;
    });

    // Reset Camera
    document.getElementById('btn-reset-cam').addEventListener('click', () => {
        camera.position.set(0, 1.2, 3.8);
        controls.target.set(0, 0, 0);
        productGroup.rotation.set(0.35, -0.4, 0);
    });

    // Toggle Wireframe
    document.getElementById('btn-wireframe').addEventListener('click', () => {
        isWireframe = !isWireframe;
        productGroup.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.wireframe = isWireframe;
            }
        });
    });

    // AI Natural Language Input Submit
    const promptInput = document.getElementById('ai-prompt-input');
    const submitBtn = document.getElementById('btn-ai-submit');

    const handlePrompt = () => {
        const text = promptInput.value.trim();
        if (text) {
            executeNaturalLanguageAICommand(text);
        }
    };

    submitBtn.addEventListener('click', handlePrompt);
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handlePrompt();
    });

    // Preset Chips
    document.querySelectorAll('.chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const presetKey = btn.dataset.preset;
            if (AI_STYLE_PRESETS[presetKey]) {
                applyPreset(AI_STYLE_PRESETS[presetKey]);
            }
        });
    });
}

/**
 * 6. AI Spatial UI Natural Language Interpreter
 */
function executeNaturalLanguageAICommand(userPrompt) {
    showAIStatus(`AI Agent analyzing prompt: "${userPrompt}"...`);

    const lower = userPrompt.toLowerCase();
    let config = { ...AI_STYLE_PRESETS.cyberpunk };

    if (lower.includes('gold') || lower.includes('luxury') || lower.includes('yellow')) {
        config = AI_STYLE_PRESETS.luxury;
    } else if (lower.includes('stealth') || lower.includes('black') || lower.includes('dark')) {
        config = AI_STYLE_PRESETS.stealth;
    } else if (lower.includes('emerald') || lower.includes('green') || lower.includes('nature')) {
        config = AI_STYLE_PRESETS.emerald;
    } else if (lower.includes('ruby') || lower.includes('red') || lower.includes('crimson')) {
        config = AI_STYLE_PRESETS.ruby;
    } else if (lower.includes('cyberpunk') || lower.includes('neon') || lower.includes('cyan')) {
        config = AI_STYLE_PRESETS.cyberpunk;
    } else {
        // Dynamic semantic extraction for arbitrary queries
        if (lower.includes('white') || lower.includes('silver')) {
            config.chassisColor = 0xe0e6ed;
            config.metalness = 0.95;
            config.roughness = 0.1;
            config.chassisLabel = "Silver Alloy";
            config.finishLabel = "Mirror Polish";
        }
    }

    setTimeout(() => {
        applyPreset(config);
        showAIStatus(`Applied styling: ${config.name}`);
        setTimeout(hideAIStatus, 2500);
    }, 600);
}

function applyPreset(preset) {
    // Morph Chassis Material
    chassisMesh.material.color.setHex(preset.chassisColor);
    chassisMesh.material.metalness = preset.metalness;
    chassisMesh.material.roughness = preset.roughness;

    // Morph Accent Bezel
    accentMesh.material.color.setHex(preset.accentColor);
    accentMesh.material.emissive.setHex(preset.emissive);
    accentMesh.material.emissiveIntensity = preset.emissiveIntensity;

    // Morph Straps
    strapMesh.forEach(strap => {
        strap.material.color.setHex(preset.strapColor);
        strap.material.roughness = preset.roughness > 0.5 ? 0.9 : 0.4;
    });

    // Update Hardware Labels in DOM
    document.getElementById('spec-chassis').textContent = preset.chassisLabel;
    document.getElementById('spec-finish').textContent = preset.finishLabel;
}

function showAIStatus(msg) {
    const pill = document.getElementById('ai-status-pill');
    document.getElementById('status-text').textContent = msg;
    pill.classList.remove('hidden');
}

function hideAIStatus() {
    const pill = document.getElementById('ai-status-pill');
    pill.classList.add('hidden');
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

/**
 * 7. 60 FPS Render Loop
 */
function animate() {
    renderer.setAnimationLoop(() => {
        if (isRotating && !renderer.xr.isPresenting) {
            productGroup.rotation.y += 0.006;
        }
        controls.update();
        renderer.render(scene, camera);
    });
}
