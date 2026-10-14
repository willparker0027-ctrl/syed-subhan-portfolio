import{$t as e,A as t,B as n,Bt as r,C as i,Dt as a,Et as o,G as s,H as c,Ht as l,I as u,It as d,Jt as f,K as p,Kt as m,L as h,Lt as g,O as _,P as v,Pt as y,R as b,S as ee,U as te,Vt as x,W as S,Xt as ne,Y as re,Zt as ie,_ as ae,a as oe,an as se,at as ce,en as C,f as le,ft as ue,g as de,h as fe,ht as w,i as pe,in as me,j as he,jt as T,k as E,kt as D,l as ge,m as _e,mt as O,n as k,ot as A,p as ve,pt as j,q as ye,r as be,s as M,t as N,tn as P,u as xe,v as Se,vt as F,x as Ce,y as we,z as Te,zt as I}from"./spiral-v4.js";var Ee={bladeTop:2.6,tip:-9.2,width:.5,thickness:.1,sori:.12},L=(()=>{let e=7;return()=>((e=e*16807%2147483647)-1)/2147483646})();function De({bladeTop:e,tip:t,width:n,thickness:r,sori:i},a=320){let o=e-t,s=.9,l=t=>{let a=Math.max(0,(t-s)/.09999999999999998),c=n*(1-.24*Math.min(t/s,1)),l=r/2*(1-.35*t)*(1-a*a),u=Math.sqrt(Math.max(0,1-a*a)),d=-n/2+i*4*t*(1-t);return{y:e-t*o,x:e=>d+e*c*u,t:l}},u=[[7,(e,t,n)=>{let r=t/(n-1);return[e.x(1-.7*r),e.t*(1-(1-r)**2.4),r]}],[2,(e,t)=>t===0?[e.x(.3),e.t,1]:[e.x(.045),e.t*.6,1.8]],[2,(e,t)=>t===0?[e.x(.045),e.t*.6,1.8]:[e.x(0),0,2]]],d=[];for(let e of[1,-1])for(let[t,n]of u){let r=[],i=[],o=[];for(let o=0;o<=a;o++){let s=o/a,c=l(s);for(let a=0;a<t;a++){let[o,l,u]=n(c,a,t);r.push(o,c.y,l*e),i.push(u,s)}}for(let n=0;n<a;n++)for(let r=0;r<t-1;r++){let i=n*t+r,a=i+1,s=i+t,c=s+1;e>0?o.push(i,a,c,i,c,s):o.push(i,c,a,i,s,c)}let s=new E;s.setAttribute(`position`,new c(r,3)),s.setAttribute(`uv`,new c(i,2)),s.setIndex(o),s.computeVertexNormals(),d.push(s)}return we(d)}function Oe(){let e=new F({color:12106948,metalness:1,roughness:.2,envMapIntensity:1.25}),t={uTime:{value:0},uGlow:{value:1},uGlowColor:{value:new v(1,.16,.05)}};return e.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec2 vBlade;`).replace(`#include <uv_vertex>`,`#include <uv_vertex>
vBlade = uv;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec2 vBlade;
        uniform float uTime;
        uniform float uGlow;
        uniform vec3 uGlowColor;
        float bh(float n) { return fract(sin(n * 91.345) * 47453.21); }
        float bnoise(float x) { float i = floor(x), f = fract(x); return mix(bh(i), bh(i + 1.0), f * f * (3.0 - 2.0 * f)); }
        float hamonLine(float s) {
          // gunome (rounded waves) + notare (slow undulation) + irregular "ashi" spikes
          float L = s * 90.0;
          float g = pow(abs(sin(L)), 0.6) * (0.55 + 0.45 * bnoise(L * 0.37));
          float n = bnoise(s * 9.0);
          return 0.36 + 0.13 * g + 0.08 * n;
        }
      `).replace(`#include <color_fragment>`,`#include <color_fragment>
        float e = vBlade.x;
        float s = vBlade.y;
        float line = hamonLine(s);
        float hamon = 1.0 - smoothstep(line - 0.035, line + 0.035, e);
        // misty crystalline temper zone towards the edge, dark mirror polish above it
        float nie = step(0.82, bh(floor(e * 120.0) + floor(s * 3000.0) * 13.0)) * smoothstep(0.12, 0.0, abs(e - line));
        diffuseColor.rgb = mix(diffuseColor.rgb * 0.46, vec3(0.74, 0.75, 0.78), hamon * 0.9) + nie * 0.3;
        float hada = bnoise(e * 14.0 + s * 900.0) * bnoise(s * 260.0 - e * 3.0);
      `).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
        roughnessFactor = mix(0.08 + hada * 0.07, 0.4, hamon * smoothstep(1.0, 0.95, e));
      `).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        // the demon in the steel: a crimson glow riding the temper line, pulsing down the blade
        float glowLine = exp(-pow((e - line) / 0.028, 2.0)) * step(e, 1.0);
        float pulse = 0.55 + 0.45 * sin(s * 26.0 - uTime * 1.6);
        float tipFade = smoothstep(1.0, 0.93, s);
        totalEmissiveRadiance += uGlowColor * glowLine * pulse * uGlow * 1.6 * tipFade;
        // the cutting edge catches a thin bright line
        totalEmissiveRadiance += vec3(1.0, 0.55, 0.4) * smoothstep(0.02, 0.0, e) * 0.35 * uGlow;
      `)},e.customProgramCacheKey=()=>`oni-blade`,{material:e,uniforms:t}}var R=(e,t,n=1)=>new F({color:e,roughness:t,metalness:n});function z(e,t,r,i=.01){let a=new n(e,{depth:t,bevelEnabled:i>0,bevelThickness:i,bevelSize:i,bevelSegments:2,curveSegments:48});return a.rotateX(-Math.PI/2),a.translate(0,r,0),a}var ke=(e,t,n=72)=>{let r=new l;for(let i=0;i<=n;i++){let a=i/n*Math.PI*2;r[i?`lineTo`:`moveTo`](Math.cos(a)*e,Math.sin(a)*t)}return r},Ae=(e,t)=>{let n=new o;return n.moveTo(-e/2,0),n.quadraticCurveTo(0,t*1.6,e/2,0),n.quadraticCurveTo(0,-t*1.6,-e/2,0),n};function je(){let e=new l,t=2.7;for(let n=0;n<=160;n++){let r=n/160*Math.PI*2,i=Math.cos(r),a=Math.sin(r),o=Math.sign(i)*Math.abs(i)**(2/t)*.8,s=Math.sign(a)*Math.abs(a)**(2/t)*.72,c=1-.035*Math.abs(Math.sin(2*r))**8;e[n?`lineTo`:`moveTo`](o*c,s*c)}e.holes.push(Ae(.54,.075));for(let t of[-1,1]){let n=new o;n.absarc(0,t*.38,.1,0,Math.PI*2,!1),e.holes.push(n)}for(let t=0;t<4;t++){let n=Math.PI/4+t*Math.PI/2,r=Math.cos(n)*.53,i=Math.sin(n)*.47,a=.13,s=new o,c=n+Math.PI;s.absarc(r,i,a,c+.35*Math.PI,c-.35*Math.PI+Math.PI*2,!1),s.absarc(r+Math.cos(n)*.07,i+Math.sin(n)*.07,a*.86,c-.29*Math.PI+Math.PI*2,c+.29*Math.PI,!0),e.holes.push(s)}return e}function Me(e,t=.8,n=.72,r=2.7){let i=[];for(let a=0;a<160;a++){let o=a/160*Math.PI*2,s=Math.cos(o),c=Math.sin(o),l=1-.035*Math.abs(Math.sin(2*o))**8;i.push(new P(Math.sign(s)*Math.abs(s)**(2/r)*t*l,e,Math.sign(c)*Math.abs(c)**(2/r)*n*l))}return new ie(new he(i,!0),240,.016,8,!0)}function B(e,t,n,r,i=()=>1,a=72,o=56){let s=[],l=[],u=[];for(let c=0;c<=a;c++){let u=c/a,d=i(u);for(let i=0;i<=o;i++){let a=i/o,c=a*Math.PI*2;s.push(Math.cos(c)*e*d,n+(r-n)*u,Math.sin(c)*t*d),l.push(a,u)}}for(let e=0;e<a;e++)for(let t=0;t<o;t++){let n=e*(o+1)+t,r=n+1,i=n+o+1,a=i+1;u.push(n,i,r,r,i,a)}let d=new E;return d.setAttribute(`position`,new c(s,3)),d.setAttribute(`uv`,new c(l,2)),d.setIndex(u),d.computeVertexNormals(),d}function Ne(){let e=new F({color:16777215,roughness:.6,metalness:0});return e.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec2 vWrap;`).replace(`#include <uv_vertex>`,`#include <uv_vertex>
vWrap = uv;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec2 vWrap;
float wrapMask;`).replace(`#include <color_fragment>`,`#include <color_fragment>
        float a = vWrap.x * 2.0;          // two crossings around the circumference
        float l = vWrap.y * 11.0;         // eleven wraps along the length
        float d1 = abs(fract(l + a) - 0.5);
        float d2 = abs(fract(l - a) - 0.5);
        float band = smoothstep(0.31, 0.34, min(d1, d2));   // 1 inside a diamond window
        float ridge = smoothstep(0.0, 0.31, min(d1, d2));
        wrapMask = 1.0 - band;
        vec3 silk = vec3(0.2, 0.016, 0.022) * (0.55 + 0.45 * ridge);
        float grain = fract(sin(dot(floor(vWrap * vec2(260.0, 900.0)), vec2(12.9898, 78.233))) * 43758.5453);
        vec3 same = vec3(0.78, 0.74, 0.66) * (0.85 + 0.15 * grain);
        diffuseColor.rgb = mix(same, silk, wrapMask);
      `).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
roughnessFactor = mix(0.45, 0.72, wrapMask);`)},e.customProgramCacheKey=()=>`oni-handle`,e}function V(e,{y0:t,y1:n,turns:r,radius:i,phase:a,linkLen:o=.18}){let s=new u;s.getPoint=(e,o=new P)=>{let s=a+e*r*Math.PI*2,c=i*(1+.12*Math.sin(e*r*Math.PI*2*2+a));return o.set(Math.cos(s)*c,t+(n-t)*e,Math.sin(s)*c)};let c=s.getLength(),l=Math.floor(c/o),d=new ne(.07,.019,8,18);d.scale(1,1.55,1);let f=new re(d,R(2762790,.38,1),l),p=s.computeFrenetFrames(l,!1),m=new j,h=new P,g=new P,_=[];for(let e=0;e<l;e++){let t=(e+.5)/l,n=s.getPointAt(t),r=p.tangents[e],i=p.normals[e],a=p.binormals[e];h.copy(e%2?i:a),g.crossVectors(h,r),m.makeBasis(h,r,g).setPosition(n),f.setMatrixAt(e,m),e%5==2&&_.push(n.clone())}return e.add(f),_}function Pe(){let e=document.createElement(`canvas`);e.width=512,e.height=448;let n=e.getContext(`2d`);for(let e=0;e<4;e++){let t=e*128,r=n.createLinearGradient(0,0,0,448);r.addColorStop(0,`#d9ccb0`),r.addColorStop(1,`#b9a581`),n.fillStyle=r,n.fillRect(t+4,0,120,448),n.strokeStyle=`rgba(120, 20, 18, 0.9)`,n.lineWidth=3,n.strokeRect(t+12,10,104,428),n.lineCap=`round`,n.strokeStyle=`rgba(25, 14, 12, 0.92)`;let i=46;for(;i<330;){let e=Math.floor(L()*4);n.lineWidth=6+L()*5,n.beginPath(),e===0?(n.moveTo(t+34,i),n.lineTo(t+94,i+4)):e===1?(n.moveTo(t+64,i-6),n.lineTo(t+62,i+34)):e===2?n.arc(t+64,i+14,16,.4,Math.PI*1.8):(n.moveTo(t+40,i+30),n.lineTo(t+64,i),n.lineTo(t+88,i+30)),n.stroke(),i+=22+L()*18}n.fillStyle=`rgba(180, 24, 20, 0.92)`,n.fillRect(t+40,352,48,48),n.strokeStyle=`rgba(230, 200, 170, 0.7)`,n.lineWidth=3,n.strokeRect(t+46,358,36,36),n.beginPath(),n.moveTo(t+64,362),n.lineTo(t+64,390),n.moveTo(t+52,376),n.lineTo(t+76,376),n.stroke()}let r=new t(e);return r.colorSpace=I,r.anisotropy=4,r}function Fe(e,t){let n=.56,r=new D(.15,n,1,10);r.translate(0,-.56/2,0);let i={uTime:{value:0}},a=new F({map:Pe(),side:2,roughness:.85,metalness:0,emissive:2753795});a.onBeforeCompile=e=>{e.uniforms.uTime=i.uTime,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uTime;`).replace(`#include <uv_vertex>`,`#include <uv_vertex>
vMapUv.x = (vMapUv.x + float(gl_InstanceID % 4)) * 0.25;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        float hang = pow(-position.y / ${n.toFixed(3)}, 1.6);
        float ph = float(gl_InstanceID) * 1.93;
        transformed.z += sin(uTime * 1.4 + ph) * 0.05 * hang + sin(uTime * 3.1 + ph * 2.0) * 0.012 * hang;
        transformed.x += sin(uTime * 0.9 + ph * 0.7) * 0.025 * hang;
      `)},a.customProgramCacheKey=()=>`oni-talisman`;let o=new re(r,a,t.length),s=new j,c=new y,l=new Te,u=new P(1,1,1);return t.forEach((e,t)=>{let n=Math.atan2(e.x,e.z);l.set((L()-.5)*.25,n+(L()-.5)*.6,(L()-.5)*.2),c.setFromEuler(l),s.compose(e.clone().multiplyScalar(1.04),c,u),o.setMatrixAt(t,s)}),e.add(o),i}function Ie(){let e=new te,t=Ee,n=Oe();e.add(new O(De(t),n.material));let r=R(13211455,.3),i=R(2367517,.55,.85),a=R(1446930,.42,.9),o=new l;o.moveTo(-.29,0),o.quadraticCurveTo(-.27,.085,0,.085),o.quadraticCurveTo(.24,.07,.3,0),o.quadraticCurveTo(.24,-.07,0,-.085),o.quadraticCurveTo(-.27,-.085,-.29,0),e.add(new O(z(o,.4,t.bladeTop-.42,.012),R(12026942,.26)));let s=ke(.36,.17);s.holes.push(Ae(.54,.075)),e.add(new O(z(s,.03,t.bladeTop-.02,.004),r)),e.add(new O(z(je(),.07,t.bladeTop+.03,.012),i)),e.add(new O(Me(t.bladeTop+.03),r)),e.add(new O(Me(t.bladeTop+.11),r)),e.add(new O(z(s,.03,t.bladeTop+.14,.004),r));let c=t.bladeTop+.18;e.add(new O(B(.235,.165,c,c+.16),a)),e.add(new O(B(.24,.17,c,c+.025),r));let u=c+.16,d=u+3.3;e.add(new O(B(.215,.15,u,d,e=>1-.05*Math.sin(Math.PI*e),96,64),Ne()));for(let t of[-1,1]){let n=new O(new m(1,20,12),r);n.scale.set(.09,.22,.035),n.position.set(t*.02,u+1.1+(t>0?0:.7),t*.15),e.add(n)}let f=new O(new m(1,40,16,0,Math.PI*2,0,Math.PI/2),a);f.scale.set(.225,.14,.158),f.position.y=d,e.add(f),e.add(new O(B(.228,.161,d-.03,d+.02),r));let p=Fe(e,[...V(e,{y0:t.bladeTop-.55,y1:-6.6,turns:2.25,radius:.37,phase:0}),...V(e,{y0:t.bladeTop-1.4,y1:-7.4,turns:1.85,radius:.4,phase:Math.PI})].filter((e,t)=>t%2==0));return{group:e,update(e){n.uniforms.uTime.value=e,p.uTime.value=e},setGlow(e){n.uniforms.uGlow.value=e}}}var H=11,U=()=>((H=H*16807%2147483647)-1)/2147483646,W=(e,t)=>e+(t-e)*U();function Le(){let e=new E;e.setAttribute(`position`,new c([-1,-1,0,3,-1,0,-1,3,0],3));let t=new x({depthTest:!1,depthWrite:!1,uniforms:{uRes:{value:new C(1,1)},uTime:{value:0},uScroll:{value:0},uBase:{value:new v(.0235,.0226,.0214)},uGlow:{value:new v(.2,.03,.018)}},vertexShader:`void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
      uniform vec2 uRes;
      uniform float uTime;
      uniform float uScroll;
      uniform vec3 uBase;
      uniform vec3 uGlow;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / uRes;
        float aspect = uRes.x / uRes.y;
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
        // a crimson column of light behind the blade, breathing slowly
        float n = noise(vec2(p.x * 3.0, p.y * 1.4 + uScroll * 0.35 - uTime * 0.04));
        float column = exp(-p.x * p.x * 7.0) * (0.55 + 0.45 * n);
        // violet haze to the upper left, ember haze to the lower right
        float violet = exp(-dot(p - vec2(-0.75, 0.42), p - vec2(-0.75, 0.42)) * 1.6);
        float ember = exp(-dot(p - vec2(0.8, -0.45), p - vec2(0.8, -0.45)) * 1.8);
        float vig = smoothstep(1.3, 0.1, length(p * vec2(0.75, 1.0)));
        vec3 col = uBase * (0.62 + 0.42 * vig);
        col += uGlow * column * 0.12;
        col += vec3(0.02, 0.008, 0.034) * violet * (0.6 + 0.4 * n);
        col += vec3(0.034, 0.014, 0.005) * ember;
        gl_FragColor = vec4(col, 1.0);
      }
    `}),n=new O(e,t);return n.frustumCulled=!1,n.renderOrder=-1e3,n}function Re(e,{width:n=9.6,color:r=`#3a332d`}={}){let i=document.createElement(`canvas`),a=i.getContext(`2d`),o=`500 240px Archivo, 'Helvetica Neue', Arial, sans-serif`;a.font=o,`fontStretch`in a&&(a.fontStretch=`semi-expanded`),`letterSpacing`in a&&(a.letterSpacing=`${-.045*240}px`);let s=a.measureText(e);i.width=Math.ceil(s.width+72),i.height=252,a.font=o,`fontStretch`in a&&(a.fontStretch=`semi-expanded`),`letterSpacing`in a&&(a.letterSpacing=`${-.045*240}px`),a.textBaseline=`middle`,a.fillStyle=`#fff`,a.fillText(e,36,i.height*.54);let c=new t(i);c.colorSpace=``,c.anisotropy=4;let l=n*i.height/i.width,u=new x({transparent:!0,depthWrite:!1,uniforms:{tText:{value:c},uColor:{value:new v(r)},uOpacity:{value:1}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      uniform sampler2D tText;
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        float a = texture2D(tText, vUv).a;
        // lit from below by the blade's glow, like the hero headline catches the rim light
        vec3 col = uColor * (0.75 + 0.5 * (1.0 - vUv.y));
        gl_FragColor = vec4(col, a * uOpacity);
      }
    `}),d=new O(new D(n,l),u);return d.renderOrder=-900,d}var ze=[{petal:[.95,.035,.05],tip:[1,.16,.12],stamen:[1,.12,.18],anther:[1,.55,.3]},{petal:[.95,.035,.05],tip:[1,.16,.12],stamen:[1,.12,.18],anther:[1,.55,.3]},{petal:[.85,.82,.9],tip:[1,.95,1],stamen:[1,.85,.9],anther:[1,.75,.5]},{petal:[.55,.06,.85],tip:[.9,.25,1],stamen:[.9,.2,.9],anther:[1,.5,.8]}];function Be(e){let t=e.clone().normalize(),n=Math.abs(t.y)<.9?new P(0,1,0):new P(1,0,0),r=new P().crossVectors(t,n).normalize();return{a:t,u:r,v:new P().crossVectors(t,r).normalize()}}function Ve(e,t,n,r,i){let{a,u:o,v:s}=Be(n),c=new P,l=new P,u=new P,d=(t,n,r,i=1)=>{e.pos.push(t.x,t.y,t.z),e.col.push(n[0]*i,n[1]*i,n[2]*i),e.size.push(r),e.phase.push(U()*100)},f=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],p=U()*Math.PI*2;for(let e=0;e<6;e++){let n=p+e/6*Math.PI*2+W(-.12,.12);c.copy(o).multiplyScalar(Math.cos(n)).addScaledVector(s,Math.sin(n)),l.crossVectors(a,c);let m=W(.65,.95);for(let n=0;n<46;n++){let o=(n+U())/46,s=r*.13*Math.sin(Math.PI*Math.min(1,o*1.1))**.8;for(let n=0;n<2;n++)u.copy(t).addScaledVector(c,r*o).addScaledVector(a,r*(.32*Math.sin(Math.PI*o*.85)-m*o*o)).addScaledVector(l,(U()-.5)*s+Math.sin(o*16+e)*r*.025),d(u,f(i.petal,i.tip,o*o),W(1,1.7),.55)}let h=n+Math.PI/6,g=new P().copy(o).multiplyScalar(Math.cos(h)).addScaledVector(s,Math.sin(h)),_=W(1.1,1.5);for(let e=0;e<18;e++){let n=(e+U())/18;u.copy(t).addScaledVector(a,r*_*n).addScaledVector(g,r*1.15*n**1.7),d(u,i.stamen,.75,.45)}let v=new P().copy(t).addScaledVector(a,r*_).addScaledVector(g,r*1.15);for(let e=0;e<5;e++)u.copy(v).add(new P(W(-1,1),W(-1,1),W(-1,1)).multiplyScalar(r*.04)),d(u,i.anther,1.5,.85)}}function He({top:e=2.2,bottom:t=-9,clusters:n=15}={}){let r={pos:[],col:[],size:[],phase:[]};for(let i=0;i<n;i++){let a=e+(t-e)*((i+W(.1,.9))/n),o=i*2.4+W(-.4,.4),s=W(.42,.85),c=new P(Math.sin(o)*s,a,Math.cos(o)*s),l=new P(Math.sin(o),W(.3,.9),Math.cos(o)).normalize(),u=ze[i%7==3?2:i%5==4?3:0],d=8+Math.floor(U()*5),f=W(.2,.3);for(let e=0;e<d;e++){let e=l.clone().add(new P(W(-1,1),W(-.6,1),W(-1,1)).multiplyScalar(.75)).normalize();Ve(r,c.clone().addScaledVector(e,f*W(.8,1.6)),e,f*W(.85,1.15),u)}for(let e=0;e<220;e++){let e=c.clone().add(new P(W(-1,1),W(-.8,1.4),W(-1,1)).multiplyScalar(f*4.2));r.pos.push(e.x,e.y,e.z);let t=W(.15,.35);r.col.push(u.tip[0]*t,u.tip[1]*t,u.tip[2]*t),r.size.push(W(.5,1.1)),r.phase.push(U()*100+1e3)}}let i=new E;i.setAttribute(`position`,new c(r.pos,3)),i.setAttribute(`aColor`,new c(r.col,3)),i.setAttribute(`aSize`,new c(r.size,1)),i.setAttribute(`aPhase`,new c(r.phase,1));let a=new x({transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:{value:0},uScale:{value:1},uOpacity:{value:1}},vertexShader:`
      attribute vec3 aColor;
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      uniform float uScale;
      uniform float uOpacity;
      varying vec3 vColor;
      void main() {
        vec3 p = position;
        float pollen = step(1000.0, aPhase);
        float ph = mod(aPhase, 1000.0);
        // breeze through the petals; pollen wanders further and rises
        float sway = mix(0.012, 0.09, pollen);
        p.x += sin(uTime * 0.6 + p.y * 1.7 + ph) * sway;
        p.z += cos(uTime * 0.5 + p.y * 1.3 + ph * 1.3) * sway;
        p.y += pollen * mod(uTime * 0.04 + ph * 0.01, 0.6);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * uScale / max(0.3, -mv.z);
        gl_Position = projectionMatrix * mv;
        float twinkle = 0.7 + 0.3 * sin(uTime * (0.8 + fract(ph) * 2.5) + ph * 9.0);
        vColor = aColor * twinkle * uOpacity * smoothstep(0.35, 1.4, -mv.z);
      }
    `,fragmentShader:`
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor * a * a * 1.6, 1.0);
      }
    `}),o=new T(i,a);return o.frustumCulled=!1,o}function Ue({count:e=900,top:t=6.5,bottom:n=-11}={}){let r=new Float32Array(e*3),i=new Float32Array(e*4);for(let a=0;a<e;a++){let e=.3+Math.sqrt(U())*3.4,o=U()*Math.PI*2;r.set([Math.cos(o)*e,n+U()*(t-n),Math.sin(o)*e],a*3),i.set([U()*100,.5+U(),.6+U()**3*2.6,+(U()<.35)],a*4)}let a=new E;a.setAttribute(`position`,new _(r,3)),a.setAttribute(`aSeed`,new _(i,4));let o=new x({transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:{value:0},uScale:{value:1},uTop:{value:t},uBottom:{value:n},uOpacity:{value:1}},vertexShader:`
      attribute vec4 aSeed;
      uniform float uTime;
      uniform float uScale;
      uniform float uTop;
      uniform float uBottom;
      uniform float uOpacity;
      varying float vAlpha;
      varying float vEmber;
      void main() {
        vec3 p = position;
        float span = uTop - uBottom;
        float rise = aSeed.w > 0.5 ? 0.16 : 0.03;
        p.y = uBottom + mod(p.y - uBottom + uTime * rise * aSeed.y, span);
        p.x += sin(uTime * 0.37 * aSeed.y + aSeed.x) * 0.25;
        p.z += cos(uTime * 0.29 * aSeed.y + aSeed.x * 1.3) * 0.25;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSeed.z * (aSeed.w > 0.5 ? 1.25 : 0.9) * uScale / max(0.25, -mv.z);
        gl_Position = projectionMatrix * mv;
        float flicker = 0.6 + 0.4 * sin(uTime * (1.5 + aSeed.y * 3.0) + aSeed.x * 7.0);
        vAlpha = flicker * smoothstep(0.4, 1.8, -mv.z) * uOpacity;
        vEmber = aSeed.w;
      }
    `,fragmentShader:`
      varying float vAlpha;
      varying float vEmber;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        vec3 dust = vec3(1.0, 0.8, 0.6) * 0.16;
        vec3 ember = vec3(1.0, 0.32, 0.08) * 0.85;
        gl_FragColor = vec4(mix(dust, ember, vEmber) * a * a * vAlpha, 1.0);
      }
    `}),s=new T(a,o);return s.frustumCulled=!1,s}function We({count:e=2600,top:t=9,bottom:n=-15}={}){let r=new Float32Array(e*3),i=new Float32Array(e*2);for(let a=0;a<e;a++){let o=a<e*.2,s=W(-1.25,1.25)+Math.PI,c=W(9,17),l=o?(U()-.5)*(U()*1.6):n+U()*(t-n);r.set([Math.sin(s)*c,l,Math.cos(s)*c],a*3),i.set([U()*100,+!!o],a*2)}let a=new E;a.setAttribute(`position`,new _(r,3)),a.setAttribute(`aExtra`,new _(i,2));let o=new x({transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:{value:0},uScale:{value:1},uCamY:{value:0},uOpacity:{value:1}},vertexShader:`
      attribute vec2 aExtra;
      uniform float uTime;
      uniform float uScale;
      uniform float uCamY;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y += aExtra.y * (uCamY - 0.4);
        p.x += sin(uTime * 0.05 + aExtra.x) * 0.3;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = (aExtra.y > 0.5 ? 1.6 : 1.2) * uScale / max(1.0, -mv.z) * 6.0;
        gl_Position = projectionMatrix * mv;
        vAlpha = (0.45 + 0.55 * sin(uTime * 0.7 + aExtra.x * 13.0)) * uOpacity * (aExtra.y > 0.5 ? 0.5 : 0.55);
      }
    `,fragmentShader:`
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vec3(0.75, 0.62, 0.55) * 0.22 * a * vAlpha, 1.0);
      }
    `}),s=new T(a,o);return s.frustumCulled=!1,s}var G={W:1.6,H:1,T:.07};function Ge({W:e,H:t,T:n}=G,r=.085,i=10,a=10){let o=n/2,s=e/2-o,l=t/2-o,u=r-o,d=[],f=[[s-u,l-u,0],[-(s-u),l-u,Math.PI/2],[-(s-u),-(l-u),Math.PI],[s-u,-(l-u),Math.PI*1.5]];for(let[e,t,n]of f)for(let r=0;r<=i;r++){let a=n+r/i*(Math.PI/2);d.push([e+Math.cos(a)*u,t+Math.sin(a)*u,Math.cos(a),Math.sin(a)])}let p=d.length,m=[],h=[],g=[],_=(e,t)=>(m.push(...e),h.push(...t),m.length/3-1);for(let e of[1,-1]){let t=_([0,0,o*e],[0,0,e]),n=d.map(([t,n])=>_([t,n,o*e],[0,0,e]));for(let r=0;r<p;r++){let i=n[r],a=n[(r+1)%p];e>0?g.push(t,i,a):g.push(t,a,i)}}let v=[];for(let e=0;e<=a;e++){let t=-Math.PI/2+e/a*Math.PI,n=Math.cos(t),r=Math.sin(t);v.push(d.map(([e,t,i,a])=>_([e+i*o*n,t+a*o*n,o*r],[i*n,a*n,r])))}for(let e=0;e<a;e++)for(let t=0;t<p;t++){let n=v[e][t],r=v[e][(t+1)%p],i=v[e+1][t],a=v[e+1][(t+1)%p];g.push(n,r,a,n,a,i)}let y=new E;return y.setAttribute(`position`,new c(m,3)),y.setAttribute(`normal`,new c(h,3)),y.setIndex(g),y.computeBoundingSphere(),y}var K=`
  float hash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
    return v;
  }
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }
  // centre of the Voronoi cell around p: an organic mosaic for the painterly frost
  vec2 cellCentre(vec2 p, float t) {
    vec2 n = floor(p), f = fract(p);
    float md = 8.0;
    vec2 mc = vec2(0.0);
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = 0.5 + 0.45 * sin(t + 6.2831 * hash2(n + g));
        vec2 r = g + o - f;
        float d = dot(r, r);
        if (d < md) { md = d; mc = n + g + o; }
      }
    }
    return mc;
  }
`,Ke=`
  varying vec3 vPosL;
  varying vec3 vNrmL;
  varying vec3 vPosV;
  varying vec3 vNrmV;
  void main() {
    vPosL = position;
    vNrmL = normal;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vPosV = mv.xyz;
    vNrmV = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`,qe=`
  uniform sampler2D tBehind;
  uniform vec2 uRes;
  uniform sampler2D tMap;
  uniform sampler2D tVideo;
  uniform float uVideoMix;
  uniform float uMapAspect;
  uniform vec3 uSize;
  uniform vec3 uCamLocal;
  uniform float uFocus;
  uniform float uHover;
  uniform vec2 uHoverUV;
  uniform float uTime;
  uniform float uSeed;
  uniform vec3 uTint;
  uniform float uDim;
  uniform float uLoaded;
  varying vec3 vPosL;
  varying vec3 vNrmL;
  varying vec3 vPosV;
  varying vec3 vNrmV;
  ${K}

  // soft studio panels mirrored in the glass (view space): a wide softbox above, a warm strip to
  // the right (the blade's glow), a cool kicker to the left
  vec3 studio(vec3 r) {
    float top = smoothstep(0.3, 0.85, r.y) * smoothstep(-1.0, 0.3, r.x);
    float right = smoothstep(0.55, 0.92, r.x) * smoothstep(-0.55, 0.25, r.y) * smoothstep(0.95, 0.3, r.y);
    float left = smoothstep(0.72, 0.98, -r.x) * smoothstep(-0.3, 0.5, r.y);
    return vec3(1.0, 0.93, 0.84) * top * 0.85 + vec3(1.0, 0.4, 0.18) * right * 0.85 + vec3(0.45, 0.55, 0.85) * left * 0.35;
  }

  void main() {
    vec3 Nl = normalize(vNrmL);
    vec3 Nv = normalize(vNrmV);
    vec3 Vv = normalize(-vPosV);
    float ndv = clamp(dot(Nv, Vv), 0.0, 1.0);
    float cap = smoothstep(0.9, 0.995, abs(Nl.z));
    float rim = 1.0 - cap;
    float side = Nl.z >= 0.0 ? 1.0 : -1.0;
    vec2 suv = gl_FragCoord.xy / uRes;

    // 1. the world behind the glass, bent by the surface (hard on the rim) with colour fringes
    vec3 rd = refract(-Vv, Nv, 0.66);
    vec2 bend = (rd.xy + Vv.xy) * (0.035 + 0.3 * rim);
    float lod = mix(3.4, 1.2, uHover) + rim * 1.4;
    vec3 behind;
    behind.r = textureLod(tBehind, suv + bend * 1.07, lod).r;
    behind.g = textureLod(tBehind, suv + bend, lod).g;
    behind.b = textureLod(tBehind, suv + bend * 0.93, lod).b;
    vec3 glass = behind * vec3(0.8, 0.86, 0.84);

    // 2. the picture, on a plane recessed inside the slab (parallax with the viewing angle)
    vec3 vl = normalize(uCamLocal - vPosL);
    vl.z *= side;
    float depth = uSize.z * 0.85;
    vec2 cp = vPosL.xy - vl.xy / max(vl.z, 0.2) * depth;
    cp.x *= side; // from behind the picture reads mirrored
    vec2 halfSize = uSize.xy * 0.5 - 0.052;
    float radius = 0.05;
    vec2 q = abs(cp) - (halfSize - radius);
    float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
    float inside = 1.0 - smoothstep(-0.003, 0.003, sd);
    vec2 uv = cp / (halfSize * 2.0) + 0.5;
    float panelAspect = halfSize.x / halfSize.y;
    vec2 muv = uv;
    if (uMapAspect > panelAspect) muv.x = (uv.x - 0.5) * panelAspect / uMapAspect + 0.5;
    else muv.y = (uv.y - 0.5) * uMapAspect / panelAspect + 0.5;

    // hover: the frost melts away from the point the cursor entered, outwards
    float n0 = fbm(uv * 3.5 + uSeed * 7.0 + uTime * 0.06);
    float dist = length((uv - uHoverUV) * vec2(panelAspect, 1.0));
    float reach = uHover * 2.2;
    float clear = (1.0 - smoothstep(reach - 0.45, reach, dist + (n0 - 0.5) * 0.5)) * smoothstep(0.0, 0.06, uHover);
    float frost = 1.0 - clear;

    // painterly frost: the picture is domain-warped, then broken into a slowly drifting organic
    // mosaic of colour blotches and softened through the mip chain, like wet paint behind glass
    vec2 w = vec2(fbm(muv * 2.3 + uSeed + uTime * 0.02), fbm(muv * 2.3 + uSeed + 5.2 - uTime * 0.02)) - 0.5;
    vec2 cellScale = vec2(34.0, 19.0);
    vec2 cc = cellCentre(muv * cellScale + w * 4.0, uTime * 0.25 + uSeed * 10.0) / cellScale;
    vec2 warped = muv + w * 0.07;
    vec2 puv = mix(muv, mix(warped, cc, 0.55), frost);
    float bias = frost * 1.6;
    vec3 img = texture2D(tMap, puv, bias).rgb;
    vec3 smear = texture2D(tMap, mix(muv, warped + w * 0.05, frost), bias + 1.0).rgb;
    if (uVideoMix > 0.001) {
      img = mix(img, texture2D(tVideo, puv, bias).rgb, uVideoMix);
      smear = mix(smear, texture2D(tVideo, mix(muv, warped + w * 0.05, frost), bias + 1.0).rgb, uVideoMix);
    }
    img = mix(img, smear, frost * 0.35);
    float luma = dot(img, vec3(0.2126, 0.7152, 0.0722));
    vec3 frosted = mix(vec3(luma), img, 0.82) * 0.78 + uTint * luma * 0.12 + 0.012;
    vec3 picture = mix(img * 1.06, frosted, frost);
    picture *= mix(0.9, 1.15, uFocus) * mix(0.7, 1.0, cap) * (side > 0.0 ? 1.0 : 0.62);

    float alpha = inside * mix(0.84, 0.97, clear) * uLoaded;
    vec3 col = mix(glass, picture, alpha);
    // the dark lip where the sealed picture meets the clear glass
    col *= 1.0 - 0.5 * smoothstep(0.022, 0.0, abs(sd)) * cap;

    // 3. surface: fresnel reflections, iridescent rim, a sheen sweeping the face as it turns
    vec3 R = reflect(-Vv, Nv);
    float F = 0.04 + 0.96 * pow(1.0 - ndv, 5.0);
    col += studio(R) * (F + 0.022) * (0.7 + 0.5 * rim);
    vec3 irid = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + ndv * 1.4 + uSeed));
    col += rim * (irid * 0.09 + vec3(0.95, 0.97, 1.0) * pow(1.0 - ndv, 2.2) * 0.17);
    float sweep = smoothstep(0.9, 1.0, sin(vPosL.x * 1.4 + vPosL.y * 0.8 + R.x * 5.0) * 0.5 + 0.5);
    col += cap * sweep * 0.035 * (0.4 + uFocus);

    gl_FragColor = vec4(col * uDim, 1.0);
  }
`,Je=`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,Ye=`
  uniform sampler2D tTitle;
  uniform float uFocus;
  uniform float uGlitch;
  uniform float uTime;
  uniform float uSeed;
  uniform float uDim;
  uniform float uOpacity;
  varying vec2 vUv;
  ${K}
  float ink(vec2 uv) { return texture2D(tTitle, uv).r; }
  void main() {
    float off = 1.0 - uFocus;
    float g = clamp(off * 1.25 + uGlitch, 0.0, 1.5);
    // horizontal slices jump sideways in steps
    float tq = floor(uTime * 16.0);
    float band = floor(vUv.y * 22.0);
    float rj = hash(vec2(band, tq + uSeed * 31.0));
    float shift = (rj - 0.5) * 0.05 * g * step(0.5, rj);
    vec2 uv = vUv + vec2(shift, 0.0);
    // doubled letters: ghost copies that slide back into place as the card reaches the front
    float spread = off * 0.03 + uGlitch * 0.012;
    float a = ink(uv);
    float ghost = max(ink(uv - vec2(spread, 0.0)), ink(uv + vec2(spread * 0.55, 0.0)) * 0.7);
    // RGB split
    float ca = 0.0025 + g * 0.009;
    vec3 col = vec3(ink(uv + vec2(ca, 0.0)), a, ink(uv - vec2(ca, 0.0)));
    col = max(col, vec3(ghost * min(1.0, off * 1.6 + uGlitch)));
    // a faint scanline shimmer
    col *= 0.9 + 0.1 * sin(vUv.y * 420.0 + uTime * 6.0);
    gl_FragColor = vec4(col * vec3(1.0, 0.97, 0.93) * 0.8 * uDim * uOpacity, 1.0);
  }
`,q=1024,J=640;function Xe(e,t,n,r,i){if(e.save(),e.translate(n,r),e.lineWidth=i*.12,e.strokeStyle=`#fff`,e.fillStyle=`#fff`,e.beginPath(),e.arc(0,0,i,0,Math.PI*2),e.stroke(),e.beginPath(),t===`bounties`)e.moveTo(0,-i*.62),e.lineTo(i*.62,0),e.lineTo(0,i*.62),e.lineTo(-i*.62,0),e.closePath(),e.stroke(),e.beginPath(),e.arc(0,0,i*.14,0,Math.PI*2),e.fill();else if(t===`duels`)e.moveTo(-i*.55,-i*.55),e.lineTo(i*.55,i*.55),e.moveTo(i*.55,-i*.55),e.lineTo(-i*.55,i*.55),e.moveTo(-i*.62,i*.25),e.lineTo(-i*.25,i*.62),e.moveTo(i*.62,i*.25),e.lineTo(i*.25,i*.62),e.stroke();else if(t===`exorcisms`){for(let t=0;t<=5;t++){let n=-Math.PI/2+t*4*Math.PI/5;e[t?`lineTo`:`moveTo`](Math.cos(n)*i*.72,Math.sin(n)*i*.72)}e.stroke()}else t===`escorts`?(e.ellipse(0,0,i*.36,i*.5,0,0,Math.PI*2),e.moveTo(-i*.36,-i*.16),e.lineTo(i*.36,-i*.16),e.moveTo(-i*.36,i*.16),e.lineTo(i*.36,i*.16),e.moveTo(0,-i*.5),e.lineTo(0,-i*.72),e.stroke()):(e.rect(-i*.42,-i*.42,i*.84,i*.84),e.stroke(),e.beginPath(),e.arc(0,-i*.08,i*.13,0,Math.PI*2),e.fill(),e.fillRect(-i*.05,-i*.05,i*.1,i*.3));e.restore()}function Y(e,t,n,r,i){e.font=`${t} ${n}px Archivo, 'Helvetica Neue', Arial, sans-serif`,`fontStretch`in e&&(e.fontStretch=r),`letterSpacing`in e&&(e.letterSpacing=`${i*n}px`)}function Ze(t,n,r){let i=document.createElement(`canvas`);i.width=q,i.height=J;let a=i.getContext(`2d`,{willReadFrequently:!0});a.fillStyle=`#fff`,a.textAlign=`center`,a.textBaseline=`alphabetic`;let o=t.lines.map(e=>e.toUpperCase()),s=o.some(e=>e.length>10)?92:104,c=o.length*s*.98,l=J/2-c/2+20;Y(a,600,21,`expanded`,.22);let u=`[ ${t.client.toUpperCase()} ]`;a.globalAlpha=.82,a.fillText(u,q/2,l-44),Xe(a,t.category,q/2,l-98,17),a.globalAlpha=1,Y(a,300,s,`expanded`,.035),o.forEach((e,t)=>a.fillText(e,q/2,l+s*.8+t*s*.98)),Y(a,700,15,`expanded`,.16),a.globalAlpha=.55,a.textAlign=`left`,a.fillText(`N°${String(n+1).padStart(2,`0`)} / ${r}`,58,64),a.textAlign=`right`;let d=oe.find(e=>e.id===t.category)?.label??``;a.fillText((t.coop?`CO-OP · `:``)+d.toUpperCase(),966,64),a.strokeStyle=`#fff`,a.lineWidth=1.5;for(let e=0;e<5;e++){let n=58+e*15;e<t.danger?a.fillRect(n,576,9,16):a.strokeRect(n+.75,576.75,7.5,14.5)}a.textAlign=`right`,a.fillText(t.reward.toUpperCase(),966,590);let f=a.getImageData(0,0,q,J).data,p=new Uint8Array(q*J);for(let e=0;e<J;e++){let t=(639-e)*q;for(let n=0;n<q;n++)p[t+n]=f[(e*q+n)*4+3]}let m=new h(p,q,J,g,e);return m.minFilter=A,m.magFilter=ce,m.generateMipmaps=!0,m.anisotropy=8,m.needsUpdate=!0,m}var X=new h(new Uint8Array([10,9,8,255]),1,1);X.needsUpdate=!0;var Qe=class{constructor(e,t,n,r){this.service=e,this.index=t,this.group=new te,this.hover=0,this.hoverTarget=0,this.focus=0,this.glitch=0,this.video=null,this.videoMix=0;let i=t*.618%1;this.glass=new O(r.slab,new x({vertexShader:Ke,fragmentShader:qe,uniforms:{tBehind:r.behind,uRes:r.res,uTime:r.time,tMap:{value:X},tVideo:{value:X},uVideoMix:{value:0},uMapAspect:{value:16/9},uSize:{value:new P(G.W,G.H,G.T)},uCamLocal:{value:new P},uFocus:{value:0},uHover:{value:0},uHoverUV:{value:new C(.5,.5)},uSeed:{value:i},uTint:{value:new P(...e.tint)},uDim:{value:1},uLoaded:{value:0}}})),this.group.add(this.glass),this.title=new O(r.titlePlane,new x({vertexShader:Je,fragmentShader:Ye,transparent:!0,depthWrite:!1,blending:2,uniforms:{tTitle:{value:Ze(e,t,n)},uTime:r.time,uFocus:{value:0},uGlitch:{value:0},uSeed:{value:i},uDim:{value:1},uOpacity:{value:1}}})),this.title.position.z=G.T/2+.004,this.title.renderOrder=2,this.group.add(this.title),this.u=this.glass.material.uniforms,this.tu=this.title.material.uniforms}setMap(e){this.u.tMap.value=e;let t=e.image;t?.width&&(this.u.uMapAspect.value=t.width/t.height),this.loaded=!0}dispose(){this.glass.material.dispose(),this.title.material.uniforms.tTitle.value.dispose(),this.title.material.dispose()}},{clamp:Z,lerp:Q,degToRad:$e}=ue,$=(e,t,n)=>{let r=Z((n-e)/(t-e),0,1);return r*r*(3-2*r)},et=class extends Se{constructor({world:e,cards:t,fx:n,camera:r,behind:i}){super(),Object.assign(this,{world:e,cards:t,fx:n,camera:r,behind:i}),this.needsSwap=!1,this.copy=new ae(new x({uniforms:{tDiffuse:{value:null}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`uniform sampler2D tDiffuse; varying vec2 vUv; void main() { gl_FragColor = texture2D(tDiffuse, vUv); }`,depthTest:!1,depthWrite:!1}))}render(e,t,n){let r=e.autoClear;e.autoClear=!1,e.setRenderTarget(n),e.clear(!0,!0,!1),e.render(this.world,this.camera),this.copy.material.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(this.behind),this.copy.render(e),e.setRenderTarget(n),e.render(this.cards,this.camera),e.render(this.fx,this.camera),e.autoClear=r}dispose(){this.copy.dispose()}},tt=class{constructor(e,t,{mobile:n=!1}={}){this.canvas=e,this.services=t,this.mobile=n,this.renderer=new i({canvas:e,antialias:!1,powerPreference:`high-performance`}),this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.08,this.camera=new a(34,1,.05,80),this.world=new r,this.cardScene=new r,this.fx=new r,this.state={progress:0,target:N[0],focus:N[0],pointer:new C,pointerSmooth:new C,pointerInside:!1,reveal:0},this.time=0,this.active=!1,this.lowPower=Ce(this.renderer),this.pixelRatioCap=this.lowPower?.5:n?1.25:1.5,this.hovered=-1,this.focusIndex=-1,this.listeners={focus:[],hover:[],select:[]},this._ray=new d,this._inv=new j,this._v=new P,this._o=new P,this._d=new P,this._ndc=new C,this._uv=new C,this.heldHover=-1,this._frameTimes=[],this.#t(),this.resize(),e.addEventListener(`click`,()=>{this.hovered>=0&&this.#e(`select`,this.hovered)})}on(e,t){this.listeners[e].push(t)}#e(e,t){for(let n of this.listeners[e])n(t)}#t(){let{renderer:e,world:t}=this,n=new r;n.add(new O(new m(10,32,16),new w({color:328708,side:1})));let i=(e,t,r,i,a)=>{let o=new O(new D(t,r),new w({color:e,side:2}));o.position.set(...i),o.lookAt(...a),n.add(o)};i(new v(2.4,2.2,2),6,1.4,[-1.5,6,3],[0,0,0]),i(new v(3.2,.7,.3),.7,9,[6,0,-1.5],[0,0,0]),i(new v(.5,.65,1.1),.5,7,[-6,-.5,1.5],[0,0,0]),i(new v(1.6,.9,.45),8,.6,[0,-6,2],[0,0,0]),i(new v(.12,.11,.1),5,12,[1.2,0,7.5],[0,0,0]),i(new v(2,1.85,1.7),.35,12,[-2.2,0,7],[0,0,0]);let a=new ee(e);t.environment=a.fromScene(n,.02).texture,t.environmentIntensity=.9,a.dispose(),t.add(new s(3812388,460037,.5));let o=new b(16770764,1.6);o.position.set(-3,5,4);let c=new b(16730658,2.4);c.position.set(4,1,-3),t.add(o,c),this.backdrop=Le(),t.add(this.backdrop),this.headline=Re(`SPECIAL SERVICES`,{width:7.6,color:`#5c524a`}),this.headline.position.set(0,Ee.bladeTop-.35,-2.6),t.add(this.headline),this.katana=Ie(),t.add(this.katana.group),this.lilies=He(),this.embers=Ue(),this.farDust=We(),this.fx.add(this.lilies,this.embers,this.farDust),this.behind=new se(1,1,{type:S,generateMipmaps:!0,minFilter:A,magFilter:ce,depthBuffer:!1});let l={slab:Ge(G),titlePlane:new D(G.W,G.H),behind:{value:this.behind.texture},res:{value:new C(1,1)},time:{value:0}};this.shared=l,this.cards=this.services.map((e,t)=>new Qe(e,t,this.services.length,l));for(let e of this.cards)this.cardScene.add(e.group);let u=e.getDrawingBufferSize(new C),d=new se(u.x,u.y,{type:S});this.composer=new fe(e,d),this.composer.addPass(new et({world:t,cards:this.cardScene,fx:this.fx,camera:this.camera,behind:this.behind})),this.bloom=new _e(new C(u.x/2,u.y/2),.5,.55,.86),this.composer.addPass(this.bloom),this.lens=new de(xe),this.lens.uniforms.uVignette.value=.32,this.composer.addPass(this.lens),this.composer.addPass(new ve),!this.mobile&&!this.lowPower&&this.composer.addPass(new le),this.grain=new de(ge),this.composer.addPass(this.grain)}async loadMedia(){if(this.mediaPromise)return this.mediaPromise;let e=typeof createImageBitmap==`function`,t=e?new p().setOptions({imageOrientation:`flipY`,premultiplyAlpha:`none`}):new ye,n=this.mobile?`/media/services/sm/`:`/media/services/`,r=this.cards.map(e=>e.index).sort((e,t)=>Math.abs(e-this.state.focus)-Math.abs(t-this.state.focus));return this.mediaPromise=(async()=>{for(let i of r){let r=this.cards[i];try{let a=await t.loadAsync(`${n}${M(i)}.webp?v=5`),o=new f(a);o.colorSpace=I,o.flipY=!e,o.generateMipmaps=!0,o.minFilter=A,o.anisotropy=4,o.needsUpdate=!0,this.renderer.initTexture(o),r.setMap(o)}catch(e){console.warn(`card art failed to load`,i,e)}}})(),this.mediaPromise}#n(e){if(e.video||!e.service.video)return;let t=document.createElement(`video`);t.src=`/media/services/${M(e.index)}.mp4`,t.muted=!0,t.loop=!0,t.playsInline=!0,t.preload=`auto`,t.setAttribute(`aria-hidden`,`true`);let n=new me(t);n.colorSpace=I,n.generateMipmaps=!0,n.minFilter=A,e.video=t,e.u.tVideo.value=n}setProgress(e){this.state.progress=Z(e,0,1),this.state.target=be(this.state.progress)}progressFor(e){return pe(e)}setPointer(e,t,n){this.state.pointer.set(e,t),this.state.pointerInside=n}setActive(e){if(e!==this.active){if(this.active=e,e)this.lastTick=performance.now(),this._lastFrame=void 0,this._frameTimes.length=0;else for(let e of this.cards)e.video?.pause()}}resize(){let e=this.canvas.clientWidth||window.innerWidth,t=this.canvas.clientHeight||window.innerHeight;if(!e||!t)return;this.width=e,this.height=t;let n=Math.min(window.devicePixelRatio||1,this.pixelRatioCap);this.pixelRatio=n,this.renderer.setPixelRatio(n),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.composer.setPixelRatio(n),this.composer.setSize(e,t);let r=Math.floor(e*n),i=Math.floor(t*n);this.bloom.resolution.set(r/2,i/2),this.grain.uniforms.uRes.value.set(r,i),this.behind.setSize(Math.max(1,r>>1),Math.max(1,i>>1)),this.shared.res.value.set(r,i),this.backdrop.material.uniforms.uRes.value.set(r,i);let a=i*.0105;this.lilies.material.uniforms.uScale.value=a,this.embers.material.uniforms.uScale.value=a,this.farDust.material.uniforms.uScale.value=a}start(){this.lastTick=performance.now(),this.renderer.setAnimationLoop(()=>this.tick())}tick(e){let t=performance.now(),n=e??Math.min((t-this.lastTick)/1e3,1/20);if(this.lastTick=t,!this.active||!this.width)return;this.time+=n;let r=this.state;r.focus+=(r.target-r.focus)*(1-Math.exp(-n*6)),r.pointerSmooth.lerp(r.pointer,1-Math.exp(-n*3)),r.reveal=Math.min(1,r.reveal+n*.8),this.shared.time.value=this.time,this.#r(),this.#i(n),this.#a(n),this.#o(),this.katana.update(this.time),this.backdrop.material.uniforms.uTime.value=this.time,this.backdrop.material.uniforms.uScroll.value=r.focus*k.drop;for(let e of[this.lilies,this.embers,this.farDust])e.material.uniforms.uTime.value=this.time;this.farDust.material.uniforms.uCamY.value=this.camera.position.y,this.lens.uniforms.uTime.value=this.time,this.grain.uniforms.uTime.value=this.time,this.composer.render(),this.#s()}#r(){let{camera:e,state:t}=this,n=t.focus,r=this.width/this.height,i=Z((1.2-r)/.7,0,1),a=Q(34,46,i);Math.abs(e.fov-a)>.01&&(e.fov=a,e.updateProjectionMatrix());let o=Q(.47,.84,i),s=G.W/o/(2*Math.tan($e(a/2))*r),c=Math.max(3.6,s+k.radius*.98),l=$(-.3,-2.4,n)**1.3,u=$(13.1,N[1],n),d=-n*k.drop,f=this.time,p=Math.sin(k.front)*k.radius*i;e.position.set(p+t.pointerSmooth.x*.12+Math.sin(f*.21)*.03,d+.2+l*2.5+t.pointerSmooth.y*.05+Math.sin(f*.33)*.02,c+l*1.3+u*.2),e.lookAt(p,d-.14+l*1.25-u*.4-i*.32,0)}#i(e){let t=this.state.focus,n=this.camera;for(let r of this.cards){let i=r.index-t,a=k.front+i*k.step,o=r.group,s=Math.abs(i)<5.2;if(o.visible=s,!s){r.video?.pause();continue}o.position.set(Math.sin(a)*k.radius,-r.index*k.drop,Math.cos(a)*k.radius),o.rotation.set(0,a,0),o.updateMatrixWorld();let c=Math.abs(i),l=Math.cos(a);r.focus=1-$(0,1,c);let u=Q(.5,1,$(-.4,.75,l))*$(4.8,2.8,c)*this.state.reveal,d=r.u,f=r.tu;d.uFocus.value=r.focus,d.uDim.value=u,f.uFocus.value=r.focus,f.uDim.value=u*Q(.5,1,r.focus)*$(-.1,.4,l),o.worldToLocal(d.uCamLocal.value.copy(n.position));let p=+!!r.loaded;d.uLoaded.value+=(p-d.uLoaded.value)*(1-Math.exp(-e*3));let m=r.hoverTarget>r.hover?2.4:1.4;if(r.hover+=(r.hoverTarget-r.hover)*(1-Math.exp(-e*m)),d.uHover.value=r.hover,r.glitch=Math.max(0,r.glitch-e*2.2),r.hoverTarget>0&&Math.random()<e*.5&&(r.glitch=Math.max(r.glitch,.35)),f.uGlitch.value=r.glitch*r.glitch,r.service.video){(c<.6||r.hoverTarget>0)&&this.active?(this.#n(r),r.video.paused&&r.video.play().catch(()=>{})):r.video&&!r.video.paused&&r.video.pause();let t=r.video&&!r.video.paused&&r.video.readyState>=2?1:0;r.videoMix+=(t-r.videoMix)*(1-Math.exp(-e*4)),d.uVideoMix.value=r.videoMix}}}pick(e,t){this._ray.setFromCamera(this._ndc.set(e,t),this.camera);let{origin:n,direction:r}=this._ray.ray,i=null,a=1/0;for(let e of this.cards){if(!e.group.visible||Math.abs(e.index-this.state.focus)>2.2)continue;this._inv.copy(e.group.matrixWorld).invert();let t=this._o.copy(n).applyMatrix4(this._inv),o=this._d.copy(r).transformDirection(this._inv);if(o.z>=-1e-4)continue;let s=(G.T/2-t.z)/o.z;if(s<=0)continue;let c=t.x+o.x*s,l=t.y+o.y*s;if(Math.abs(c)>G.W/2||Math.abs(l)>G.H/2)continue;let u=this._v.set(c,l,G.T/2).applyMatrix4(e.group.matrixWorld).distanceTo(n);u<a&&(a=u,i={index:e.index,uv:[c/G.W+.5,l/G.H+.5]})}return i}holdHover(e){this.heldHover=e}#a(){let e=this.state,t=e.pointerInside?this.pick(e.pointer.x,e.pointer.y):null;!t&&this.heldHover>=0&&Math.abs(this.heldHover-e.focus)<.6&&(t={index:this.heldHover,uv:[.5,.5]});let n=t?t.index:-1;for(let e of this.cards){let r=e.index===n;r&&e.hoverTarget===0&&(e.u.uHoverUV.value.set(...t.uv),e.glitch=.9),r&&e.u.uHoverUV.value.lerp(this._uv.set(...t.uv),.04),e.hoverTarget=+!!r}n!==this.hovered&&(this.hovered=n,this.canvas.style.cursor=n>=0&&e.pointerInside?`pointer`:``,this.#e(`hover`,n))}#o(){let e=Z(Math.round(this.state.focus),0,this.cards.length-1),t=this.state.focus>-.6&&this.state.focus<this.cards.length-.4?e:-1;t!==this.focusIndex&&(t>=0&&(this.cards[t].glitch=1),this.focusIndex=t,this.#e(`focus`,t))}#s(){let e=performance.now(),t=(e-(this._lastFrame??e))/1e3;if(this._lastFrame=e,this.time<(this.lowPower?1:4))return;let n=this._frameTimes;if(n.push(t),n.length<(this.lowPower?20:90))return;let r=n.reduce((e,t)=>e+t,0)/n.length;n.length=0;let i=.5;r>1/45&&this.pixelRatioCap>i&&(this.pixelRatioCap=r>1/15?i:Math.max(i,this.pixelRatioCap-.25),this.resize())}};export{tt as ServicesScene};