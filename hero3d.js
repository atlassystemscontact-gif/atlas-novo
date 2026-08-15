(() => {
  "use strict";

  const canvas = document.getElementById("hero-canvas");
  const scene = document.getElementById("scene");

  if (!canvas || !scene) return;

  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "high-performance",
  });

  if (!gl) {
    scene.classList.add("webgl-fallback");
    return;
  }

  const vertexShader = `#version 300 es
    in vec2 aPosition;
    out vec2 vUv;

    void main() {
      vUv = aPosition * .5 + .5;
      gl_Position = vec4(aPosition, 0., 1.);
    }
  `;

  const gradientShader = `#version 300 es
    precision highp float;

    in vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    out vec4 color;

    uvec2 hashPcg(uvec2 value) {
      value = value * 1664525u + 1013904223u;
      value.x += value.y * value.y * 1664525u + 1013904223u;
      value.y += value.x * value.x * 1664525u + 1013904223u;
      value ^= value >> 16u;
      value.x += value.y * value.y * 1664525u + 1013904223u;
      value.y += value.x * value.x * 1664525u + 1013904223u;
      return value;
    }

    float noise(vec2 point) {
      uvec2 value = floatBitsToUint(point);
      value = hashPcg(value);
      return float(value.x ^ value.y) / 4294967295.;
    }

    float grayValue(int index) {
      if (index == 0) return 0.;
      if (index == 1) return .16078;
      if (index == 2) return .39215;
      if (index == 3) return .61568;
      if (index == 4) return .81568;
      return 1.;
    }

    vec3 linearColor(float value) {
      return vec3(pow(max(value, 0.), 2.2));
    }

    vec3 srgbColor(vec3 value) {
      return pow(max(value, vec3(0.)), vec3(1. / 2.2));
    }

    vec3 cubeRoot(vec3 value) {
      return sign(value) * pow(abs(value), vec3(1. / 3.));
    }

    vec3 oklabMix(vec3 from, vec3 to, float amount) {
      const mat3 linearToLms = mat3(
        .41216, .21185, .0883,
        .53627, .68071, .28184,
        .05145, .1074, .63026
      );
      const mat3 lmsToLinear = mat3(
        4.07672, -1.26814, -.00411,
        -3.30721, 2.60933, -.70347,
        .23075, -.34113, 1.70686
      );
      vec3 first = cubeRoot(linearToLms * from);
      vec3 second = cubeRoot(linearToLms * to);
      vec3 mixed = mix(first, second, amount);
      mixed *= 1. + .025 * amount * (1. - amount);
      return lmsToLinear * (mixed * mixed * mixed);
    }

    vec3 gradientColor(float position) {
      position = clamp(position, 0., 1.);
      for (int index = 0; index < 5; index++) {
        float start = float(index) * .2;
        float end = float(index + 1) * .2;
        if (position <= end || index == 4) {
          float amount = clamp((position - start) / max(end - start, .00001), 0., 1.);
          return srgbColor(oklabMix(linearColor(grayValue(index)), linearColor(grayValue(index + 1)), amount));
        }
      }
      return vec3(1.);
    }

    vec2 rotatePoint(vec2 value, float angle) {
      float sine = sin(angle);
      float cosine = cos(angle);
      return vec2(value.x * cosine - value.y * sine, value.x * sine + value.y * cosine);
    }

    const float PI = 3.14159265359;

    void main() {
      vec2 center = vec2(.5069, .9874) + mix(vec2(0.), (uMouse - .5), .77);
      vec2 uv = rotatePoint((vUv - center) / 1.46, (.7506 - .5) * 2. * PI);
      float ring = length(uv) - uTime * .0625;
      bool reverseRing = int(floor(ring)) % 2 == 0;
      float position = reverseRing ? 1. - fract(ring) : fract(ring);
      vec3 result = gradientColor(position);
      result += (noise(gl_FragCoord.xy) - .5) / 255.;
      color = vec4(result, 1.);
    }
  `;

  const textShader = `#version 300 es
    precision highp float;

    in vec2 vUv;
    uniform sampler2D uGradient;
    uniform sampler2D uText;
    out vec4 color;

    void main() {
      vec4 background = texture(uGradient, vUv);
      vec4 type = texture(uText, vec2(vUv.x, 1. - vUv.y));
      color = vec4(mix(background.rgb, type.rgb, type.a), 1.);
    }
  `;

  const objectShader = `#version 300 es
    precision highp float;
    precision highp int;

    in vec2 vUv;
    uniform sampler2D uBackground;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uMorph;
    out vec4 color;

    const float PI = 3.14159265359;
    const vec3 CAMERA = vec3(0., 0., -4.25);

    mat3 rotateX(float angle) {
      float cosine = cos(angle), sine = sin(angle);
      return mat3(1, 0, 0, 0, cosine, -sine, 0, sine, cosine);
    }

    mat3 rotateY(float angle) {
      float cosine = cos(angle), sine = sin(angle);
      return mat3(cosine, 0, sine, 0, 1, 0, -sine, 0, cosine);
    }

    mat3 rotateZ(float angle) {
      float cosine = cos(angle), sine = sin(angle);
      return mat3(cosine, -sine, 0, sine, cosine, 0, 0, 0, 1);
    }

    float boxDistance(vec3 point, vec3 bounds) {
      vec3 distance = abs(point) - bounds;
      return length(max(distance, 0.)) + min(max(distance.x, max(distance.y, distance.z)), 0.);
    }

    float atlasMark(vec3 point) {
      point = vec3(-point.z, point.y, point.x);
      vec3 beam = vec3(.125, .75, .225);
      float result = boxDistance(point, beam);
      result = min(result, boxDistance(rotateZ(PI * .25) * point, beam));
      result = min(result, boxDistance(rotateZ(PI * .5) * point, beam));
      result = min(result, boxDistance(rotateZ(PI * .75) * point, beam));
      return result;
    }

    vec3 transformPoint(vec3 point) {
      vec3 transformed = point / .3 * vec3(uResolution.x / uResolution.y, 1., 1.) * (1. + uMorph + .01);
      vec2 axis = vec2(-1.5278, .5) * 2.;
      transformed = rotateY(uTime * .25) * rotateZ(.4167 * 2. * PI) * rotateY(axis.y * PI) * rotateX(axis.x * PI) * transformed;
      return transformed.xzy;
    }

    float signedDistance(vec3 point) {
      return max(.0000000001, atlasMark(transformPoint(point)) - (uMorph + .005)) * .3;
    }

    vec3 surfaceNormal(vec3 point, float epsilon) {
      vec2 offset = vec2(1., -1.) * epsilon * .5;
      return normalize(
        offset.xyy * atlasMark(transformPoint(point + offset.xyy)) +
        offset.yyx * atlasMark(transformPoint(point + offset.yyx)) +
        offset.yxy * atlasMark(transformPoint(point + offset.yxy)) +
        offset.xxx * atlasMark(transformPoint(point + offset.xxx))
      );
    }

    float interleavedNoise(vec2 seed) {
      return fract(52.9829189 * fract(dot(seed, vec2(.06711056, .00583715))));
    }

    vec3 chromaticRefraction(vec3 ray, vec3 normal) {
      float baseIor = 1.035;
      vec3 spread = vec3(.03, .06, .1) * .288;
      vec3 result = vec3(0.);
      for (int index = 0; index < 4; index++) {
        float samplePosition = float(index) * .25 + .125;
        vec3 ior = 1. / (baseIor + samplePosition * spread);
        vec3 redRay = refract(ray, normal, ior.r);
        vec3 greenRay = refract(ray, normal, ior.g);
        vec3 blueRay = refract(ray, normal, ior.b);
        result += vec3(
          texture(uBackground, vUv - redRay.xy).r,
          texture(uBackground, vUv - greenRay.xy).g,
          texture(uBackground, vUv - blueRay.xy).b
        );
      }
      return clamp(result * .25, 0., 1.);
    }

    float fresnel(vec3 eye, vec3 normal, float power) {
      float normalDotView = abs(dot(eye, normal));
      float edge = smoothstep(.2, -.2, fwidth(dot(eye, normal)));
      return pow(1. - normalDotView, power) * mix(1., edge * 2., .5);
    }

    uvec2 hashPcg(uvec2 value) {
      value = value * 1664525u + 1013904223u;
      value.x += value.y * value.y * 1664525u + 1013904223u;
      value.y += value.x * value.x * 1664525u + 1013904223u;
      value ^= value >> 16u;
      value.x += value.y * value.y * 1664525u + 1013904223u;
      value.y += value.x * value.x * 1664525u + 1013904223u;
      return value;
    }

    float noise(vec2 point) {
      uvec2 value = floatBitsToUint(point);
      value = hashPcg(value);
      return float(value.x ^ value.y) / 4294967295.;
    }

    vec4 rayMarch(vec3 origin, vec3 direction) {
      float threshold = .005;
      float jitter = interleavedNoise(gl_FragCoord.xy);
      float travel = jitter;
      bool hit = false;
      vec3 endpoint = vec3(0.);
      vec3 normal = vec3(0.);

      for (int index = 0; index < 48; index++) {
        vec3 point = origin + direction * travel;
        float distance = signedDistance(point);
        float progress = float(index) / 48.;
        float stepSize = distance * mix(.5, 2., progress) * mix(1., jitter + .5, 1. - progress);

        if (distance > 100.) break;
        if (distance < threshold) {
          hit = true;
          endpoint = point;
          normal = surfaceNormal(point, threshold * 1.6);
          break;
        }

        travel += max(stepSize, threshold);
        if (travel > 100.) break;
      }

      if (!hit) return texture(uBackground, vUv);

      vec3 result = chromaticRefraction(direction, normal);
      vec3 accent = vec3(.83529, .96862, .29803);
      result += fresnel(direction, normal, 8.) * .5 * accent;
      vec3 lightDirection = vec3(-.749, .751, -3.);
      result += pow(max(dot(normal, normalize(lightDirection + direction)), 0.), 64.01) * accent;
      result += (noise(vUv) - .5) / 255.;
      return vec4(result, 1.);
    }

    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(.5) + mix(vec2(0.), (uMouse - .5), .77);
      uv -= center;
      vec3 direction = vec3(uv * tan(radians(20.) * .5), .5);
      color = rayMarch(CAMERA, direction);
    }
  `;

  const aberrationShader = `#version 300 es
    precision highp float;

    in vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uAmount;
    out vec4 color;

    const float PI = 3.14159265359;

    void main() {
      float ratio = uResolution.x / uResolution.y;
      float angle = ((.2349 + uTime * .3125) * 360.) * PI / 180.;
      vec2 axis = vec2(sin(angle), cos(angle));
      vec4 result = texture(uTexture, vUv);
      float mask = max(0., 1. - distance(vUv * vec2(ratio, 1.), vec2(.5 * ratio, .5)) * 4.);
      vec2 offset = uAmount * axis * .03 * mask;

      if (length(offset) >= .001) {
        result.r = texture(uTexture, vUv - offset).r;
        result.b = texture(uTexture, vUv + offset).b;
      }

      color = result;
    }
  `;

  function compileShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Atlas WebGL shader error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(fragmentSource) {
    const vertex = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fragment = compileShader(fragmentSource, gl.FRAGMENT_SHADER);
    if (!vertex || !fragment) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Atlas WebGL program error:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  function createFrameBuffer(width, height) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { frameBuffer, texture };
  }

  const gradientProgram = createProgram(gradientShader);
  const textProgram = createProgram(textShader);
  const objectProgram = createProgram(objectShader);
  const aberrationProgram = createProgram(aberrationShader);

  if (!gradientProgram || !textProgram || !objectProgram || !aberrationProgram) {
    scene.classList.add("webgl-fallback");
    canvas.hidden = true;
    return;
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  function bindQuad(program) {
    const location = gl.getAttribLocation(program, "aPosition");
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  }

  const uniform = (program, name) => gl.getUniformLocation(program, name);
  const gradientUniforms = {
    time: uniform(gradientProgram, "uTime"),
    mouse: uniform(gradientProgram, "uMouse"),
  };
  const textUniforms = {
    gradient: uniform(textProgram, "uGradient"),
    text: uniform(textProgram, "uText"),
  };
  const objectUniforms = {
    background: uniform(objectProgram, "uBackground"),
    time: uniform(objectProgram, "uTime"),
    mouse: uniform(objectProgram, "uMouse"),
    resolution: uniform(objectProgram, "uResolution"),
    morph: uniform(objectProgram, "uMorph"),
  };
  const aberrationUniforms = {
    texture: uniform(aberrationProgram, "uTexture"),
    time: uniform(aberrationProgram, "uTime"),
    resolution: uniform(aberrationProgram, "uResolution"),
    amount: uniform(aberrationProgram, "uAmount"),
  };

  let width = 1;
  let height = 1;
  let textTexture = null;
  let gradientBuffer;
  let compositeBuffer;
  let objectBuffer;

  function buildTextTexture() {
    const typeCanvas = document.createElement("canvas");
    typeCanvas.width = width;
    typeCanvas.height = height;
    const context = typeCanvas.getContext("2d");
    const mobile = width / (window.devicePixelRatio || 1) < 700;
    const fontSize = width * (mobile ? .154 : .174);
    const lineHeight = fontSize * .81;
    const rightEdge = width * (mobile ? .94 : .96);
    const centerY = height * (mobile ? .5 : .51);

    context.clearRect(0, 0, width, height);
    context.fillStyle = "#000000";
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.font = `650 ${fontSize}px "Inter Tight", "Helvetica Neue", Arial, sans-serif`;
    if ("letterSpacing" in context) context.letterSpacing = `${fontSize * -.035}px`;

    context.fillText("atlas", rightEdge, centerY - lineHeight);
    context.fillText("systems", rightEdge, centerY);
    context.fillText("digital", rightEdge, centerY + lineHeight);

    if (!textTexture) textTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textTexture);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, typeCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.1);
    const desiredWidth = Math.max(1, canvas.clientWidth * dpr);
    const desiredHeight = Math.max(1, canvas.clientHeight * dpr);
    const maxPixels = 1_200_000;
    const maxDimension = 1600;
    const pixelScale = Math.sqrt(maxPixels / (desiredWidth * desiredHeight));
    const dimensionScale = maxDimension / Math.max(desiredWidth, desiredHeight);
    const renderScale = Math.min(1, pixelScale, dimensionScale);
    width = Math.max(1, Math.floor(desiredWidth * renderScale));
    height = Math.max(1, Math.floor(desiredHeight * renderScale));
    canvas.width = width;
    canvas.height = height;

    [gradientBuffer, compositeBuffer, objectBuffer].forEach((buffer) => {
      if (!buffer) return;
      gl.deleteFramebuffer(buffer.frameBuffer);
      gl.deleteTexture(buffer.texture);
    });

    gradientBuffer = createFrameBuffer(width, height);
    compositeBuffer = createFrameBuffer(width, height);
    objectBuffer = createFrameBuffer(width, height);
    buildTextTexture();
  }

  const pointer = { x: .5, y: .5, targetX: .5, targetY: .5 };
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let elapsed = 0;
  let lastTime = 0;
  let scrollEffect = 0;
  let morph = 0;
  let aberration = .044;
  let sceneVisible = true;
  let frameRequest = 0;
  let resizeTimer = 0;
  let lastDrawTime = 0;
  let sceneHeight = 1;
  const frameInterval = 1000 / 36;

  const mix = (from, to, amount) => from + (to - from) * amount;

  function requestRender() {
    if (frameRequest || document.hidden || !sceneVisible) return;
    frameRequest = window.requestAnimationFrame(render);
  }

  function render(now) {
    frameRequest = 0;
    if (!prefersReducedMotion && lastDrawTime && now - lastDrawTime < frameInterval) {
      requestRender();
      return;
    }

    lastDrawTime = now;
    const delta = lastTime ? Math.min((now - lastTime) / 1000, .05) : 0;
    lastTime = now;

    if (!prefersReducedMotion) elapsed += delta;
    pointer.x = mix(pointer.x, pointer.targetX, prefersReducedMotion ? 1 : .07);
    pointer.y = mix(pointer.y, pointer.targetY, prefersReducedMotion ? 1 : .07);
    morph = mix(morph, scrollEffect, .09);
    aberration = mix(aberration, .044 + scrollEffect * .436, .06);

    if (sceneVisible && !document.hidden) {
      gl.viewport(0, 0, width, height);

      gl.bindFramebuffer(gl.FRAMEBUFFER, gradientBuffer.frameBuffer);
      gl.useProgram(gradientProgram);
      bindQuad(gradientProgram);
      gl.uniform1f(gradientUniforms.time, elapsed);
      gl.uniform2f(gradientUniforms.mouse, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      gl.bindFramebuffer(gl.FRAMEBUFFER, compositeBuffer.frameBuffer);
      gl.useProgram(textProgram);
      bindQuad(textProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, gradientBuffer.texture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textTexture);
      gl.uniform1i(textUniforms.gradient, 0);
      gl.uniform1i(textUniforms.text, 1);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      gl.bindFramebuffer(gl.FRAMEBUFFER, objectBuffer.frameBuffer);
      gl.useProgram(objectProgram);
      bindQuad(objectProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, compositeBuffer.texture);
      gl.uniform1i(objectUniforms.background, 0);
      gl.uniform1f(objectUniforms.time, elapsed);
      gl.uniform2f(objectUniforms.mouse, pointer.x, pointer.y);
      gl.uniform2f(objectUniforms.resolution, width, height);
      gl.uniform1f(objectUniforms.morph, morph);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.useProgram(aberrationProgram);
      bindQuad(aberrationProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, objectBuffer.texture);
      gl.uniform1i(aberrationUniforms.texture, 0);
      gl.uniform1f(aberrationUniforms.time, elapsed);
      gl.uniform2f(aberrationUniforms.resolution, width, height);
      gl.uniform1f(aberrationUniforms.amount, aberration);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!scene.classList.contains("is-webgl-ready")) {
        scene.classList.remove("webgl-fallback");
        scene.classList.add("is-webgl-ready");
      }
    }

    if (!prefersReducedMotion) requestRender();
  }

  function updatePointer(clientX, clientY) {
    pointer.targetX = Math.min(1, Math.max(0, clientX / Math.max(1, window.innerWidth)));
    pointer.targetY = Math.min(1, Math.max(0, 1 - clientY / Math.max(1, window.innerHeight)));
  }

  window.addEventListener("pointermove", (event) => updatePointer(event.clientX, event.clientY), { passive: true });
  window.addEventListener("touchmove", (event) => {
    if (event.touches[0]) updatePointer(event.touches[0].clientX, event.touches[0].clientY);
  }, { passive: true });

  window.addEventListener("scroll", () => {
    scrollEffect = Math.max(0, Math.min(1, window.scrollY / (sceneHeight * .23)));
  }, { passive: true });

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      sceneHeight = Math.max(1, scene.clientHeight);
      resize();
      requestRender();
    }, 140);
  }, { passive: true });
  document.fonts?.ready.then(() => {
    buildTextTexture();
    requestRender();
  });

  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    if (frameRequest) window.cancelAnimationFrame(frameRequest);
    frameRequest = 0;
    scene.classList.add("webgl-fallback");
    canvas.hidden = true;
  });

  canvas.addEventListener("webglcontextrestored", () => {
    window.location.reload();
  });

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    sceneVisible = entry.isIntersecting;
    if (sceneVisible) {
      lastTime = performance.now();
      requestRender();
    } else if (frameRequest) {
      window.cancelAnimationFrame(frameRequest);
      frameRequest = 0;
    }
  });
  visibilityObserver.observe(scene);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && sceneVisible) {
      lastTime = performance.now();
      requestRender();
    } else if (frameRequest) {
      window.cancelAnimationFrame(frameRequest);
      frameRequest = 0;
    }
  });

  sceneHeight = Math.max(1, scene.clientHeight);
  resize();
  requestRender();
})();
