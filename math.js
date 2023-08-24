!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).math=e()}(this,(function(){"use strict";const t=1e-6,e=180/Math.PI,r=Math.PI/180,n=2*Math.PI,o=Object.freeze({__proto__:null,D2R:r,EPSILON:t,R2D:e,TWO_PI:n}),a=(e,r,n=t)=>Math.abs(e-r)<n,i=(e,r,n=t)=>a(e,r,n)?0:Math.sign(r-e),c=(e,r,n=t)=>{for(let t=0;t<Math.max(e.length,r.length);t+=1)if(!a(e[t]||0,r[t]||0,n))return!1;return!0},s=(e,r=t)=>e>-r,l=(e,r=t)=>e>r,u=()=>!0,p=()=>!0,m=s,h=l,g=(e,r=t)=>e>-r&&e<1+r,d=(e,r=t)=>e>r&&e<1-r,f=t=>t,v=e=>e<-t?0:e>1.000001?1:e,M=Object.freeze({__proto__:null,clampLine:f,clampRay:e=>e<-t?0:e,clampSegment:v,epsilonCompare:i,epsilonEqual:a,epsilonEqualVectors:c,exclude:l,excludeL:p,excludeR:h,excludeS:d,include:s,includeL:u,includeR:m,includeS:g}),_=t=>null!=t&&"function"==typeof t[Symbol.iterator],x=function(){switch(arguments.length){case 0:return Array.from(arguments);case 1:return _(arguments[0])&&"string"!=typeof arguments[0]?x(...arguments[0]):[arguments[0]];default:return Array.from(arguments).map((t=>_(t)?[...x(t)]:t))}},b=function(){switch(arguments.length){case 0:return Array.from(arguments);case 1:return _(arguments[0])&&"string"!=typeof arguments[0]?b(...arguments[0]):[arguments[0]];default:return Array.from(arguments).map((t=>_(t)?[...b(t)]:t)).flat()}},y=Object.freeze({__proto__:null,flattenArrays:b,semiFlattenArrays:x}),k=function(){let t=b(arguments);const e=t[0];return"object"!=typeof e||null===e||Number.isNaN(e.x)||(t=["x","y","z"].map((t=>e[t])).filter((t=>void 0!==t))),t.filter((t=>"number"==typeof t))},P=function(){return x(arguments).map((t=>k(t)))},O=(t,e=[])=>({vector:t,origin:e}),j=Object.freeze({__proto__:null,getArrayOfVectors:P,getLine:function(){const t=x(arguments);return 0===t.length||null==t[0]?O([],[]):t[0].constructor===Object&&void 0!==t[0].vector?O(t[0].vector,t[0].origin||[]):"number"==typeof t[0]?O(k(t)):O(...t.map((t=>k(t))))},getSegment:function(){const t=x(arguments);return 4===t.length?[[0,1],[2,3]].map((e=>e.map((e=>t[e])))):t.map((t=>k(t)))},getVector:k}),z=(t,e)=>t+(e||0),A=t=>Math.sqrt(t.map((t=>t*t)).reduce(z,0)),S=t=>Math.sqrt(t[0]*t[0]+t[1]*t[1]),C=t=>Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]),L=t=>t.map((t=>t*t)).reduce(z,0),N=t=>{const e=A(t);return 0===e?t:t.map((t=>t/e))},w=t=>{const e=S(t);return 0===e?t:[t[0]/e,t[1]/e]},I=t=>{const e=C(t);return 0===e?t:[t[0]/e,t[1]/e,t[2]/e]},R=(t,e)=>t.map((t=>t*e)),q=(t,e)=>[t[0]*e,t[1]*e],V=(t,e)=>[t[0]*e,t[1]*e,t[2]*e],B=(t,e)=>t.map(((t,r)=>t+(e[r]||0))),F=(t,e)=>[t[0]+e[0],t[1]+e[1]],T=(t,e)=>[t[0]+e[0],t[1]+e[1],t[2]+e[2]],E=(t,e)=>t.map(((t,r)=>t-(e[r]||0))),U=(t,e)=>[t[0]-e[0],t[1]-e[1]],D=(t,e)=>[t[0]-e[0],t[1]-e[1],t[2]-e[2]],Z=(t,e)=>t.map(((r,n)=>t[n]*e[n])).reduce(z,0),$=(t,e)=>t[0]*e[0]+t[1]*e[1],X=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],Y=(t,e)=>q(F(t,e),.5),H=(t,e,r)=>{const n=1-r;return t.map(((t,o)=>t*n+(e[o]||0)*r))},Q=(t,e)=>t[0]*e[1]-t[1]*e[0],W=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],G=(t,e)=>Math.sqrt(t.map(((r,n)=>(t[n]-e[n])**2)).reduce(z,0)),J=(t,e)=>{const r=t[0]-e[0],n=t[1]-e[1];return Math.sqrt(r*r+n*n)},K=t=>t.map((t=>-t)),tt=t=>[-t[1],t[0]],et=t=>[t[1],-t[0]],rt=(e,r,n=t)=>1-Math.abs(Z(e,r))<n,nt=(e,r,n=t)=>rt(N(e),N(r),n),ot=(t,e)=>e.length===t?e:Array(t).fill(0).map(((t,r)=>e[r]?e[r]:t)),at=(t=[1,0])=>{const e=w(t);return[e,tt(e)]},it=(t=[1,0,0])=>{const e=I(t),r=[[1,0,0],[0,1,0],[0,0,1]].map((t=>W(t,e))),n=r.map(C).map(((t,e)=>({n:t,i:e}))).sort(((t,e)=>e.n-t.n)).map((t=>t.i)).shift(),o=I(r[n]);return[e,o,W(e,o)]},ct=Object.freeze({__proto__:null,add:B,add2:F,add3:T,average:function(){if(0===arguments.length)return;const t=arguments[0].length>0?arguments[0].length:0,e=Array(t).fill(0);return Array.from(arguments).forEach((t=>e.forEach(((r,n)=>{e[n]+=t[n]||0})))),e.map((t=>t/arguments.length))},average2:(...t)=>{if(!t||!t.length)return;const e=1/t.length;return t.reduce(((t,e)=>F(t,e)),[0,0]).map((t=>t*e))},basisVectors:t=>2===t.length?at(t):it(t),basisVectors2:at,basisVectors3:it,cross2:Q,cross3:W,degenerate:(e,r=t)=>e.map((t=>Math.abs(t))).reduce(z,0)<r,distance:G,distance2:J,distance3:(t,e)=>{const r=t[0]-e[0],n=t[1]-e[1],o=t[2]-e[2];return Math.sqrt(r*r+n*n+o*o)},dot:Z,dot2:$,dot3:X,flip:K,lerp:H,magSquared:L,magnitude:A,magnitude2:S,magnitude3:C,midpoint:(t,e)=>t.map(((t,r)=>(t+e[r])/2)),midpoint2:Y,midpoint3:(t,e)=>V(T(t,e),.5),normalize:N,normalize2:w,normalize3:I,parallel:nt,parallel2:(e,r,n=t)=>Math.abs(Q(e,r))<n,parallelNormalized:rt,resize:ot,resizeUp:(t,e)=>[t,e].map((r=>ot(Math.max(t.length,e.length),r))),rotate270:et,rotate90:tt,scale:R,scale2:q,scale3:V,subtract:E,subtract2:U,subtract3:D}),st=t=>Math.atan2(t[1],t[0]),lt=t=>[Math.cos(t),Math.sin(t)],ut=Object.freeze({__proto__:null,angleToVector:lt,pointsToLine:(...t)=>{const e=P(...t);return{vector:E(e[1],e[0]),origin:e[0]}},uniqueLineToVecLine:({normal:t,distance:e})=>({vector:et(t),origin:R(t,e)}),vecLineToUniqueLine:({vector:t,origin:e})=>{const r=A(t),n=tt(t),o=Z(e,n)/r;return{normal:R(n,1/r),distance:o}},vectorToAngle:st}),pt=function(t){const e=`${t}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return Math.max(0,(e[1]?e[1].length:0)-(e[2]?+e[2]:0))},mt=Object.freeze({__proto__:null,cleanNumber:function(t,e=15){if("number"!=typeof t)return t;const r=parseFloat(t.toFixed(e));return pt(r)===Math.min(e,pt(t))?t:r}}),ht=(t,e,r)=>{const n=t.map(((t,n)=>({i:n,d:r(e,t)})));let o,a=1/0;for(let t=0;t<n.length;t+=1)n[t].d<a&&(o=t,a=n[t].d);return o},gt=(e,r=t)=>{if(!e||!e.length)return;const n=((t,e,r,n)=>{let o=[0];for(let a=1;a<t.length;a+=1)switch(r(t[a][e],t[o[0]][e],n)){case 0:o.push(a);break;case 1:o=[a]}return o})(e,0,i,r);let o=0;for(let t=1;t<n.length;t+=1)e[n[t]][1]<e[n[o]][1]&&(o=t);return n[o]},dt=Object.freeze({__proto__:null,minimum2DPointIndex:gt,smallestComparisonSearch:ht}),ft=(t,e=[1,0,0],r=[0,0,0])=>{const n=ot(3,t),o=D(n,ot(3,r)),a=I(ot(3,e)),i=X(a,o),c=V(a,i);return D(n,c)},vt=Object.freeze({__proto__:null,projectPointOnPlane:ft}),Mt=(t,e,r)=>t.map(((t,n)=>({i:n,n:r(t,e)}))).sort(((t,e)=>t.n-e.n)).map((t=>t.i)),_t=(e,r=t)=>{const n=[[0]];let o=0;for(let t=1;t<e.length;t+=1)a(e[t],e[t-1],r)?n[o].push(t):(o=n.length,n.push([t]));return n},xt=(e,r=t)=>{const n=gt(e,r);if(void 0===n)return[];const o=e.map((t=>U(t,e[n]))).map((t=>w(t))).map((t=>$([0,1],t))),a=o.map(((t,e)=>({a:t,i:e}))).sort(((t,e)=>t.a-e.a)).map((t=>t.i)).filter((t=>t!==n));return[[n]].concat(_t(a.map((t=>o[t])),r).map((t=>t.map((t=>a[t])))).map((t=>1===t.length?t:t.map((t=>({i:t,len:J(e[t],e[n])}))).sort(((t,e)=>t.len-e.len)).map((t=>t.i)))))},bt=t=>{const e=[t=>t[0]>=0&&t[1]>=0,t=>t[0]<0&&t[1]>=0,t=>t[0]<0&&t[1]<0,t=>t[0]>=0&&t[1]<0],r=[(e,r)=>t[r][0]-t[e][0],(e,r)=>t[r][0]-t[e][0],(e,r)=>t[e][0]-t[r][0],(e,r)=>t[e][0]-t[r][0]],n=t.map((t=>e.map(((e,r)=>e(t)?r:void 0)).filter((t=>void 0!==t)).shift())),o=[[],[],[],[]];return n.forEach(((t,e)=>{o[t].push(e)})),o.flatMap(((t,e)=>t.sort(r[e])))},yt=Object.freeze({__proto__:null,clusterIndicesOfSortedNumbers:_t,radialSortPointIndices2:xt,radialSortPointIndices3:(t,e=[1,0,0],r=[0,0,0])=>{const n=it(e),o=[n[1],n[2],n[0]],a=t.map((t=>ft(t,e,r))).map((t=>E(t,r))).map((t=>[Z(t,o[0]),Z(t,o[1])])).map(w);return bt(a)},radialSortUnitVectors2:bt,sortAgainstItem:Mt,sortPointsAlongVector:(t,e)=>Mt(t,e,Z)}),kt=t=>"object"!=typeof t?typeof t:void 0!==t.radius?"circle":t.min&&t.max&&t.span?"box":"number"==typeof t[0]?"vector":void 0!==t.vector&&void 0!==t.origin?"line":void 0!==t[0]&&t[0].length&&"number"==typeof t[0][0]?2===t.length?"segment":"polygon":"object",Pt={...o,...M,...j,...ut,...y,...mt,...dt,...yt,typeof:kt},Ot=[1,0,0,1],jt=Ot.concat(0,0),zt=t=>t[0]*t[3]-t[1]*t[2],At=(t=[1,1],e=[0,0])=>[t[0],0,0,t[1],t[0]*-e[0]+e[0],t[1]*-e[1]+e[1]],St=(t,e=[0,0])=>{const r=Math.atan2(t[1],t[0]),n=Math.cos(r),o=Math.sin(r),a=Math.cos(-r),i=Math.sin(-r),c=n*a+o*i,s=n*-i+o*a,l=o*a+-n*i,u=o*-i+-n*a;return[c,s,l,u,e[0]+c*-e[0]+-e[1]*l,e[1]+s*-e[0]+-e[1]*u]},Ct=Object.freeze({__proto__:null,determinant2:zt,identity2x2:Ot,identity2x3:jt,invertMatrix2:t=>{const e=zt(t);if(!(Math.abs(e)<1e-12||Number.isNaN(e))&&Number.isFinite(t[4])&&Number.isFinite(t[5]))return[t[3]/e,-t[1]/e,-t[2]/e,t[0]/e,(t[2]*t[5]-t[3]*t[4])/e,(t[1]*t[4]-t[0]*t[5])/e]},makeMatrix2Reflect:St,makeMatrix2Rotate:(t,e=[0,0])=>{const r=Math.cos(t),n=Math.sin(t);return[r,n,-n,r,e[0],e[1]]},makeMatrix2Scale:At,makeMatrix2Translate:(t=0,e=0)=>Ot.concat(t,e),makeMatrix2UniformScale:(t=1,e=[0,0])=>At([t,t],e),multiplyMatrices2:(t,e)=>[t[0]*e[0]+t[2]*e[1],t[1]*e[0]+t[3]*e[1],t[0]*e[2]+t[2]*e[3],t[1]*e[2]+t[3]*e[3],t[0]*e[4]+t[2]*e[5]+t[4],t[1]*e[4]+t[3]*e[5]+t[5]],multiplyMatrix2Line2:(t,e,r)=>({vector:[t[0]*e[0]+t[2]*e[1],t[1]*e[0]+t[3]*e[1]],origin:[t[0]*r[0]+t[2]*r[1]+t[4],t[1]*r[0]+t[3]*r[1]+t[5]]}),multiplyMatrix2Vector2:(t,e)=>[t[0]*e[0]+t[2]*e[1]+t[4],t[1]*e[0]+t[3]*e[1]+t[5]]}),Lt=Object.freeze([1,0,0,0,1,0,0,0,1]),Nt=Object.freeze(Lt.concat(0,0,0)),wt=(t,e)=>[t[0]*e[0]+t[3]*e[1]+t[6]*e[2],t[1]*e[0]+t[4]*e[1]+t[7]*e[2],t[2]*e[0]+t[5]*e[1]+t[8]*e[2],t[0]*e[3]+t[3]*e[4]+t[6]*e[5],t[1]*e[3]+t[4]*e[4]+t[7]*e[5],t[2]*e[3]+t[5]*e[4]+t[8]*e[5],t[0]*e[6]+t[3]*e[7]+t[6]*e[8],t[1]*e[6]+t[4]*e[7]+t[7]*e[8],t[2]*e[6]+t[5]*e[7]+t[8]*e[8],t[0]*e[9]+t[3]*e[10]+t[6]*e[11]+t[9],t[1]*e[9]+t[4]*e[10]+t[7]*e[11]+t[10],t[2]*e[9]+t[5]*e[10]+t[8]*e[11]+t[11]],It=t=>t[0]*t[4]*t[8]-t[0]*t[7]*t[5]-t[3]*t[1]*t[8]+t[3]*t[7]*t[2]+t[6]*t[1]*t[5]-t[6]*t[4]*t[2],Rt=(t,e,r,n,o)=>{const a=Lt.concat([0,1,2].map((t=>e[t]||0))),i=Math.cos(t),c=Math.sin(t);return a[3*r+r]=i,a[3*r+n]=(o?1:-1)*c,a[3*n+r]=(o?-1:1)*c,a[3*n+n]=i,a},qt=(t=[1,1,1],e=[0,0,0])=>[t[0],0,0,0,t[1],0,0,0,t[2],t[0]*-e[0]+e[0],t[1]*-e[1]+e[1],t[2]*-e[2]+e[2]],Vt=Object.freeze({__proto__:null,determinant3:It,identity3x3:Lt,identity3x4:Nt,invertMatrix3:t=>{const e=It(t);if(Math.abs(e)<1e-12||Number.isNaN(e)||!Number.isFinite(t[9])||!Number.isFinite(t[10])||!Number.isFinite(t[11]))return;const r=[t[4]*t[8]-t[7]*t[5],-t[1]*t[8]+t[7]*t[2],t[1]*t[5]-t[4]*t[2],-t[3]*t[8]+t[6]*t[5],t[0]*t[8]-t[6]*t[2],-t[0]*t[5]+t[3]*t[2],t[3]*t[7]-t[6]*t[4],-t[0]*t[7]+t[6]*t[1],t[0]*t[4]-t[3]*t[1],-t[3]*t[7]*t[11]+t[3]*t[8]*t[10]+t[6]*t[4]*t[11]-t[6]*t[5]*t[10]-t[9]*t[4]*t[8]+t[9]*t[5]*t[7],t[0]*t[7]*t[11]-t[0]*t[8]*t[10]-t[6]*t[1]*t[11]+t[6]*t[2]*t[10]+t[9]*t[1]*t[8]-t[9]*t[2]*t[7],-t[0]*t[4]*t[11]+t[0]*t[5]*t[10]+t[3]*t[1]*t[11]-t[3]*t[2]*t[10]-t[9]*t[1]*t[5]+t[9]*t[2]*t[4]],n=1/e;return r.map((t=>t*n))},isIdentity3x4:e=>Nt.map(((r,n)=>Math.abs(r-e[n])<t)).reduce(((t,e)=>t&&e),!0),makeMatrix3ReflectZ:(t,e=[0,0])=>{const r=St(t,e);return[r[0],r[1],0,r[2],r[3],0,0,0,1,r[4],r[5],0]},makeMatrix3Rotate:(t,e=[0,0,1],r=[0,0,0])=>{const n=[0,1,2].map((t=>r[t]||0)),[o,a,i]=ot(3,N(e)),c=Math.cos(t),s=Math.sin(t),l=1-c,u=Lt.concat(-n[0],-n[1],-n[2]),p=Lt.concat(n[0],n[1],n[2]);return wt(p,wt([l*o*o+c,l*a*o+i*s,l*i*o-a*s,l*o*a-i*s,l*a*a+c,l*i*a+o*s,l*o*i+a*s,l*a*i-o*s,l*i*i+c,0,0,0],u))},makeMatrix3RotateX:(t,e=[0,0,0])=>Rt(t,e,1,2,!0),makeMatrix3RotateY:(t,e=[0,0,0])=>Rt(t,e,0,2,!1),makeMatrix3RotateZ:(t,e=[0,0,0])=>Rt(t,e,0,1,!0),makeMatrix3Scale:qt,makeMatrix3Translate:(t=0,e=0,r=0)=>Lt.concat(t,e,r),makeMatrix3UniformScale:(t=1,e=[0,0,0])=>qt([t,t,t],e),multiplyMatrices3:wt,multiplyMatrix3Line3:(t,e,r)=>({vector:[t[0]*e[0]+t[3]*e[1]+t[6]*e[2],t[1]*e[0]+t[4]*e[1]+t[7]*e[2],t[2]*e[0]+t[5]*e[1]+t[8]*e[2]],origin:[t[0]*r[0]+t[3]*r[1]+t[6]*r[2]+t[9],t[1]*r[0]+t[4]*r[1]+t[7]*r[2]+t[10],t[2]*r[0]+t[5]*r[1]+t[8]*r[2]+t[11]]}),multiplyMatrix3Vector3:(t,e)=>[t[0]*e[0]+t[3]*e[1]+t[6]*e[2]+t[9],t[1]*e[0]+t[4]*e[1]+t[7]*e[2]+t[10],t[2]*e[0]+t[5]*e[1]+t[8]*e[2]+t[11]]}),Bt=Object.freeze([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),Ft=(t,e)=>[t[0]*e[0]+t[4]*e[1]+t[8]*e[2]+t[12]*e[3],t[1]*e[0]+t[5]*e[1]+t[9]*e[2]+t[13]*e[3],t[2]*e[0]+t[6]*e[1]+t[10]*e[2]+t[14]*e[3],t[3]*e[0]+t[7]*e[1]+t[11]*e[2]+t[15]*e[3],t[0]*e[4]+t[4]*e[5]+t[8]*e[6]+t[12]*e[7],t[1]*e[4]+t[5]*e[5]+t[9]*e[6]+t[13]*e[7],t[2]*e[4]+t[6]*e[5]+t[10]*e[6]+t[14]*e[7],t[3]*e[4]+t[7]*e[5]+t[11]*e[6]+t[15]*e[7],t[0]*e[8]+t[4]*e[9]+t[8]*e[10]+t[12]*e[11],t[1]*e[8]+t[5]*e[9]+t[9]*e[10]+t[13]*e[11],t[2]*e[8]+t[6]*e[9]+t[10]*e[10]+t[14]*e[11],t[3]*e[8]+t[7]*e[9]+t[11]*e[10]+t[15]*e[11],t[0]*e[12]+t[4]*e[13]+t[8]*e[14]+t[12]*e[15],t[1]*e[12]+t[5]*e[13]+t[9]*e[14]+t[13]*e[15],t[2]*e[12]+t[6]*e[13]+t[10]*e[14]+t[14]*e[15],t[3]*e[12]+t[7]*e[13]+t[11]*e[14]+t[15]*e[15]],Tt=t=>{const e=t[10]*t[15]-t[11]*t[14],r=t[9]*t[15]-t[11]*t[13],n=t[9]*t[14]-t[10]*t[13],o=t[8]*t[15]-t[11]*t[12],a=t[8]*t[14]-t[10]*t[12],i=t[8]*t[13]-t[9]*t[12];return t[0]*(t[5]*e-t[6]*r+t[7]*n)-t[1]*(t[4]*e-t[6]*o+t[7]*a)+t[2]*(t[4]*r-t[5]*o+t[7]*i)-t[3]*(t[4]*n-t[5]*a+t[6]*i)},Et=Object.freeze([1,0,0,0,0,1,0,0,0,0,1,0]),Ut=(t=0,e=0,r=0)=>[...Et,t,e,r,1],Dt=(t,e,r,n,o)=>{const a=Ut(...e),i=Math.cos(t),c=Math.sin(t);return a[4*r+r]=i,a[4*r+n]=(o?1:-1)*c,a[4*n+r]=(o?-1:1)*c,a[4*n+n]=i,a},Zt=(t=[1,1,1],e=[0,0,0])=>[t[0],0,0,0,0,t[1],0,0,0,0,t[2],0,t[0]*-e[0]+e[0],t[1]*-e[1]+e[1],t[2]*-e[2]+e[2],1],$t=Object.freeze({__proto__:null,determinant4:Tt,identity4x4:Bt,invertMatrix4:t=>{const e=Tt(t);if(Math.abs(e)<1e-12||Number.isNaN(e)||!Number.isFinite(t[12])||!Number.isFinite(t[13])||!Number.isFinite(t[14]))return;const r=t[10]*t[15]-t[11]*t[14],n=t[9]*t[15]-t[11]*t[13],o=t[9]*t[14]-t[10]*t[13],a=t[8]*t[15]-t[11]*t[12],i=t[8]*t[14]-t[10]*t[12],c=t[8]*t[13]-t[9]*t[12],s=t[6]*t[15]-t[7]*t[14],l=t[5]*t[15]-t[7]*t[13],u=t[5]*t[14]-t[6]*t[13],p=t[6]*t[11]-t[7]*t[10],m=t[5]*t[11]-t[7]*t[9],h=t[5]*t[10]-t[6]*t[9],g=t[4]*t[15]-t[7]*t[12],d=t[4]*t[14]-t[6]*t[12],f=t[4]*t[11]-t[7]*t[8],v=t[4]*t[10]-t[6]*t[8],M=t[4]*t[13]-t[5]*t[12],_=t[4]*t[9]-t[5]*t[8],x=[+(t[5]*r-t[6]*n+t[7]*o),-(t[1]*r-t[2]*n+t[3]*o),+(t[1]*s-t[2]*l+t[3]*u),-(t[1]*p-t[2]*m+t[3]*h),-(t[4]*r-t[6]*a+t[7]*i),+(t[0]*r-t[2]*a+t[3]*i),-(t[0]*s-t[2]*g+t[3]*d),+(t[0]*p-t[2]*f+t[3]*v),+(t[4]*n-t[5]*a+t[7]*c),-(t[0]*n-t[1]*a+t[3]*c),+(t[0]*l-t[1]*g+t[3]*M),-(t[0]*m-t[1]*f+t[3]*_),-(t[4]*o-t[5]*i+t[6]*c),+(t[0]*o-t[1]*i+t[2]*c),-(t[0]*u-t[1]*d+t[2]*M),+(t[0]*h-t[1]*v+t[2]*_)],b=1/e;return x.map((t=>t*b))},isIdentity4x4:e=>Bt.map(((r,n)=>Math.abs(r-e[n])<t)).reduce(((t,e)=>t&&e),!0),makeLookAtMatrix4:(t,e,r)=>{const n=I(D(t,e)),o=I(W(r,n)),a=I(W(n,o));return[o[0],o[1],o[2],0,a[0],a[1],a[2],0,n[0],n[1],n[2],0,t[0],t[1],t[2],1]},makeMatrix4ReflectZ:(t,e=[0,0])=>{const r=St(t,e);return[r[0],r[1],0,0,r[2],r[3],0,0,0,0,1,0,r[4],r[5],0,1]},makeMatrix4Rotate:(t,e=[0,0,1],r=[0,0,0])=>{const n=[0,1,2].map((t=>r[t]||0)),[o,a,i]=ot(3,N(e)),c=Math.cos(t),s=Math.sin(t),l=1-c,u=Ut(-n[0],-n[1],-n[2]),p=Ut(n[0],n[1],n[2]);return Ft(p,Ft([l*o*o+c,l*a*o+i*s,l*i*o-a*s,0,l*o*a-i*s,l*a*a+c,l*i*a+o*s,0,l*o*i+a*s,l*a*i-o*s,l*i*i+c,0,0,0,0,1],u))},makeMatrix4RotateX:(t,e=[0,0,0])=>Dt(t,e,1,2,!0),makeMatrix4RotateY:(t,e=[0,0,0])=>Dt(t,e,0,2,!1),makeMatrix4RotateZ:(t,e=[0,0,0])=>Dt(t,e,0,1,!0),makeMatrix4Scale:Zt,makeMatrix4Translate:Ut,makeMatrix4UniformScale:(t=1,e=[0,0,0])=>Zt([t,t,t],e),makeOrthographicMatrix4:(t,e,r,n,o,a)=>[2/(e-n),0,0,0,0,2/(t-r),0,0,0,0,2/(o-a),0,(n+e)/(n-e),(r+t)/(r-t),(o+a)/(o-a),1],makePerspectiveMatrix4:(t,e,r,n)=>{const o=Math.tan(.5*Math.PI-.5*t),a=1/(r-n);return[o/e,0,0,0,0,o,0,0,0,0,(r+n)*a,-1,0,0,r*n*a*2,0]},multiplyMatrices4:Ft,multiplyMatrix4Line3:(t,e,r)=>({vector:[t[0]*e[0]+t[4]*e[1]+t[8]*e[2],t[1]*e[0]+t[5]*e[1]+t[9]*e[2],t[2]*e[0]+t[6]*e[1]+t[10]*e[2]],origin:[t[0]*r[0]+t[4]*r[1]+t[8]*r[2]+t[12],t[1]*r[0]+t[5]*r[1]+t[9]*r[2]+t[13],t[2]*r[0]+t[6]*r[1]+t[10]*r[2]+t[14]]}),multiplyMatrix4Vector3:(t,e)=>[t[0]*e[0]+t[4]*e[1]+t[8]*e[2]+t[12],t[1]*e[0]+t[5]*e[1]+t[9]*e[2]+t[13],t[2]*e[0]+t[6]*e[1]+t[10]*e[2]+t[14]]}),Xt={...ct,...Ct,...Vt,...$t,...Object.freeze({__proto__:null,matrix4FromQuaternion:t=>Ft([t[3],t[2],-t[1],t[0],-t[2],t[3],t[0],t[1],t[1],-t[0],t[3],t[2],-t[0],-t[1],-t[2],t[3]],[t[3],t[2],-t[1],-t[0],-t[2],t[3],t[0],-t[1],t[1],-t[0],t[3],-t[2],t[0],t[1],t[2],t[3]]),quaternionFromTwoVectors:(t,e)=>{const r=W(t,e),n=[r[0],r[1],r[2],Z(t,e)];return n[3]+=A(n),N(n)}})},Yt=(t,e)=>{for(;t<0;)t+=n;for(;e<0;)e+=n;for(;t>n;)t-=n;for(;e>n;)e-=n;const r=t-e;return r>=0?r:n-(e-t)},Ht=(t,e)=>{for(;t<0;)t+=n;for(;e<0;)e+=n;for(;t>n;)t-=n;for(;e>n;)e-=n;const r=e-t;return r>=0?r:n-(t-e)},Qt=(t,e)=>{const r=e[0]*t[0]+e[1]*t[1],o=e[0]*t[1]-e[1]*t[0];let a=Math.atan2(o,r);return a<0&&(a+=n),a},Wt=(t,e)=>{const r=t[0]*e[0]+t[1]*e[1],o=t[0]*e[1]-t[1]*e[0];let a=Math.atan2(o,r);return a<0&&(a+=n),a},Gt=(t,e)=>lt(st(t)-Qt(t,e)/2),Jt=(t,e,r)=>{const n=Yt(t,e)/r;return Array.from(Array(r-1)).map(((e,r)=>t+n*(r+1)))},Kt=(t,e,r)=>{const n=Ht(t,e)/r;return Array.from(Array(r-1)).map(((e,r)=>t+n*(r+1)))},te=(t,e,r)=>{const n=Math.atan2(t[1],t[0]),o=Math.atan2(e[1],e[0]);return Kt(n,o,r).map(lt)},ee=t=>{const e=t.map(((t,e)=>e)).sort(((e,r)=>t[e]-t[r]));return e.slice(e.indexOf(0),e.length).concat(e.slice(0,e.indexOf(0)))},re=t=>ee(t).map((e=>t[e])).map(((t,e,r)=>[t,r[(e+1)%r.length]])).map((t=>Ht(t[0],t[1]))),ne=(e,r,n,o=t)=>{const i=w(U(r,e)),c=w(U(n,e)),s=Q(i,c);return a(s,0,o)?a(J(e,r)+J(r,n),J(e,n))?0:void 0:Math.sign(s)},oe=Object.freeze({__proto__:null,clockwiseAngle2:Qt,clockwiseAngleRadians:Yt,clockwiseBisect2:Gt,clockwiseSubsect2:(t,e,r)=>{const n=Math.atan2(t[1],t[0]),o=Math.atan2(e[1],e[0]);return Jt(n,o,r).map(lt)},clockwiseSubsectRadians:Jt,counterClockwiseAngle2:Wt,counterClockwiseAngleRadians:Ht,counterClockwiseBisect2:(t,e)=>lt(st(t)+Wt(t,e)/2),counterClockwiseOrder2:t=>ee(t.map(st)),counterClockwiseOrderRadians:ee,counterClockwiseSectors2:t=>re(t.map(st)),counterClockwiseSectorsRadians:re,counterClockwiseSubsect2:te,counterClockwiseSubsectRadians:Kt,isCounterClockwiseBetween:(t,e,r)=>{for(;r<e;)r+=n;for(;t>e;)t-=n;for(;t<e;)t+=n;return t<r},threePointTurnDirection:ne}),ae=Object.freeze({__proto__:null,convexHull:(e=[],r=!1,n=t)=>{if(e.length<2)return[];const o=xt(e,n).map((t=>1===t.length?t:(t=>t.concat(t.slice(0,-1).reverse()))(t))).flat();o.push(o[0]);const a=[o[0]];let i=1;const c={"-1":()=>a.pop(),1:t=>{a.push(t),i+=1},undefined:()=>{i+=1}};for(c[0]=r?c[1]:c[-1];i<o.length;){if(a.length<2){a.push(o[i]),i+=1;continue}const t=a[a.length-2],r=a[a.length-1],s=o[i];c[ne(...[t,r,s].map((t=>e[t])),n)](s)}return a.pop(),a}}),ie=(e,r,n,o=t)=>{const a=Z(e.vector,r.vector),i=Q(e.vector,r.vector),c=Q(U(r.origin,e.origin),r.vector)/i,s=[e.vector,r.vector].map((t=>N(t))),l=(i>-o?[[e.vector,r.vector],[K(r.vector),e.vector]]:[[r.vector,e.vector],[K(e.vector),r.vector]]).map((t=>te(t[0],t[1],n))),u=Math.abs(Q(...s))<o,p=u?void 0:F(e.origin,q(e.vector,c)),m=Array.from(Array(n-1)),h=u?m.map(((t,o)=>H(e.origin,r.origin,(o+1)/n))):m.map((()=>p)),g=l.map((t=>t.map(((t,e)=>({vector:t,origin:[...h[e]]})))));return u&&(g[a>-o?1:0]=[]),g},ce=Object.freeze({__proto__:null,bisectLines2:(e,r,n=t)=>{const o=ie(e,r,2,n).map((t=>t[0]));return o.forEach(((t,e)=>{void 0===t&&delete o[e]})),o},collinearBetween:(e,r,n,o=!1,i=t)=>{if([e,n].map((t=>c(r,t,i))).reduce(((t,e)=>t||e),!1))return o;const s=[[e,r],[r,n]].map((t=>E(t[1],t[0]))).map((t=>N(t)));return a(1,Z(...s),t)},lerpLines:(t,e,r)=>({vector:H(t.vector,e.vector,r),origin:H(t.origin,e.origin,r)}),pleat:ie}),se=({vector:e,origin:r},n,o=f,a=t)=>{r=ot(e.length,r),n=ot(e.length,n);const i=L(e),c=E(n,r),s=o(Z(e,c)/i,a);return B(r,R(e,s))},le=Object.freeze({__proto__:null,nearestPoint:(t,e)=>{const r=ht(t,e,G);return void 0===r?void 0:t[r]},nearestPoint2:(t,e)=>{const r=ht(t,e,J);return void 0===r?void 0:t[r]},nearestPointOnCircle:({radius:t,origin:e},r)=>B(e,R(N(E(r,e)),t)),nearestPointOnLine:se,nearestPointOnPolygon:(t,e)=>t.map(((t,e,r)=>E(r[(e+1)%r.length],t))).map(((e,r)=>({vector:e,origin:t[r]}))).map((t=>se(t,e,v))).map(((t,r)=>({point:t,edge:r,distance:G(t,e)}))).sort(((t,e)=>t.distance-e.distance)).shift()}),ue=t=>Array.from(Array(Math.floor(t))).map(((e,r)=>n*(r/t))),pe=(t,e)=>t.map((t=>[e*Math.cos(t),e*Math.sin(t)])),me=(t=3,e=1)=>pe(ue(t),e),he=(t=3,e=1)=>{const r=Math.PI/t,n=ue(t).map((t=>t+r));return pe(n,e)},ge=t=>.5*t.map(((t,e,r)=>[t,r[(e+1)%r.length]])).map((t=>Q(...t))).reduce(((t,e)=>t+e),0),de=Object.freeze({__proto__:null,boundingBox:(t,e=0)=>{if(!t||!t.length)return;const r=Array(t[0].length).fill(1/0),n=Array(t[0].length).fill(-1/0);t.forEach((t=>t.forEach(((t,o)=>{t<r[o]&&(r[o]=t-e),t>n[o]&&(n[o]=t+e)}))));const o=n.map(((t,e)=>t-r[e]));return{min:r,max:n,span:o}},centroid:t=>{const e=1/(6*ge(t));return t.map(((t,e,r)=>[t,r[(e+1)%r.length]])).map((t=>q(F(...t),Q(...t)))).reduce(((t,e)=>F(t,e)),[0,0]).map((t=>t*e))},circumcircle:(e,r,n)=>{const o=r[0]-e[0],a=r[1]-e[1],i=n[0]-e[0],c=n[1]-e[1],s=o*(e[0]+r[0])+a*(e[1]+r[1]),l=i*(e[0]+n[0])+c*(e[1]+n[1]),u=2*(o*(n[1]-r[1])-a*(n[0]-r[0]));if(Math.abs(u)<t){const t=Math.min(e[0],r[0],n[0]),o=Math.min(e[1],r[1],n[1]),a=.5*(Math.max(e[0],r[0],n[0])-t),i=.5*(Math.max(e[1],r[1],n[1])-o);return{origin:[t+a,o+i],radius:Math.sqrt(a*a+i*i)}}const p=[(c*s-a*l)/u,(o*l-i*s)/u],m=p[0]-e[0],h=p[1]-e[1];return{origin:p,radius:Math.sqrt(m*m+h*h)}},makePolygonCircumradius:me,makePolygonCircumradiusSide:he,makePolygonInradius:(t=3,e=1)=>me(t,e/Math.cos(Math.PI/t)),makePolygonInradiusSide:(t=3,e=1)=>he(t,e/Math.cos(Math.PI/t)),makePolygonNonCollinear:(e,r=t)=>{const n=e.map(((t,e,r)=>[t,r[(e+1)%r.length]])).map((t=>E(t[1],t[0]))).map(((t,e,r)=>[t,r[(e+r.length-1)%r.length]])).map((t=>!nt(t[1],t[0],r)));return e.filter(((t,e)=>n[e]))},makePolygonSideLength:(t=3,e=1)=>me(t,e/2/Math.sin(Math.PI/t)),makePolygonSideLengthSide:(t=3,e=1)=>he(t,e/2/Math.sin(Math.PI/t)),signedArea:ge}),fe=({vector:e,origin:r},n,o=u,a=t)=>{const i=U(n,r),c=L(e),s=Math.sqrt(c);if(s<a)return!1;const l=Q(i,e.map((t=>t/s))),p=$(i,e)/c;return Math.abs(l)<a&&o(p,a/s)},ve=(e,r,n=l,o=t)=>e.map(((t,e,r)=>[t,r[(e+1)%r.length]])).map((t=>Q(w(U(t[1],t[0])),U(r,t[0])))).map((t=>n(t,o))).map(((t,e,r)=>t===r[0])).reduce(((t,e)=>t&&e),!0),Me=Object.freeze({__proto__:null,overlapBoundingBoxes:(e,r,n=t)=>{const o=Math.min(e.min.length,r.min.length);for(let t=0;t<o;t+=1)if(e.min[t]>r.max[t]+n||e.max[t]<r.min[t]-n)return!1;return!0},overlapCirclePoint:({radius:e,origin:r},n,o=l,a=t)=>o(e-J(r,n),a),overlapConvexPolygonPoint:ve,overlapConvexPolygons:(e,r,n=t)=>{for(let t=0;t<2;t+=1){const o=0===t?e:r,a=0===t?r:e;for(let t=0;t<o.length;t+=1){const e=o[t],r=tt(U(o[(t+1)%o.length],o[t])),i=a.map((t=>U(t,e))).map((t=>$(r,t))),c=o[(t+2)%o.length],s=$(r,U(c,e))>0;if(i.map((t=>s?t<n:t>-n)).reduce(((t,e)=>t&&e),!0))return!1}}return!0},overlapLineLine:(e,r,n=u,o=u,a=t)=>{const i=Q(e.vector,r.vector),c=-i,s=U(r.origin,e.origin),l=[-s[0],-s[1]];if(Math.abs(i)<a){if(Math.abs(Q(s,e.vector))>a)return!1;const t=l,i=F(t,e.vector),c=Y(t,i),u=s,p=F(u,r.vector),m=Y(u,p),h=$(e.vector,e.vector),g=$(r.vector,r.vector),d=$(t,r.vector)/g,f=$(i,r.vector)/g,v=$(c,r.vector)/g,M=$(u,e.vector)/h,_=$(p,e.vector)/h,x=$(m,e.vector)/h;return n(M,a)||n(_,a)||o(d,a)||o(f,a)||n(x,a)||o(v,a)}const p=Q(s,r.vector)/i,m=Q(l,e.vector)/c;return n(p,a/S(e.vector))&&o(m,a/S(r.vector))},overlapLinePoint:fe}),_e=(e,r,n=u,o=u,a=t)=>{const i=Q(w(e.vector),w(r.vector));if(Math.abs(i)<a)return;const c=Q(e.vector,r.vector),s=-c,l=[r.origin[0]-e.origin[0],r.origin[1]-e.origin[1]],p=[-l[0],-l[1]],m=Q(l,r.vector)/c,h=Q(p,e.vector)/s;return n(m,a/S(e.vector))&&o(h,a/S(r.vector))?F(e.origin,q(e.vector,m)):void 0},xe=(t,e,r)=>{const n=e[0]-t[0],o=e[1]-t[1],a=n*Math.cos(r)+o*Math.sin(r),i=o*Math.cos(r)-n*Math.sin(r);return[t[0]+a,t[1]+i]},be=t=>{for(let e=1;e<t.length;e+=1)if(!c(t[0],t[e]))return[t[0],t[e]]},ye=(e,{vector:r,origin:n},o=g,a=u,i=t)=>{const c=e.map(((t,e,r)=>[t,r[(e+1)%r.length]])).map((t=>_e({vector:U(t[1],t[0]),origin:t[0]},{vector:r,origin:n},o,a,i))).filter((t=>void 0!==t));switch(c.length){case 0:return;case 1:return[c];default:return be(c)||[c[0]]}},ke=Object.freeze({__proto__:null,intersectCircleCircle:(e,r,n=s,o=s,a=t)=>{const i=e.radius<r.radius?e.radius:r.radius,c=e.radius<r.radius?r.radius:e.radius,l=e.radius<r.radius?e.origin:r.origin,u=e.radius<r.radius?r.origin:e.origin,p=[l[0]-u[0],l[1]-u[1]],m=Math.sqrt(p[0]**2+p[1]**2);if(m<a)return;const h=p.map(((t,e)=>t/m*c+u[e]));if(Math.abs(c+i-m)<a||Math.abs(c-(i+m))<a)return[h];if(m+i<c||c+i<m)return;const g=(d=(i*i-m*m-c*c)/(-2*m*c))>=1?0:d<=-1?Math.PI:Math.acos(d);var d;return[xe(u,h,+g),xe(u,h,-g)]},intersectCircleLine:(e,r,n=s,o=u,a=t)=>{const i=r.vector[0]**2+r.vector[1]**2,c=Math.sqrt(i),l=0===c?r.vector:r.vector.map((t=>t/c)),p=tt(l),m=U(r.origin,e.origin),h=Q(m,l);if(Math.abs(h)>e.radius+a)return;const g=Math.sqrt(e.radius**2-h**2),d=(t,r)=>e.origin[r]-p[r]*h+l[r]*t,f=Math.abs(e.radius-Math.abs(h))<a?[g].map((t=>[t,t].map(d))):[-g,g].map((t=>[t,t].map(d))),v=f.map((t=>t.map(((t,e)=>t-r.origin[e])))).map((t=>t[0]*r.vector[0]+r.vector[1]*t[1])).map((t=>t/i));return f.filter(((t,e)=>o(v[e],a)))},intersectConvexPolygonLine:(e,{vector:r,origin:n},o=g,a=p,i=t)=>{const c=ye(e,{vector:r,origin:n},o,a,i);let s;switch(a){case h:s=m;break;case d:s=g;break;default:return c}const u=ye(e,{vector:r,origin:n},g,s,i);if(void 0===u)return;const f=be(u);if(void 0===f)switch(a){case h:return ve(e,n,l,i)?u:void 0;case d:return ve(e,F(n,r),l,i)||ve(e,n,l,i)?u:void 0;default:return}return ve(e,Y(...f),l,i)?f:c},intersectLineLine:_e}),Pe=(t,e,r)=>{const n=t.map(((t,e)=>({vector:r[e],origin:t}))).map(((t,e,r)=>_e(t,r[(e+1)%r.length],h,h))),o=e.map(((t,e)=>se(t,n[e],(t=>t))));if(3===t.length)return t.map((t=>({type:"skeleton",points:[t,n[0]]}))).concat([{type:"perpendicular",points:[o[0],n[0]]}]);const a=n.map(((t,e)=>G(t,o[e])));let i=0;a.forEach(((t,e)=>{t<a[i]&&(i=e)}));const c=[{type:"skeleton",points:[t[i],n[i]]},{type:"skeleton",points:[t[(i+1)%t.length],n[i]]},{type:"perpendicular",points:[o[i],n[i]]}],s=Gt(K(e[(i+e.length-1)%e.length].vector),e[(i+1)%e.length].vector),l=i===t.length-1;return t.splice(i,2,n[i]),e.splice(i,1),r.splice(i,2,s),l&&(t.splice(0,1),r.splice(0,1),e.push(e.shift())),c.concat(Pe(t,e,r))},Oe={...ae,...ce,...le,...vt,...de,...oe,straightSkeleton:t=>{const e=t.map(((t,e,r)=>[t,r[(e+1)%r.length]])).map((t=>({vector:E(t[1],t[0]),origin:t[0]}))),r=t.map(((t,e,r)=>[(e-1+r.length)%r.length,e,(e+1)%r.length].map((t=>r[t])))).map((t=>[E(t[0],t[1]),E(t[2],t[1])])).map((t=>Gt(...t)));return Pe([...t],e,r)}},je=Object.freeze({__proto__:null,enclosingBoundingBoxes:(e,r,n=t)=>{const o=Math.min(e.min.length,r.min.length);for(let t=0;t<o;t+=1)if(r.min[t]<e.min[t]-n||r.max[t]>e.max[t]+n)return!1;return!0},enclosingPolygonPolygon:(t,e,r=s)=>{const n=t.map((t=>ve(e,t,r))).reduce(((t,e)=>t||e),!1),o=e.map((t=>ve(e,t,r))).reduce(((t,e)=>t&&e),!0);return!n&&o},pointInBoundingBox:(e,r,n=t)=>{for(let t=0;t<e.length;t+=1)if(e[t]<r.min[t]-n||e[t]>r.max[t]+n)return!1;return!0}}),ze=(t,e,r)=>F(e,q(t,r)),Ae=(e,r,n,o,a)=>e.map(((t,e,r)=>[U(r[(e+1)%r.length],t),t])).map((e=>((e,r,n,o,a=g,i=t)=>{const c=Q(w(e),w(n));if(Math.abs(c)<i)return;const s=Q(e,n),l=-s,u=U(o,r),p=K(u),m=Q(u,n)/s;return a(Q(p,e)/l,i/S(n))?m:void 0})(r,n,e[0],e[1],o,a))).filter((t=>void 0!==t)).sort(((t,e)=>t-e)),Se=(e,{vector:r,origin:n},o=s,a=u,i=t)=>{const c=Ae(e,r,n,g,i);if(c.length<2)return;const l=((t,e,r)=>{let n=0,o=t.length-1;for(;n<o&&!e(t[n+1]-t[n],r);)n+=1;for(;o>n&&!e(t[o]-t[o-1],r);)o-=1;if(!(n>=o))return[t[n],t[o]]})(c,o,2*i/S(r));if(void 0===l)return;const p=l.map((t=>a(t)?t:t<.5?0:1));if(Math.abs(p[0]-p[1])<2*i/S(r))return;const m=ze(r,n,(p[0]+p[1])/2);return ve(e,m,o,i)?p.map((t=>ze(r,n,t))):void 0},Ce=Object.freeze({__proto__:null,clipLineConvexPolygon:Se,clipLineInBoundingBox:({vector:t,origin:e},{min:r,max:n,span:o})=>Se(),clipPolygonPolygon:(e,r,n=t)=>{const o=(t,e,r)=>(r[0]-e[0])*(t[1]-e[1])>(r[1]-e[1])*(t[0]-e[0])+n,a=(t,e,r,n)=>{const o=U(t,e),a=U(n,r),i=Q(t,e),c=Q(n,r),s=1/Q(o,a);return q(U(q(a,i),q(o,c)),s)};let i=e,c=r[r.length-1];for(let t=0;t<r.length;t+=1){const e=r[t],n=i;i=[];let s=n[n.length-1];for(let t=0;t<n.length;t+=1){const r=n[t];o(r,c,e)?(o(s,c,e)||i.push(a(c,e,r,s)),i.push(r)):o(s,c,e)&&i.push(a(c,e,r,s)),s=r}c=e}return 0===i.length?void 0:i}}),Le=Object.freeze({__proto__:null,splitConvexPolygon:(t,e)=>{const r=t.map(((t,r)=>({point:fe(e,t,u)?t:null,at_index:r}))).filter((t=>null!=t.point)),n=t.map(((t,e,r)=>({vector:E(t,r[(e+1)%r.length]),origin:r[(e+1)%r.length]}))).map(((t,r)=>({point:_e(e,t,p,d),at_index:r}))).filter((t=>null!=t.point));if(2===n.length){const e=n.slice().sort(((t,e)=>t.at_index-e.at_index)),r=t.slice(e[1].at_index+1).concat(t.slice(0,e[0].at_index+1));r.push(e[0].point),r.push(e[1].point);const o=t.slice(e[0].at_index+1,e[1].at_index+1);return o.push(e[1].point),o.push(e[0].point),[r,o]}if(1===n.length&&1===r.length){r[0].type="v",n[0].type="e";const e=r.concat(n).sort(((t,e)=>t.at_index-e.at_index)),o=t.slice(e[1].at_index+1).concat(t.slice(0,e[0].at_index+1));"e"===e[0].type&&o.push(e[0].point),o.push(e[1].point);const a=t.slice(e[0].at_index+1,e[1].at_index+1);return"e"===e[1].type&&a.push(e[1].point),a.push(e[0].point),[o,a]}if(2===r.length){const e=r.slice().sort(((t,e)=>t.at_index-e.at_index));return[t.slice(e[1].at_index).concat(t.slice(0,e[0].at_index+1)),t.slice(e[0].at_index,e[1].at_index+1)]}return[t.slice()]}}),Ne={polygon:g,circle:s,line:u,ray:m,segment:g};return{...Pt,...Xt,...Oe,...{...je,...Me,...ke,...Ce,...Le,intersect:(e,r,n=t)=>{const o=t=>"polygon"===t?"ConvexPolygon":(t=>t.charAt(0).toUpperCase()+t.slice(1))(t),a=[e,r].map(kt),i=[a,a.slice().reverse()].map((t=>t.map(o).join(""))).map((t=>ke[`intersect${t}`])),c=[e.domain,r.domain].map(((t,e)=>t||Ne[a[e]])),s=[[e,r,...c],[r,e,...c.slice().reverse()]],l=i.map(((t,e)=>({fn:t,params:s[e]}))).filter((t=>t.fn)).shift();return l?l.fn(...l.params,n):void 0}}}}));