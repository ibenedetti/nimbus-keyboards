import * as THREE from "three";
import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { Float, useTexture } from "@react-three/drei";
import { useMemo } from "react";

export const Keyboard = forwardRef(({ keycapMaterial, knobColor, ...props }, ref) => {
  const { nodes, materials } = useGLTF("/keyboard.gltf");

  // Main structure refs
  const containerRef = useRef(null);
  const plateRef = useRef(null);
  const topCaseRef = useRef(null);
  const weightRef = useRef(null);
  const screenRef = useRef(null);
  const knobRef = useRef(null);

  // Switch group refs
  const switchFunctionRowRef = useRef(null);
  const switchNumberRowRef = useRef(null);
  const switchTopRowRef = useRef(null);
  const switchHomeRowRef = useRef(null);
  const switchBottomRowRef = useRef(null);
  const switchModifiersRef = useRef(null);
  const switchArrowsRef = useRef(null);

  // Keycap group refs
  const functionRowRef = useRef(null);
  const numberRowRef = useRef(null);
  const topRowRef = useRef(null);
  const homeRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const modifiersRef = useRef(null);
  const arrowsRef = useRef(null);

  // Individual key refs
  const keyRefs = {
    esc: useRef(null),
    f1: useRef(null),
    f2: useRef(null),
    f3: useRef(null),
    f4: useRef(null),
    f5: useRef(null),
    f6: useRef(null),
    f7: useRef(null),
    f8: useRef(null),
    f9: useRef(null),
    f10: useRef(null),
    f11: useRef(null),
    f12: useRef(null),
    del: useRef(null),
    grave: useRef(null),
    one: useRef(null),
    two: useRef(null),
    three: useRef(null),
    four: useRef(null),
    five: useRef(null),
    six: useRef(null),
    seven: useRef(null),
    eight: useRef(null),
    nine: useRef(null),
    zero: useRef(null),
    dash: useRef(null),
    equal: useRef(null),
    backspace: useRef(null),
    tab: useRef(null),
    q: useRef(null),
    w: useRef(null),
    e: useRef(null),
    r: useRef(null),
    t: useRef(null),
    y: useRef(null),
    u: useRef(null),
    i: useRef(null),
    o: useRef(null),
    p: useRef(null),
    lsquarebracket: useRef(null),
    rsquarebracket: useRef(null),
    backslash: useRef(null),
    pageup: useRef(null),
    caps: useRef(null),
    a: useRef(null),
    s: useRef(null),
    d: useRef(null),
    f: useRef(null),
    g: useRef(null),
    h: useRef(null),
    j: useRef(null),
    k: useRef(null),
    l: useRef(null),
    semicolon: useRef(null),
    quote: useRef(null),
    enter: useRef(null),
    pagedown: useRef(null),
    lshift: useRef(null),
    z: useRef(null),
    x: useRef(null),
    c: useRef(null),
    v: useRef(null),
    b: useRef(null),
    n: useRef(null),
    m: useRef(null),
    comma: useRef(null),
    period: useRef(null),
    slash: useRef(null),
    rshift: useRef(null),
    arrowup: useRef(null),
    end: useRef(null),
    lcontrol: useRef(null),
    lwin: useRef(null),
    lalt: useRef(null),
    space: useRef(null),
    ralt: useRef(null),
    fn: useRef(null),
    arrowleft: useRef(null),
    arrowdown: useRef(null),
    arrowright: useRef(null),
  };

  // Expose refs through imperative handle
  useImperativeHandle(ref, () => ({
    plate: plateRef,
    topCase: topCaseRef,
    weight: weightRef,
    screen: screenRef,
    knob: knobRef,
    switches: {
      functionRow: switchFunctionRowRef,
      numberRow: switchNumberRowRef,
      topRow: switchTopRowRef,
      homeRow: switchHomeRowRef,
      bottomRow: switchBottomRowRef,
      modifiers: switchModifiersRef,
      arrows: switchArrowsRef,
    },
    keycaps: {
      functionRow: functionRowRef,
      numberRow: numberRowRef,
      topRow: topRowRef,
      homeRow: homeRowRef,
      bottomRow: bottomRowRef,
      modifiers: modifiersRef,
      arrows: arrowsRef,
    },
    keys: keyRefs,
    container: containerRef,
  }));

  const loadedTexture = useTexture("/goodwell_uv.png");

  const keycapTexture = useMemo(() => {
    loadedTexture.flipY = false;
    loadedTexture.colorSpace = THREE.SRGBColorSpace;
    return loadedTexture;
  }, [loadedTexture]);

  const knurlImg = useTexture("/knurl.jpg");

  const knurlTexture = useMemo(() => {
    knurlImg.flipY = false;
    knurlImg.colorSpace = THREE.SRGBColorSpace;
    knurlImg.repeat.set(6,6);
    knurlImg.wrapS = THREE.RepeatWrapping;
    knurlImg.wrapT = THREE.RepeatWrapping;
    return knurlImg;
  }, [knurlImg]);

  const screenImg = useTexture("/screen_uv.png");

  const screenTexture = useMemo(() => {
    screenImg.flipY = false;
    screenImg.repeat.set(-1,-1);
    screenImg.offset.set(1,1);
    screenImg.colorSpace = THREE.SRGBColorSpace;
    return screenImg;
  }, [screenImg]);


  const knobMat = new THREE.MeshStandardMaterial({
    color: knobColor || "#e24818",
    roughness: 0.4,
    metalness: 1,
    bumpMap: knurlTexture,
    bumpScale: 0.8,
  });

  const plateMat = new THREE.MeshStandardMaterial({
    color: "#888888",
    roughness: 0.4,
  });

  const bottomCaseMat = new THREE.MeshStandardMaterial({
    color: "#1e548a",
    roughness: 0.4,
  });

  const topCaseMat = new THREE.MeshStandardMaterial({
    color: "#dddddd",
    roughness: 0.7,
  });
  
  const feetMat = new THREE.MeshStandardMaterial({
    color: "#333333",
    roughness: 0.6,
  });

  const screenMat = new THREE.MeshStandardMaterial({
    roughness: 0.4,
    map: screenTexture
  });

  const defaultKeycapMat = new THREE.MeshStandardMaterial({
    roughness: 0.7,
    map: keycapTexture,
  });

const keycapMat = keycapMaterial || defaultKeycapMat;

  const switchMat = new THREE.MeshStandardMaterial({
    color: "#cccccc",
    roughness: 0.4,
  });

  const switchStemMat = new THREE.MeshStandardMaterial({
    color: "#bb2222",
    roughness: 0.4,
  });

  const switchContactsMat = new THREE.MeshStandardMaterial({
    color: "#ffcf5f",
    roughness: 0.1,
    metalness: 1,
  });

  return (
    <group {...props} dispose={null} ref={containerRef}>
      <group position={[0.02, 0, 0]}>
        <mesh
          ref={plateRef}
          castShadow
          receiveShadow
          geometry={nodes.Plate.geometry}
          material={keycapMat}
          position={[-0.022, -0.006, -0.057]}
        />
        <mesh
          ref={knobRef}
          castShadow
          receiveShadow
          geometry={nodes.Knob.geometry}
          material={knobMat}
          position={[0.121, 0.004, -0.106]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PCB.geometry}
          material={plateMat}
          position={[-0.022, -0.009, -0.057]}
        />

        {/* Function Row Switches */}
        <group ref={switchFunctionRowRef}>
          {[
            -0.165, -0.145, -0.126, -0.107, -0.088, -0.069, -0.05, -0.031,
            -0.012, 0.007, 0.026, 0.045, 0.064,
          ].map((x, i) => (
            <group key={`switch-f-${i}`} position={[x, -0.002, -0.106]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002.geometry}
                material={switchMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_1.geometry}
                material={switchContactsMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_2.geometry}
                material={switchStemMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_3.geometry}
                material={switchMat}
              />
            </group>
          ))}
        </group>

        {/* Number Row Switches */}
        <group ref={switchNumberRowRef}>
          {[
            -0.165, -0.146, -0.127, -0.108, -0.089, -0.07, -0.051, -0.032,
            -0.013, 0.006, 0.025, 0.044, 0.063, 0.092, 0.121,
          ].map((x, i) => (
            <group key={`switch-n-${i}`} position={[x, -0.002, -0.087]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002.geometry}
                material={switchMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_1.geometry}
                material={switchContactsMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_2.geometry}
                material={switchStemMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_3.geometry}
                material={switchMat}
              />
            </group>
          ))}
        </group>

        {/* Top Row Switches */}
        <group ref={switchTopRowRef}>
          {[
            -0.16, -0.136, -0.117, -0.098, -0.079, -0.06, -0.041, -0.022,
            -0.003, 0.016, 0.035, 0.054, 0.073, 0.097, 0.121,
          ].map((x, i) => (
            <group key={`switch-t-${i}`} position={[x, -0.002, -0.068]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002.geometry}
                material={switchMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_1.geometry}
                material={switchContactsMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_2.geometry}
                material={switchStemMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_3.geometry}
                material={switchMat}
              />
            </group>
          ))}
        </group>

        {/* Home Row Switches */}
        <group ref={switchHomeRowRef}>
          {[
            -0.158, -0.132, -0.113, -0.094, -0.075, -0.056, -0.037, -0.018,
            0.001, 0.02, 0.039, 0.058, 0.09, 0.121,
          ].map((x, i) => (
            <group key={`switch-h-${i}`} position={[x, -0.002, -0.049]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002.geometry}
                material={switchMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_1.geometry}
                material={switchContactsMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_2.geometry}
                material={switchStemMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_3.geometry}
                material={switchMat}
              />
            </group>
          ))}
        </group>

         {/* Bottom Row Switches */}
        <group ref={switchBottomRowRef}>
          {[
            -0.153, -0.122, -0.103, -0.084, -0.065, -0.046, -0.027, -0.008,
            0.011, 0.03, 0.049, 0.076, 0.121,
          ].map((x, i) => (
            <group key={`switch-b-${i}`} position={[x, 0.0, -0.03]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002.geometry}
                material={switchMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_1.geometry}
                material={switchContactsMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_2.geometry}
                material={switchStemMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_3.geometry}
                material={switchMat}
              />
            </group>
          ))}
        </group>

        {/* Modifier Switches */}
        <group ref={switchModifiersRef}>
          {[
            [-0.162, -0.011],
            [-0.139, -0.011],
            [-0.115, -0.011],
            [-0.043, -0.01],
            [0.028, -0.011],
            [0.052, -0.011],
          ].map(([x, z], i) => (
            <group key={`switch-m-${i}`} position={[x, -0.002, z]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002.geometry}
                material={switchMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_1.geometry}
                material={switchContactsMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_2.geometry}
                material={switchStemMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_3.geometry}
                material={switchMat}
              />
            </group>
          ))}
        </group>

        {/* Arrow Switches */}
        <group ref={switchArrowsRef}>
          {[
            [0.102, -0.03],
            [0.083, -0.011],
            [0.102, -0.011],
            [0.121, -0.011],
          ].map(([x, z], i) => (
            <group key={`switch-a-${i}`} position={[x, -0.002, z]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002.geometry}
                material={switchMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_1.geometry}
                material={switchContactsMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_2.geometry}
                material={switchStemMat}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Switch_Heavy002_3.geometry}
                material={switchMat}
              />
            </group>
          ))}
        </group>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes["625u_Wire001"].geometry}
          material={materials.Gold}
          position={[-0.043, -0.001, -0.014]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <group position={[-0.022, -0.014, -0.057]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005.geometry}
            material={bottomCaseMat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_1.geometry}
            material={feetMat}
          />
        </group>
        <mesh
          ref={topCaseRef}
          castShadow
          receiveShadow
          geometry={nodes.Top_Case.geometry}
          material={topCaseMat}
          position={[-0.022, -0.014, -0.057]}
        />
        <mesh
          ref={weightRef}
          castShadow
          receiveShadow
          geometry={nodes.Weight.geometry}
          material={keycapMat}
          position={[-0.022, -0.014, -0.057]}
        />
        <mesh
          ref={screenRef}
          castShadow
          receiveShadow
          geometry={nodes.Screen.geometry}
          material={screenMat}
          position={[0.092, 0.001, -0.106]}
          scale={-1}
        />

        {/* Function Row */}
        <group ref={functionRowRef}>
          <mesh
            ref={keyRefs.esc}
            castShadow
            receiveShadow
            geometry={nodes.K_ESC.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f1}
            castShadow
            receiveShadow
            geometry={nodes.K_F1.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f2}
            castShadow
            receiveShadow
            geometry={nodes.K_F2.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f3}
            castShadow
            receiveShadow
            geometry={nodes.K_F3.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f4}
            castShadow
            receiveShadow
            geometry={nodes.K_F4.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f5}
            castShadow
            receiveShadow
            geometry={nodes.K_F5.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f6}
            castShadow
            receiveShadow
            geometry={nodes.K_F6.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f7}
            castShadow
            receiveShadow
            geometry={nodes.K_F7.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f8}
            castShadow
            receiveShadow
            geometry={nodes.K_F8.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f9}
            castShadow
            receiveShadow
            geometry={nodes.K_F9.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f10}
            castShadow
            receiveShadow
            geometry={nodes.K_F10.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f11}
            castShadow
            receiveShadow
            geometry={nodes.K_F11.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.f12}
            castShadow
            receiveShadow
            geometry={nodes.K_F12.geometry}
            material={keycapMat}
            position={[-0.051, 0.01, -0.106]}
          />
          <mesh
            ref={keyRefs.del}
            castShadow
            receiveShadow
            geometry={nodes.K_DEL.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
        </group>

        {/* Number Row */}
        <group ref={numberRowRef}>
          <mesh
            ref={keyRefs.grave}
            castShadow
            receiveShadow
            geometry={nodes.K_GRAVE.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.one}
            castShadow
            receiveShadow
            geometry={nodes.K_1.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.two}
            castShadow
            receiveShadow
            geometry={nodes.K_2.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.three}
            castShadow
            receiveShadow
            geometry={nodes.K_3.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.four}
            castShadow
            receiveShadow
            geometry={nodes.K_4.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.five}
            castShadow
            receiveShadow
            geometry={nodes.K_5.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.six}
            castShadow
            receiveShadow
            geometry={nodes.K_6.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.seven}
            castShadow
            receiveShadow
            geometry={nodes.K_7.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.eight}
            castShadow
            receiveShadow
            geometry={nodes.K_8.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.nine}
            castShadow
            receiveShadow
            geometry={nodes.K_9.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.zero}
            castShadow
            receiveShadow
            geometry={nodes.K_0.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.dash}
            castShadow
            receiveShadow
            geometry={nodes.K_DASH.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.equal}
            castShadow
            receiveShadow
            geometry={nodes.K_EQUAL.geometry}
            material={keycapMat}
            position={[-0.165, 0.01, -0.087]}
          />
          <mesh
            ref={keyRefs.backspace}
            castShadow
            receiveShadow
            geometry={nodes.K_BACKSPACE.geometry}
            material={keycapMat}
            position={[0.092, 0, -0.087]}
          />
        </group>

        // This is a continuation - insert after Number Row in Part 2

        {/* Top Row (QWERTY) */}
        <group ref={topRowRef}>
          <mesh
            ref={keyRefs.tab}
            castShadow
            receiveShadow
            geometry={nodes.K_TAB.geometry}
            material={keycapMat}
            position={[-0.16, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.q}
            castShadow
            receiveShadow
            geometry={nodes.K_Q.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.w}
            castShadow
            receiveShadow
            geometry={nodes.K_W.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.e}
            castShadow
            receiveShadow
            geometry={nodes.K_E.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.r}
            castShadow
            receiveShadow
            geometry={nodes.K_R.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.t}
            castShadow
            receiveShadow
            geometry={nodes.K_T.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.y}
            castShadow
            receiveShadow
            geometry={nodes.K_Y.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.u}
            castShadow
            receiveShadow
            geometry={nodes.K_U.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.i}
            castShadow
            receiveShadow
            geometry={nodes.K_I.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.o}
            castShadow
            receiveShadow
            geometry={nodes.K_O.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.p}
            castShadow
            receiveShadow
            geometry={nodes.K_P.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.lsquarebracket}
            castShadow
            receiveShadow
            geometry={nodes.K_LSQUAREBRACKET.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.rsquarebracket}
            castShadow
            receiveShadow
            geometry={nodes.K_RSQUAREBRACKET.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.backslash}
            castShadow
            receiveShadow
            geometry={nodes.K_BACKSLASH.geometry}
            material={keycapMat}
            position={[-0.16, 0.008, -0.068]}
          />
          <mesh
            ref={keyRefs.pageup}
            castShadow
            receiveShadow
            geometry={nodes.K_PAGEUP.geometry}
            material={keycapMat}
            position={[-0.136, 0.008, -0.068]}
          />
        </group>

        {/* Home Row (ASDF) */}
        <group ref={homeRowRef}>
          <mesh
            ref={keyRefs.caps}
            castShadow
            receiveShadow
            geometry={nodes.K_CAPS.geometry}
            material={keycapMat}
            position={[-0.158, 0, -0.049]}
          />
          <mesh
            ref={keyRefs.a}
            castShadow
            receiveShadow
            geometry={nodes.K_A.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.s}
            castShadow
            receiveShadow
            geometry={nodes.K_S.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.d}
            castShadow
            receiveShadow
            geometry={nodes.K_D.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.f}
            castShadow
            receiveShadow
            geometry={nodes.K_F.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.g}
            castShadow
            receiveShadow
            geometry={nodes.K_G.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.h}
            castShadow
            receiveShadow
            geometry={nodes.K_H.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.j}
            castShadow
            receiveShadow
            geometry={nodes.K_J.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.k}
            castShadow
            receiveShadow
            geometry={nodes.K_K.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.l}
            castShadow
            receiveShadow
            geometry={nodes.K_L.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.semicolon}
            castShadow
            receiveShadow
            geometry={nodes.K_SEMICOLON.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.quote}
            castShadow
            receiveShadow
            geometry={nodes.K_QUOTE.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
          <mesh
            ref={keyRefs.enter}
            castShadow
            receiveShadow
            geometry={nodes.K_ENTER.geometry}
            material={keycapMat}
            position={[0.09, 0, -0.049]}
          />
          <mesh
            ref={keyRefs.pagedown}
            castShadow
            receiveShadow
            geometry={nodes.K_PAGEDOWN.geometry}
            material={keycapMat}
            position={[-0.132, 0.007, -0.049]}
          />
        </group>

         {/* Bottom Row (ZXCV) */}
        <group ref={bottomRowRef}>
          <mesh
            ref={keyRefs.lshift}
            castShadow
            receiveShadow
            geometry={nodes.K_LSHIFT.geometry}
            material={keycapMat}
            position={[-0.153, 0, -0.03]}
          />
          <mesh
            ref={keyRefs.z}
            castShadow
            receiveShadow
            geometry={nodes.K_Z.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.x}
            castShadow
            receiveShadow
            geometry={nodes.K_X.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.c}
            castShadow
            receiveShadow
            geometry={nodes.K_C.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.v}
            castShadow
            receiveShadow
            geometry={nodes.K_V.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.b}
            castShadow
            receiveShadow
            geometry={nodes.K_B.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.n}
            castShadow
            receiveShadow
            geometry={nodes.K_N.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.m}
            castShadow
            receiveShadow
            geometry={nodes.K_M.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.comma}
            castShadow
            receiveShadow
            geometry={nodes.K_COMMA.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.period}
            castShadow
            receiveShadow
            geometry={nodes.K_PERIOD.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.slash}
            castShadow
            receiveShadow
            geometry={nodes.K_SLASH.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.rshift}
            castShadow
            receiveShadow
            geometry={nodes.K_RSHIFT.geometry}
            material={keycapMat}
            position={[0.076, 0, -0.03]}
          />
          <mesh
            ref={keyRefs.arrowup}
            castShadow
            receiveShadow
            geometry={nodes.K_ARROWUP.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
          <mesh
            ref={keyRefs.end}
            castShadow
            receiveShadow
            geometry={nodes.K_END.geometry}
            material={keycapMat}
            position={[-0.122, 0.008, -0.03]}
          />
        </group>

        {/* Modifiers */}
        <group ref={modifiersRef}>
          <mesh
            ref={keyRefs.lcontrol}
            castShadow
            receiveShadow
            geometry={nodes.K_LCONTROL.geometry}
            material={keycapMat}
            position={[-0.162, 0.008, -0.011]}
          />
          <mesh
            ref={keyRefs.lwin}
            castShadow
            receiveShadow
            geometry={nodes.K_LWIN.geometry}
            material={keycapMat}
            position={[-0.162, 0.008, -0.011]}
          />
          <mesh
            ref={keyRefs.lalt}
            castShadow
            receiveShadow
            geometry={nodes.K_LALT.geometry}
            material={keycapMat}
            position={[-0.162, 0.008, -0.011]}
          />
          <mesh
            ref={keyRefs.space}
            castShadow
            receiveShadow
            geometry={nodes.K_SPACE.geometry}
            material={keycapMat}
            position={[-0.043, 0, -0.01]}
          />
          <mesh
            ref={keyRefs.ralt}
            castShadow
            receiveShadow
            geometry={nodes.K_RALT.geometry}
            material={keycapMat}
            position={[-0.162, 0.008, -0.011]}
          />
          <mesh
            ref={keyRefs.fn}
            castShadow
            receiveShadow
            geometry={nodes.K_FN.geometry}
            material={keycapMat}
            position={[-0.162, 0.008, -0.011]}
          />
        </group>

        {/* Arrow Keys */}
        <group ref={arrowsRef}>
          <mesh
            ref={keyRefs.arrowleft}
            castShadow
            receiveShadow
            geometry={nodes.K_ARROWLEFT.geometry}
            material={keycapMat}
            position={[0.083, 0.008, -0.011]}
          />
          <mesh
            ref={keyRefs.arrowdown}
            castShadow
            receiveShadow
            geometry={nodes.K_ARROWDOWN.geometry}
            material={keycapMat}
            position={[0.083, 0.008, -0.011]}
          />
          <mesh
            ref={keyRefs.arrowright}
            castShadow
            receiveShadow
            geometry={nodes.K_ARROWRIGHT.geometry}
            material={keycapMat}
            position={[0.083, 0.008, -0.011]}
          />
        </group>

        <instancedMesh
          args={[nodes["2U_Wires"].geometry, materials.Gold, 3]}
          castShadow
          receiveShadow
          instanceMatrix={nodes["2U_Wires"].instanceMatrix}
          position={[0.092, 0.009, -0.086]}
        />
        <instancedMesh
          args={[nodes.Stab_Housing_Instances.geometry, materials.Stem, 8]}
          castShadow
          receiveShadow
          instanceMatrix={nodes.Stab_Housing_Instances.instanceMatrix}
          position={[0.08, -0.004, -0.085]}
        />
      </group>
    </group>
  );
});

Keyboard.displayName = "Keyboard";

useGLTF.preload("/keyboard.gltf");