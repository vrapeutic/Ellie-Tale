// ThreeCanvas.js r40 - http://github.com/mrdoob/three.js
var THREE = THREE || {};
if (!window.Int32Array) {
  window.Int32Array = Array;
  window.Float32Array = Array;
}
THREE.Color = function (a) {
  this.setHex(a);
};
THREE.Color.prototype = {
  copy: function (a) {
    this.r = a.r;
    this.g = a.g;
    this.b = a.b;
    this.hex = a.hex;
  },
  setHex: function (a) {
    this.hex = ~~a & 16777215;
    this.updateRGB();
  },
  setRGB: function (a, b, c) {
    this.r = a;
    this.g = b;
    this.b = c;
    this.updateHex();
  },
  setHSV: function (a, b, c) {
    var d, e, g, f, i, h;
    if (c == 0) d = e = g = 0;
    else {
      f = Math.floor(a * 6);
      i = a * 6 - f;
      a = c * (1 - b);
      h = c * (1 - b * i);
      b = c * (1 - b * (1 - i));
      switch (f) {
        case 1:
          d = h;
          e = c;
          g = a;
          break;
        case 2:
          d = a;
          e = c;
          g = b;
          break;
        case 3:
          d = a;
          e = h;
          g = c;
          break;
        case 4:
          d = b;
          e = a;
          g = c;
          break;
        case 5:
          d = c;
          e = a;
          g = h;
          break;
        case 6:
        case 0:
          d = c;
          e = b;
          g = a;
      }
    }
    this.setRGB(d, e, g);
  },
  updateHex: function () {
    this.hex =
      (~~(this.r * 255) << 16) ^ (~~(this.g * 255) << 8) ^ ~~(this.b * 255);
  },
  updateRGB: function () {
    this.r = ((this.hex >> 16) & 255) / 255;
    this.g = ((this.hex >> 8) & 255) / 255;
    this.b = (this.hex & 255) / 255;
  },
  clone: function () {
    return new THREE.Color(this.hex);
  },
};
THREE.Vector2 = function (a, b) {
  this.set(a || 0, b || 0);
};
THREE.Vector2.prototype = {
  set: function (a, b) {
    this.x = a;
    this.y = b;
    return this;
  },
  copy: function (a) {
    this.set(a.x, a.y);
    return this;
  },
  addSelf: function (a) {
    this.set(this.x + a.x, this.y + a.y);
    return this;
  },
  add: function (a, b) {
    this.set(a.x + b.x, a.y + b.y);
    return this;
  },
  subSelf: function (a) {
    this.set(this.x - a.x, this.y - a.y);
    return this;
  },
  sub: function (a, b) {
    this.set(a.x - b.x, a.y - b.y);
    return this;
  },
  multiplyScalar: function (a) {
    this.set(this.x * a, this.y * a);
    return this;
  },
  negate: function () {
    this.set(-this.x, -this.y);
    return this;
  },
  unit: function () {
    this.multiplyScalar(1 / this.length());
    return this;
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y;
  },
  clone: function () {
    return new THREE.Vector2(this.x, this.y);
  },
};
THREE.Vector3 = function (a, b, c) {
  this.set(a || 0, b || 0, c || 0);
};
THREE.Vector3.prototype = {
  set: function (a, b, c) {
    this.x = a;
    this.y = b;
    this.z = c;
    return this;
  },
  copy: function (a) {
    this.set(a.x, a.y, a.z);
    return this;
  },
  add: function (a, b) {
    this.set(a.x + b.x, a.y + b.y, a.z + b.z);
    return this;
  },
  addSelf: function (a) {
    this.set(this.x + a.x, this.y + a.y, this.z + a.z);
    return this;
  },
  addScalar: function (a) {
    this.set(this.x + a, this.y + a, this.z + a);
    return this;
  },
  sub: function (a, b) {
    this.set(a.x - b.x, a.y - b.y, a.z - b.z);
    return this;
  },
  subSelf: function (a) {
    this.set(this.x - a.x, this.y - a.y, this.z - a.z);
    return this;
  },
  cross: function (a, b) {
    this.set(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
    return this;
  },
  crossSelf: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z;
    this.set(c * a.z - d * a.y, d * a.x - b * a.z, b * a.y - c * a.x);
    return this;
  },
  multiply: function (a, b) {
    this.set(a.x * b.x, a.y * b.y, a.z * b.z);
    return this;
  },
  multiplySelf: function (a) {
    this.set(this.x * a.x, this.y * a.y, this.z * a.z);
    return this;
  },
  multiplyScalar: function (a) {
    this.set(this.x * a, this.y * a, this.z * a);
    return this;
  },
  divideSelf: function (a) {
    this.set(this.x / a.x, this.y / a.y, this.z / a.z);
    return this;
  },
  divideScalar: function (a) {
    this.set(this.x / a, this.y / a, this.z / a);
    return this;
  },
  negate: function () {
    this.set(-this.x, -this.y, -this.z);
    return this;
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  },
  distanceTo: function (a) {
    return Math.sqrt(this.distanceToSquared(a));
  },
  distanceToSquared: function (a) {
    var b = this.x - a.x,
      c = this.y - a.y;
    a = this.z - a.z;
    return b * b + c * c + a * a;
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  lengthManhattan: function () {
    return this.x + this.y + this.z;
  },
  normalize: function () {
    var a = this.length();
    a > 0 ? this.multiplyScalar(1 / a) : this.set(0, 0, 0);
    return this;
  },
  setPositionFromMatrix: function (a) {
    this.x = a.n14;
    this.y = a.n24;
    this.z = a.n34;
  },
  setRotationFromMatrix: function (a) {
    var b = Math.cos(this.y);
    this.y = Math.asin(a.n13);
    if (Math.abs(b) > 1.0e-5) {
      this.x = Math.atan2(-a.n23 / b, a.n33 / b);
      this.z = Math.atan2(-a.n12 / b, a.n11 / b);
    } else {
      this.x = 0;
      this.z = Math.atan2(a.n21, a.n22);
    }
  },
  setLength: function (a) {
    return this.normalize().multiplyScalar(a);
  },
  isZero: function () {
    return (
      Math.abs(this.x) < 1.0e-4 &&
      Math.abs(this.y) < 1.0e-4 &&
      Math.abs(this.z) < 1.0e-4
    );
  },
  clone: function () {
    return new THREE.Vector3(this.x, this.y, this.z);
  },
};
THREE.Vector4 = function (a, b, c, d) {
  this.set(a || 0, b || 0, c || 0, d || 1);
};
THREE.Vector4.prototype = {
  set: function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = d;
    return this;
  },
  copy: function (a) {
    this.set(a.x, a.y, a.z, a.w || 1);
    return this;
  },
  add: function (a, b) {
    this.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    return this;
  },
  addSelf: function (a) {
    this.set(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w);
    return this;
  },
  sub: function (a, b) {
    this.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    return this;
  },
  subSelf: function (a) {
    this.set(this.x - a.x, this.y - a.y, this.z - a.z, this.w - a.w);
    return this;
  },
  multiplyScalar: function (a) {
    this.set(this.x * a, this.y * a, this.z * a, this.w * a);
    return this;
  },
  divideScalar: function (a) {
    this.set(this.x / a, this.y / a, this.z / a, this.w / a);
    return this;
  },
  lerpSelf: function (a, b) {
    this.set(
      this.x + (a.x - this.x) * b,
      this.y + (a.y - this.y) * b,
      this.z + (a.z - this.z) * b,
      this.w + (a.w - this.w) * b
    );
  },
  clone: function () {
    return new THREE.Vector4(this.x, this.y, this.z, this.w);
  },
};
THREE.Ray = function (a, b) {
  this.origin = a || new THREE.Vector3();
  this.direction = b || new THREE.Vector3();
};
THREE.Ray.prototype = {
  intersectScene: function (a) {
    return this.intersectObjects(a.objects);
  },
  intersectObjects: function (a) {
    var b,
      c,
      d,
      e = [];
    b = 0;
    for (c = a.length; b < c; b++) {
      d = a[b];
      d instanceof THREE.Mesh && (e = e.concat(this.intersectObject(d)));
    }
    e.sort(function (g, f) {
      return g.distance - f.distance;
    });
    return e;
  },
  intersectObject: function (a) {
    function b(D, x, W, X) {
      X = X.clone().subSelf(x);
      W = W.clone().subSelf(x);
      var aa = D.clone().subSelf(x);
      D = X.dot(X);
      x = X.dot(W);
      X = X.dot(aa);
      var H = W.dot(W);
      W = W.dot(aa);
      aa = 1 / (D * H - x * x);
      H = (H * X - x * W) * aa;
      D = (D * W - x * X) * aa;
      return H > 0 && D > 0 && H + D < 1;
    }
    var c,
      d,
      e,
      g,
      f,
      i,
      h,
      j,
      p,
      n,
      o,
      k = a.geometry,
      t = k.vertices,
      w = [];
    c = 0;
    for (d = k.faces.length; c < d; c++) {
      e = k.faces[c];
      n = this.origin.clone();
      o = this.direction.clone();
      h = a.matrixWorld;
      g = h.multiplyVector3(t[e.a].position.clone());
      f = h.multiplyVector3(t[e.b].position.clone());
      i = h.multiplyVector3(t[e.c].position.clone());
      h =
        e instanceof THREE.Face4
          ? h.multiplyVector3(t[e.d].position.clone())
          : null;
      j = a.matrixRotationWorld.multiplyVector3(e.normal.clone());
      p = o.dot(j);
      if (a.doubleSided || (a.flipSided ? p > 0 : p < 0)) {
        j = j.dot(new THREE.Vector3().sub(g, n)) / p;
        n = n.addSelf(o.multiplyScalar(j));
        if (e instanceof THREE.Face3) {
          if (b(n, g, f, i)) {
            e = {
              distance: this.origin.distanceTo(n),
              point: n,
              face: e,
              object: a,
            };
            w.push(e);
          }
        } else if (
          e instanceof THREE.Face4 &&
          (b(n, g, f, h) || b(n, f, i, h))
        ) {
          e = {
            distance: this.origin.distanceTo(n),
            point: n,
            face: e,
            object: a,
          };
          w.push(e);
        }
      }
    }
    return w;
  },
};
THREE.Rectangle = function () {
  function a() {
    g = d - b;
    f = e - c;
  }
  var b,
    c,
    d,
    e,
    g,
    f,
    i = !0;
  this.getX = function () {
    return b;
  };
  this.getY = function () {
    return c;
  };
  this.getWidth = function () {
    return g;
  };
  this.getHeight = function () {
    return f;
  };
  this.getLeft = function () {
    return b;
  };
  this.getTop = function () {
    return c;
  };
  this.getRight = function () {
    return d;
  };
  this.getBottom = function () {
    return e;
  };
  this.set = function (h, j, p, n) {
    i = !1;
    b = h;
    c = j;
    d = p;
    e = n;
    a();
  };
  this.addPoint = function (h, j) {
    if (i) {
      i = !1;
      b = h;
      c = j;
      d = h;
      e = j;
    } else {
      b = b < h ? b : h;
      c = c < j ? c : j;
      d = d > h ? d : h;
      e = e > j ? e : j;
    }
    a();
  };
  this.add3Points = function (h, j, p, n, o, k) {
    if (i) {
      i = !1;
      b = h < p ? (h < o ? h : o) : p < o ? p : o;
      c = j < n ? (j < k ? j : k) : n < k ? n : k;
      d = h > p ? (h > o ? h : o) : p > o ? p : o;
      e = j > n ? (j > k ? j : k) : n > k ? n : k;
    } else {
      b =
        h < p
          ? h < o
            ? h < b
              ? h
              : b
            : o < b
            ? o
            : b
          : p < o
          ? p < b
            ? p
            : b
          : o < b
          ? o
          : b;
      c =
        j < n
          ? j < k
            ? j < c
              ? j
              : c
            : k < c
            ? k
            : c
          : n < k
          ? n < c
            ? n
            : c
          : k < c
          ? k
          : c;
      d =
        h > p
          ? h > o
            ? h > d
              ? h
              : d
            : o > d
            ? o
            : d
          : p > o
          ? p > d
            ? p
            : d
          : o > d
          ? o
          : d;
      e =
        j > n
          ? j > k
            ? j > e
              ? j
              : e
            : k > e
            ? k
            : e
          : n > k
          ? n > e
            ? n
            : e
          : k > e
          ? k
          : e;
    }
    a();
  };
  this.addRectangle = function (h) {
    if (i) {
      i = !1;
      b = h.getLeft();
      c = h.getTop();
      d = h.getRight();
      e = h.getBottom();
    } else {
      b = b < h.getLeft() ? b : h.getLeft();
      c = c < h.getTop() ? c : h.getTop();
      d = d > h.getRight() ? d : h.getRight();
      e = e > h.getBottom() ? e : h.getBottom();
    }
    a();
  };
  this.inflate = function (h) {
    b -= h;
    c -= h;
    d += h;
    e += h;
    a();
  };
  this.minSelf = function (h) {
    b = b > h.getLeft() ? b : h.getLeft();
    c = c > h.getTop() ? c : h.getTop();
    d = d < h.getRight() ? d : h.getRight();
    e = e < h.getBottom() ? e : h.getBottom();
    a();
  };
  this.instersects = function (h) {
    return (
      Math.min(d, h.getRight()) - Math.max(b, h.getLeft()) >= 0 &&
      Math.min(e, h.getBottom()) - Math.max(c, h.getTop()) >= 0
    );
  };
  this.empty = function () {
    i = !0;
    e = d = c = b = 0;
    a();
  };
  this.isEmpty = function () {
    return i;
  };
};
THREE.Matrix3 = function () {
  this.m = [];
};
THREE.Matrix3.prototype = {
  transpose: function () {
    var a,
      b = this.m;
    a = b[1];
    b[1] = b[3];
    b[3] = a;
    a = b[2];
    b[2] = b[6];
    b[6] = a;
    a = b[5];
    b[5] = b[7];
    b[7] = a;
    return this;
  },
  transposeIntoArray: function (a) {
    var b = this.m;
    a[0] = b[0];
    a[1] = b[3];
    a[2] = b[6];
    a[3] = b[1];
    a[4] = b[4];
    a[5] = b[7];
    a[6] = b[2];
    a[7] = b[5];
    a[8] = b[8];
    return this;
  },
};
THREE.Matrix4 = function (a, b, c, d, e, g, f, i, h, j, p, n, o, k, t, w) {
  this.set(
    a || 1,
    b || 0,
    c || 0,
    d || 0,
    e || 0,
    g || 1,
    f || 0,
    i || 0,
    h || 0,
    j || 0,
    p || 1,
    n || 0,
    o || 0,
    k || 0,
    t || 0,
    w || 1
  );
  this.flat = Array(16);
  this.m33 = new THREE.Matrix3();
};
THREE.Matrix4.prototype = {
  set: function (a, b, c, d, e, g, f, i, h, j, p, n, o, k, t, w) {
    this.n11 = a;
    this.n12 = b;
    this.n13 = c;
    this.n14 = d;
    this.n21 = e;
    this.n22 = g;
    this.n23 = f;
    this.n24 = i;
    this.n31 = h;
    this.n32 = j;
    this.n33 = p;
    this.n34 = n;
    this.n41 = o;
    this.n42 = k;
    this.n43 = t;
    this.n44 = w;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  copy: function (a) {
    this.set(
      a.n11,
      a.n12,
      a.n13,
      a.n14,
      a.n21,
      a.n22,
      a.n23,
      a.n24,
      a.n31,
      a.n32,
      a.n33,
      a.n34,
      a.n41,
      a.n42,
      a.n43,
      a.n44
    );
    return this;
  },
  lookAt: function (a, b, c) {
    var d = THREE.Matrix4.__v1,
      e = THREE.Matrix4.__v2,
      g = THREE.Matrix4.__v3;
    g.sub(a, b).normalize();
    if (g.length() === 0) g.z = 1;
    d.cross(c, g).normalize();
    if (d.length() === 0) {
      g.x += 1.0e-4;
      d.cross(c, g).normalize();
    }
    e.cross(g, d).normalize();
    this.n11 = d.x;
    this.n12 = e.x;
    this.n13 = g.x;
    this.n21 = d.y;
    this.n22 = e.y;
    this.n23 = g.y;
    this.n31 = d.z;
    this.n32 = e.z;
    this.n33 = g.z;
    return this;
  },
  multiplyVector3: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z,
      e = 1 / (this.n41 * b + this.n42 * c + this.n43 * d + this.n44);
    a.x = (this.n11 * b + this.n12 * c + this.n13 * d + this.n14) * e;
    a.y = (this.n21 * b + this.n22 * c + this.n23 * d + this.n24) * e;
    a.z = (this.n31 * b + this.n32 * c + this.n33 * d + this.n34) * e;
    return a;
  },
  multiplyVector4: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z,
      e = a.w;
    a.x = this.n11 * b + this.n12 * c + this.n13 * d + this.n14 * e;
    a.y = this.n21 * b + this.n22 * c + this.n23 * d + this.n24 * e;
    a.z = this.n31 * b + this.n32 * c + this.n33 * d + this.n34 * e;
    a.w = this.n41 * b + this.n42 * c + this.n43 * d + this.n44 * e;
    return a;
  },
  rotateAxis: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z;
    a.x = b * this.n11 + c * this.n12 + d * this.n13;
    a.y = b * this.n21 + c * this.n22 + d * this.n23;
    a.z = b * this.n31 + c * this.n32 + d * this.n33;
    a.normalize();
    return a;
  },
  crossVector: function (a) {
    var b = new THREE.Vector4();
    b.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w;
    b.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w;
    b.z = this.n31 * a.x + this.n32 * a.y + this.n33 * a.z + this.n34 * a.w;
    b.w = a.w
      ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w
      : 1;
    return b;
  },
  multiply: function (a, b) {
    var c = a.n11,
      d = a.n12,
      e = a.n13,
      g = a.n14,
      f = a.n21,
      i = a.n22,
      h = a.n23,
      j = a.n24,
      p = a.n31,
      n = a.n32,
      o = a.n33,
      k = a.n34,
      t = a.n41,
      w = a.n42,
      D = a.n43,
      x = a.n44,
      W = b.n11,
      X = b.n12,
      aa = b.n13,
      H = b.n14,
      q = b.n21,
      B = b.n22,
      z = b.n23,
      L = b.n24,
      Y = b.n31,
      C = b.n32,
      A = b.n33,
      I = b.n34;
    this.n11 = c * W + d * q + e * Y;
    this.n12 = c * X + d * B + e * C;
    this.n13 = c * aa + d * z + e * A;
    this.n14 = c * H + d * L + e * I + g;
    this.n21 = f * W + i * q + h * Y;
    this.n22 = f * X + i * B + h * C;
    this.n23 = f * aa + i * z + h * A;
    this.n24 = f * H + i * L + h * I + j;
    this.n31 = p * W + n * q + o * Y;
    this.n32 = p * X + n * B + o * C;
    this.n33 = p * aa + n * z + o * A;
    this.n34 = p * H + n * L + o * I + k;
    this.n41 = t * W + w * q + D * Y;
    this.n42 = t * X + w * B + D * C;
    this.n43 = t * aa + w * z + D * A;
    this.n44 = t * H + w * L + D * I + x;
    return this;
  },
  multiplyToArray: function (a, b, c) {
    this.multiply(a, b);
    c[0] = this.n11;
    c[1] = this.n21;
    c[2] = this.n31;
    c[3] = this.n41;
    c[4] = this.n12;
    c[5] = this.n22;
    c[6] = this.n32;
    c[7] = this.n42;
    c[8] = this.n13;
    c[9] = this.n23;
    c[10] = this.n33;
    c[11] = this.n43;
    c[12] = this.n14;
    c[13] = this.n24;
    c[14] = this.n34;
    c[15] = this.n44;
    return this;
  },
  multiplySelf: function (a) {
    this.multiply(this, a);
    return this;
  },
  multiplyScalar: function (a) {
    this.n11 *= a;
    this.n12 *= a;
    this.n13 *= a;
    this.n14 *= a;
    this.n21 *= a;
    this.n22 *= a;
    this.n23 *= a;
    this.n24 *= a;
    this.n31 *= a;
    this.n32 *= a;
    this.n33 *= a;
    this.n34 *= a;
    this.n41 *= a;
    this.n42 *= a;
    this.n43 *= a;
    this.n44 *= a;
    return this;
  },
  determinant: function () {
    var a = this.n11,
      b = this.n12,
      c = this.n13,
      d = this.n14,
      e = this.n21,
      g = this.n22,
      f = this.n23,
      i = this.n24,
      h = this.n31,
      j = this.n32,
      p = this.n33,
      n = this.n34,
      o = this.n41,
      k = this.n42,
      t = this.n43,
      w = this.n44;
    return (
      d * f * j * o -
      c * i * j * o -
      d * g * p * o +
      b * i * p * o +
      c * g * n * o -
      b * f * n * o -
      d * f * h * k +
      c * i * h * k +
      d * e * p * k -
      a * i * p * k -
      c * e * n * k +
      a * f * n * k +
      d * g * h * t -
      b * i * h * t -
      d * e * j * t +
      a * i * j * t +
      b * e * n * t -
      a * g * n * t -
      c * g * h * w +
      b * f * h * w +
      c * e * j * w -
      a * f * j * w -
      b * e * p * w +
      a * g * p * w
    );
  },
  transpose: function () {
    var a;
    a = this.n21;
    this.n21 = this.n12;
    this.n12 = a;
    a = this.n31;
    this.n31 = this.n13;
    this.n13 = a;
    a = this.n32;
    this.n32 = this.n23;
    this.n23 = a;
    a = this.n41;
    this.n41 = this.n14;
    this.n14 = a;
    a = this.n42;
    this.n42 = this.n24;
    this.n24 = a;
    a = this.n43;
    this.n43 = this.n34;
    this.n43 = a;
    return this;
  },
  clone: function () {
    var a = new THREE.Matrix4();
    a.n11 = this.n11;
    a.n12 = this.n12;
    a.n13 = this.n13;
    a.n14 = this.n14;
    a.n21 = this.n21;
    a.n22 = this.n22;
    a.n23 = this.n23;
    a.n24 = this.n24;
    a.n31 = this.n31;
    a.n32 = this.n32;
    a.n33 = this.n33;
    a.n34 = this.n34;
    a.n41 = this.n41;
    a.n42 = this.n42;
    a.n43 = this.n43;
    a.n44 = this.n44;
    return a;
  },
  flatten: function () {
    this.flat[0] = this.n11;
    this.flat[1] = this.n21;
    this.flat[2] = this.n31;
    this.flat[3] = this.n41;
    this.flat[4] = this.n12;
    this.flat[5] = this.n22;
    this.flat[6] = this.n32;
    this.flat[7] = this.n42;
    this.flat[8] = this.n13;
    this.flat[9] = this.n23;
    this.flat[10] = this.n33;
    this.flat[11] = this.n43;
    this.flat[12] = this.n14;
    this.flat[13] = this.n24;
    this.flat[14] = this.n34;
    this.flat[15] = this.n44;
    return this.flat;
  },
  flattenToArray: function (a) {
    a[0] = this.n11;
    a[1] = this.n21;
    a[2] = this.n31;
    a[3] = this.n41;
    a[4] = this.n12;
    a[5] = this.n22;
    a[6] = this.n32;
    a[7] = this.n42;
    a[8] = this.n13;
    a[9] = this.n23;
    a[10] = this.n33;
    a[11] = this.n43;
    a[12] = this.n14;
    a[13] = this.n24;
    a[14] = this.n34;
    a[15] = this.n44;
    return a;
  },
  flattenToArrayOffset: function (a, b) {
    a[b] = this.n11;
    a[b + 1] = this.n21;
    a[b + 2] = this.n31;
    a[b + 3] = this.n41;
    a[b + 4] = this.n12;
    a[b + 5] = this.n22;
    a[b + 6] = this.n32;
    a[b + 7] = this.n42;
    a[b + 8] = this.n13;
    a[b + 9] = this.n23;
    a[b + 10] = this.n33;
    a[b + 11] = this.n43;
    a[b + 12] = this.n14;
    a[b + 13] = this.n24;
    a[b + 14] = this.n34;
    a[b + 15] = this.n44;
    return a;
  },
  setTranslation: function (a, b, c) {
    this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
    return this;
  },
  setScale: function (a, b, c) {
    this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationX: function (a) {
    var b = Math.cos(a);
    a = Math.sin(a);
    this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationY: function (a) {
    var b = Math.cos(a);
    a = Math.sin(a);
    this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationZ: function (a) {
    var b = Math.cos(a);
    a = Math.sin(a);
    this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationAxis: function (a, b) {
    var c = Math.cos(b),
      d = Math.sin(b),
      e = 1 - c,
      g = a.x,
      f = a.y,
      i = a.z,
      h = e * g,
      j = e * f;
    this.set(
      h * g + c,
      h * f - d * i,
      h * i + d * f,
      0,
      h * f + d * i,
      j * f + c,
      j * i - d * g,
      0,
      h * i - d * f,
      j * i + d * g,
      e * i * i + c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  },
  setPosition: function (a) {
    this.n14 = a.x;
    this.n24 = a.y;
    this.n34 = a.z;
    return this;
  },
  getPosition: function () {
    if (!this.position) this.position = new THREE.Vector3();
    this.position.set(this.n14, this.n24, this.n34);
    return this.position;
  },
  getColumnX: function () {
    if (!this.columnX) this.columnX = new THREE.Vector3();
    this.columnX.set(this.n11, this.n21, this.n31);
    return this.columnX;
  },
  getColumnY: function () {
    if (!this.columnY) this.columnY = new THREE.Vector3();
    this.columnY.set(this.n12, this.n22, this.n32);
    return this.columnY;
  },
  getColumnZ: function () {
    if (!this.columnZ) this.columnZ = new THREE.Vector3();
    this.columnZ.set(this.n13, this.n23, this.n33);
    return this.columnZ;
  },
  setRotationFromEuler: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z;
    a = Math.cos(b);
    b = Math.sin(b);
    var e = Math.cos(c);
    c = Math.sin(c);
    var g = Math.cos(d);
    d = Math.sin(d);
    var f = a * c,
      i = b * c;
    this.n11 = e * g;
    this.n12 = -e * d;
    this.n13 = c;
    this.n21 = i * g + a * d;
    this.n22 = -i * d + a * g;
    this.n23 = -b * e;
    this.n31 = -f * g + b * d;
    this.n32 = f * d + b * g;
    this.n33 = a * e;
    return this;
  },
  setRotationFromQuaternion: function (a) {
    var b = a.x,
      c = a.y,
      d = a.z,
      e = a.w,
      g = b + b,
      f = c + c,
      i = d + d;
    a = b * g;
    var h = b * f;
    b *= i;
    var j = c * f;
    c *= i;
    d *= i;
    g *= e;
    f *= e;
    e *= i;
    this.n11 = 1 - (j + d);
    this.n12 = h - e;
    this.n13 = b + f;
    this.n21 = h + e;
    this.n22 = 1 - (a + d);
    this.n23 = c - g;
    this.n31 = b - f;
    this.n32 = c + g;
    this.n33 = 1 - (a + j);
    return this;
  },
  scale: function (a) {
    var b = a.x,
      c = a.y;
    a = a.z;
    this.n11 *= b;
    this.n12 *= c;
    this.n13 *= a;
    this.n21 *= b;
    this.n22 *= c;
    this.n23 *= a;
    this.n31 *= b;
    this.n32 *= c;
    this.n33 *= a;
    this.n41 *= b;
    this.n42 *= c;
    this.n43 *= a;
    return this;
  },
  extractPosition: function (a) {
    this.n14 = a.n14;
    this.n24 = a.n24;
    this.n34 = a.n34;
  },
  extractRotation: function (a, b) {
    var c = 1 / b.x,
      d = 1 / b.y,
      e = 1 / b.z;
    this.n11 = a.n11 * c;
    this.n21 = a.n21 * c;
    this.n31 = a.n31 * c;
    this.n12 = a.n12 * d;
    this.n22 = a.n22 * d;
    this.n32 = a.n32 * d;
    this.n13 = a.n13 * e;
    this.n23 = a.n23 * e;
    this.n33 = a.n33 * e;
  },
};
THREE.Matrix4.makeInvert = function (a, b) {
  var c = a.n11,
    d = a.n12,
    e = a.n13,
    g = a.n14,
    f = a.n21,
    i = a.n22,
    h = a.n23,
    j = a.n24,
    p = a.n31,
    n = a.n32,
    o = a.n33,
    k = a.n34,
    t = a.n41,
    w = a.n42,
    D = a.n43,
    x = a.n44;
  b === undefined && (b = new THREE.Matrix4());
  b.n11 = h * k * w - j * o * w + j * n * D - i * k * D - h * n * x + i * o * x;
  b.n12 = g * o * w - e * k * w - g * n * D + d * k * D + e * n * x - d * o * x;
  b.n13 = e * j * w - g * h * w + g * i * D - d * j * D - e * i * x + d * h * x;
  b.n14 = g * h * n - e * j * n - g * i * o + d * j * o + e * i * k - d * h * k;
  b.n21 = j * o * t - h * k * t - j * p * D + f * k * D + h * p * x - f * o * x;
  b.n22 = e * k * t - g * o * t + g * p * D - c * k * D - e * p * x + c * o * x;
  b.n23 = g * h * t - e * j * t - g * f * D + c * j * D + e * f * x - c * h * x;
  b.n24 = e * j * p - g * h * p + g * f * o - c * j * o - e * f * k + c * h * k;
  b.n31 = i * k * t - j * n * t + j * p * w - f * k * w - i * p * x + f * n * x;
  b.n32 = g * n * t - d * k * t - g * p * w + c * k * w + d * p * x - c * n * x;
  b.n33 = e * j * t - g * i * t + g * f * w - c * j * w - d * f * x + c * i * x;
  b.n34 = g * i * p - d * j * p - g * f * n + c * j * n + d * f * k - c * i * k;
  b.n41 = h * n * t - i * o * t - h * p * w + f * o * w + i * p * D - f * n * D;
  b.n42 = d * o * t - e * n * t + e * p * w - c * o * w - d * p * D + c * n * D;
  b.n43 = e * i * t - d * h * t - e * f * w + c * h * w + d * f * D - c * i * D;
  b.n44 = d * h * p - e * i * p + e * f * n - c * h * n - d * f * o + c * i * o;
  b.multiplyScalar(1 / a.determinant());
  return b;
};
THREE.Matrix4.makeInvert3x3 = function (a) {
  var b = a.m33,
    c = b.m,
    d = a.n33 * a.n22 - a.n32 * a.n23,
    e = -a.n33 * a.n21 + a.n31 * a.n23,
    g = a.n32 * a.n21 - a.n31 * a.n22,
    f = -a.n33 * a.n12 + a.n32 * a.n13,
    i = a.n33 * a.n11 - a.n31 * a.n13,
    h = -a.n32 * a.n11 + a.n31 * a.n12,
    j = a.n23 * a.n12 - a.n22 * a.n13,
    p = -a.n23 * a.n11 + a.n21 * a.n13,
    n = a.n22 * a.n11 - a.n21 * a.n12;
  a = a.n11 * d + a.n21 * f + a.n31 * j;
  if (a == 0) throw "matrix not invertible";
  a = 1 / a;
  c[0] = a * d;
  c[1] = a * e;
  c[2] = a * g;
  c[3] = a * f;
  c[4] = a * i;
  c[5] = a * h;
  c[6] = a * j;
  c[7] = a * p;
  c[8] = a * n;
  return b;
};
THREE.Matrix4.makeFrustum = function (a, b, c, d, e, g) {
  var f;
  f = new THREE.Matrix4();
  f.n11 = (2 * e) / (b - a);
  f.n12 = 0;
  f.n13 = (b + a) / (b - a);
  f.n14 = 0;
  f.n21 = 0;
  f.n22 = (2 * e) / (d - c);
  f.n23 = (d + c) / (d - c);
  f.n24 = 0;
  f.n31 = 0;
  f.n32 = 0;
  f.n33 = -(g + e) / (g - e);
  f.n34 = (-2 * g * e) / (g - e);
  f.n41 = 0;
  f.n42 = 0;
  f.n43 = -1;
  f.n44 = 0;
  return f;
};
THREE.Matrix4.makePerspective = function (a, b, c, d) {
  var e;
  a = c * Math.tan((a * Math.PI) / 360);
  e = -a;
  return THREE.Matrix4.makeFrustum(e * b, a * b, e, a, c, d);
};
THREE.Matrix4.makeOrtho = function (a, b, c, d, e, g) {
  var f, i, h, j;
  f = new THREE.Matrix4();
  i = b - a;
  h = c - d;
  j = g - e;
  f.n11 = 2 / i;
  f.n12 = 0;
  f.n13 = 0;
  f.n14 = -((b + a) / i);
  f.n21 = 0;
  f.n22 = 2 / h;
  f.n23 = 0;
  f.n24 = -((c + d) / h);
  f.n31 = 0;
  f.n32 = 0;
  f.n33 = -2 / j;
  f.n34 = -((g + e) / j);
  f.n41 = 0;
  f.n42 = 0;
  f.n43 = 0;
  f.n44 = 1;
  return f;
};
THREE.Matrix4.__v1 = new THREE.Vector3();
THREE.Matrix4.__v2 = new THREE.Vector3();
THREE.Matrix4.__v3 = new THREE.Vector3();
THREE.Object3D = function () {
  this.parent = undefined;
  this.children = [];
  this.up = new THREE.Vector3(0, 1, 0);
  this.position = new THREE.Vector3();
  this.rotation = new THREE.Vector3();
  this.scale = new THREE.Vector3(1, 1, 1);
  this.dynamic = !1;
  this.rotationAutoUpdate = !0;
  this.matrix = new THREE.Matrix4();
  this.matrixWorld = new THREE.Matrix4();
  this.matrixRotationWorld = new THREE.Matrix4();
  this.matrixAutoUpdate = !0;
  this.matrixWorldNeedsUpdate = !0;
  this.quaternion = new THREE.Quaternion();
  this.useQuaternion = !1;
  this.boundRadius = 0;
  this.boundRadiusScale = 1;
  this.visible = !0;
  this._vector = new THREE.Vector3();
  this.name = "";
};
THREE.Object3D.prototype = {
  translate: function (a, b) {
    this.matrix.rotateAxis(b);
    this.position.addSelf(b.multiplyScalar(a));
  },
  translateX: function (a) {
    this.translate(a, this._vector.set(1, 0, 0));
  },
  translateY: function (a) {
    this.translate(a, this._vector.set(0, 1, 0));
  },
  translateZ: function (a) {
    this.translate(a, this._vector.set(0, 0, 1));
  },
  lookAt: function (a) {
    this.matrix.lookAt(a, this.position, this.up);
    this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix);
  },
  addChild: function (a) {
    if (this.children.indexOf(a) === -1) {
      a.parent !== undefined && a.parent.removeChild(a);
      a.parent = this;
      this.children.push(a);
      for (var b = this; b.parent !== undefined; ) b = b.parent;
      b !== undefined && b instanceof THREE.Scene && b.addChildRecurse(a);
    }
  },
  removeChild: function (a) {
    var b = this.children.indexOf(a);
    if (b !== -1) {
      a.parent = undefined;
      this.children.splice(b, 1);
    }
  },
  getChildByName: function (a, b) {
    var c, d, e;
    c = 0;
    for (d = this.children.length; c < d; c++) {
      e = this.children[c];
      if (e.name === a) return e;
      if (b) {
        e = e.getChildByName(a, b);
        if (e !== undefined) return e;
      }
    }
  },
  updateMatrix: function () {
    this.matrix.setPosition(this.position);
    this.useQuaternion
      ? this.matrix.setRotationFromQuaternion(this.quaternion)
      : this.matrix.setRotationFromEuler(this.rotation);
    if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) {
      this.matrix.scale(this.scale);
      this.boundRadiusScale = Math.max(
        this.scale.x,
        Math.max(this.scale.y, this.scale.z)
      );
    }
    this.matrixWorldNeedsUpdate = !0;
  },
  update: function (a, b, c) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || b) {
      a
        ? this.matrixWorld.multiply(a, this.matrix)
        : this.matrixWorld.copy(this.matrix);
      this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale);
      this.matrixWorldNeedsUpdate = !1;
      b = !0;
    }
    a = 0;
    for (var d = this.children.length; a < d; a++)
      this.children[a].update(this.matrixWorld, b, c);
  },
};
THREE.Quaternion = function (a, b, c, d) {
  this.set(a || 0, b || 0, c || 0, d !== undefined ? d : 1);
};
THREE.Quaternion.prototype = {
  set: function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = d;
    return this;
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
    return this;
  },
  setFromEuler: function (a) {
    var b = (0.5 * Math.PI) / 360,
      c = a.x * b,
      d = a.y * b,
      e = a.z * b;
    a = Math.cos(d);
    d = Math.sin(d);
    b = Math.cos(-e);
    e = Math.sin(-e);
    var g = Math.cos(c);
    c = Math.sin(c);
    var f = a * b,
      i = d * e;
    this.w = f * g - i * c;
    this.x = f * c + i * g;
    this.y = d * b * g + a * e * c;
    this.z = a * e * g - d * b * c;
    return this;
  },
  setFromAxisAngle: function (a, b) {
    var c = b / 2,
      d = Math.sin(c);
    this.x = a.x * d;
    this.y = a.y * d;
    this.z = a.z * d;
    this.w = Math.cos(c);
    return this;
  },
  calculateW: function () {
    this.w = -Math.sqrt(
      Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)
    );
    return this;
  },
  inverse: function () {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  },
  length: function () {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  normalize: function () {
    var a = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
    if (a == 0) this.w = this.z = this.y = this.x = 0;
    else {
      a = 1 / a;
      this.x *= a;
      this.y *= a;
      this.z *= a;
      this.w *= a;
    }
    return this;
  },
  multiplySelf: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      e = this.w,
      g = a.x,
      f = a.y,
      i = a.z;
    a = a.w;
    this.x = b * a + e * g + c * i - d * f;
    this.y = c * a + e * f + d * g - b * i;
    this.z = d * a + e * i + b * f - c * g;
    this.w = e * a - b * g - c * f - d * i;
    return this;
  },
  multiply: function (a, b) {
    this.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x;
    this.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y;
    this.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z;
    this.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w;
    return this;
  },
  multiplyVector3: function (a, b) {
    b || (b = a);
    var c = a.x,
      d = a.y,
      e = a.z,
      g = this.x,
      f = this.y,
      i = this.z,
      h = this.w,
      j = h * c + f * e - i * d,
      p = h * d + i * c - g * e,
      n = h * e + g * d - f * c;
    c = -g * c - f * d - i * e;
    b.x = j * h + c * -g + p * -i - n * -f;
    b.y = p * h + c * -f + n * -g - j * -i;
    b.z = n * h + c * -i + j * -f - p * -g;
    return b;
  },
};
THREE.Quaternion.slerp = function (a, b, c, d) {
  var e = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
  if (Math.abs(e) >= 1) {
    c.w = a.w;
    c.x = a.x;
    c.y = a.y;
    c.z = a.z;
    return c;
  }
  var g = Math.acos(e),
    f = Math.sqrt(1 - e * e);
  if (Math.abs(f) < 0.001) {
    c.w = 0.5 * (a.w + b.w);
    c.x = 0.5 * (a.x + b.x);
    c.y = 0.5 * (a.y + b.y);
    c.z = 0.5 * (a.z + b.z);
    return c;
  }
  e = Math.sin((1 - d) * g) / f;
  d = Math.sin(d * g) / f;
  c.w = a.w * e + b.w * d;
  c.x = a.x * e + b.x * d;
  c.y = a.y * e + b.y * d;
  c.z = a.z * e + b.z * d;
  return c;
};
THREE.Vertex = function (a) {
  this.position = a || new THREE.Vector3();
};
THREE.Face3 = function (a, b, c, d, e, g) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3();
  this.vertexNormals = d instanceof Array ? d : [];
  this.color = e instanceof THREE.Color ? e : new THREE.Color();
  this.vertexColors = e instanceof Array ? e : [];
  this.vertexTangents = [];
  this.materials = g instanceof Array ? g : [g];
  this.centroid = new THREE.Vector3();
};
THREE.Face4 = function (a, b, c, d, e, g, f) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3();
  this.vertexNormals = e instanceof Array ? e : [];
  this.color = g instanceof THREE.Color ? g : new THREE.Color();
  this.vertexColors = g instanceof Array ? g : [];
  this.vertexTangents = [];
  this.materials = f instanceof Array ? f : [f];
  this.centroid = new THREE.Vector3();
};
THREE.UV = function (a, b) {
  this.set(a || 0, b || 0);
};
THREE.UV.prototype = {
  set: function (a, b) {
    this.u = a;
    this.v = b;
    return this;
  },
  copy: function (a) {
    this.set(a.u, a.v);
    return this;
  },
};
THREE.Geometry = function () {
  this.id = "Geometry" + THREE.GeometryIdCounter++;
  this.vertices = [];
  this.colors = [];
  this.faces = [];
  this.edges = [];
  this.faceUvs = [[]];
  this.faceVertexUvs = [[]];
  this.morphTargets = [];
  this.morphColors = [];
  this.skinWeights = [];
  this.skinIndices = [];
  this.boundingSphere = this.boundingBox = null;
  this.hasTangents = !1;
};
THREE.Geometry.prototype = {
  computeCentroids: function () {
    var a, b, c;
    a = 0;
    for (b = this.faces.length; a < b; a++) {
      c = this.faces[a];
      c.centroid.set(0, 0, 0);
      if (c instanceof THREE.Face3) {
        c.centroid.addSelf(this.vertices[c.a].position);
        c.centroid.addSelf(this.vertices[c.b].position);
        c.centroid.addSelf(this.vertices[c.c].position);
        c.centroid.divideScalar(3);
      } else if (c instanceof THREE.Face4) {
        c.centroid.addSelf(this.vertices[c.a].position);
        c.centroid.addSelf(this.vertices[c.b].position);
        c.centroid.addSelf(this.vertices[c.c].position);
        c.centroid.addSelf(this.vertices[c.d].position);
        c.centroid.divideScalar(4);
      }
    }
  },
  computeFaceNormals: function (a) {
    var b,
      c,
      d,
      e,
      g,
      f,
      i = new THREE.Vector3(),
      h = new THREE.Vector3();
    d = 0;
    for (e = this.faces.length; d < e; d++) {
      g = this.faces[d];
      if (a && g.vertexNormals.length) {
        i.set(0, 0, 0);
        b = 0;
        for (c = g.vertexNormals.length; b < c; b++)
          i.addSelf(g.vertexNormals[b]);
        i.divideScalar(3);
      } else {
        b = this.vertices[g.a];
        c = this.vertices[g.b];
        f = this.vertices[g.c];
        i.sub(f.position, c.position);
        h.sub(b.position, c.position);
        i.crossSelf(h);
      }
      i.isZero() || i.normalize();
      g.normal.copy(i);
    }
  },
  computeVertexNormals: function () {
    var a, b, c, d;
    if (this.__tmpVertices == undefined) {
      d = this.__tmpVertices = Array(this.vertices.length);
      a = 0;
      for (b = this.vertices.length; a < b; a++) d[a] = new THREE.Vector3();
      a = 0;
      for (b = this.faces.length; a < b; a++) {
        c = this.faces[a];
        if (c instanceof THREE.Face3)
          c.vertexNormals = [
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
          ];
        else if (c instanceof THREE.Face4)
          c.vertexNormals = [
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
          ];
      }
    } else {
      d = this.__tmpVertices;
      a = 0;
      for (b = this.vertices.length; a < b; a++) d[a].set(0, 0, 0);
    }
    a = 0;
    for (b = this.faces.length; a < b; a++) {
      c = this.faces[a];
      if (c instanceof THREE.Face3) {
        d[c.a].addSelf(c.normal);
        d[c.b].addSelf(c.normal);
        d[c.c].addSelf(c.normal);
      } else if (c instanceof THREE.Face4) {
        d[c.a].addSelf(c.normal);
        d[c.b].addSelf(c.normal);
        d[c.c].addSelf(c.normal);
        d[c.d].addSelf(c.normal);
      }
    }
    a = 0;
    for (b = this.vertices.length; a < b; a++) d[a].normalize();
    a = 0;
    for (b = this.faces.length; a < b; a++) {
      c = this.faces[a];
      if (c instanceof THREE.Face3) {
        c.vertexNormals[0].copy(d[c.a]);
        c.vertexNormals[1].copy(d[c.b]);
        c.vertexNormals[2].copy(d[c.c]);
      } else if (c instanceof THREE.Face4) {
        c.vertexNormals[0].copy(d[c.a]);
        c.vertexNormals[1].copy(d[c.b]);
        c.vertexNormals[2].copy(d[c.c]);
        c.vertexNormals[3].copy(d[c.d]);
      }
    }
  },
  computeTangents: function () {
    function a(y, F, Q, S, G, ba, Z) {
      i = y.vertices[F].position;
      h = y.vertices[Q].position;
      j = y.vertices[S].position;
      p = f[G];
      n = f[ba];
      o = f[Z];
      k = h.x - i.x;
      t = j.x - i.x;
      w = h.y - i.y;
      D = j.y - i.y;
      x = h.z - i.z;
      W = j.z - i.z;
      X = n.u - p.u;
      aa = o.u - p.u;
      H = n.v - p.v;
      q = o.v - p.v;
      B = 1 / (X * q - aa * H);
      C.set((q * k - H * t) * B, (q * w - H * D) * B, (q * x - H * W) * B);
      A.set((X * t - aa * k) * B, (X * D - aa * w) * B, (X * W - aa * x) * B);
      L[F].addSelf(C);
      L[Q].addSelf(C);
      L[S].addSelf(C);
      Y[F].addSelf(A);
      Y[Q].addSelf(A);
      Y[S].addSelf(A);
    }
    var b,
      c,
      d,
      e,
      g,
      f,
      i,
      h,
      j,
      p,
      n,
      o,
      k,
      t,
      w,
      D,
      x,
      W,
      X,
      aa,
      H,
      q,
      B,
      z,
      L = [],
      Y = [],
      C = new THREE.Vector3(),
      A = new THREE.Vector3(),
      I = new THREE.Vector3(),
      O = new THREE.Vector3(),
      R = new THREE.Vector3();
    b = 0;
    for (c = this.vertices.length; b < c; b++) {
      L[b] = new THREE.Vector3();
      Y[b] = new THREE.Vector3();
    }
    b = 0;
    for (c = this.faces.length; b < c; b++) {
      g = this.faces[b];
      f = this.faceVertexUvs[0][b];
      if (g instanceof THREE.Face3) a(this, g.a, g.b, g.c, 0, 1, 2);
      else if (g instanceof THREE.Face4) {
        a(this, g.a, g.b, g.c, 0, 1, 2);
        a(this, g.a, g.b, g.d, 0, 1, 3);
      }
    }
    var J = ["a", "b", "c", "d"];
    b = 0;
    for (c = this.faces.length; b < c; b++) {
      g = this.faces[b];
      for (d = 0; d < g.vertexNormals.length; d++) {
        R.copy(g.vertexNormals[d]);
        e = g[J[d]];
        z = L[e];
        I.copy(z);
        I.subSelf(R.multiplyScalar(R.dot(z))).normalize();
        O.cross(g.vertexNormals[d], z);
        e = O.dot(Y[e]);
        e = e < 0 ? -1 : 1;
        g.vertexTangents[d] = new THREE.Vector4(I.x, I.y, I.z, e);
      }
    }
    this.hasTangents = !0;
  },
  computeBoundingBox: function () {
    var a;
    if (this.vertices.length > 0) {
      this.boundingBox = {
        x: [this.vertices[0].position.x, this.vertices[0].position.x],
        y: [this.vertices[0].position.y, this.vertices[0].position.y],
        z: [this.vertices[0].position.z, this.vertices[0].position.z],
      };
      for (var b = 1, c = this.vertices.length; b < c; b++) {
        a = this.vertices[b];
        if (a.position.x < this.boundingBox.x[0])
          this.boundingBox.x[0] = a.position.x;
        else if (a.position.x > this.boundingBox.x[1])
          this.boundingBox.x[1] = a.position.x;
        if (a.position.y < this.boundingBox.y[0])
          this.boundingBox.y[0] = a.position.y;
        else if (a.position.y > this.boundingBox.y[1])
          this.boundingBox.y[1] = a.position.y;
        if (a.position.z < this.boundingBox.z[0])
          this.boundingBox.z[0] = a.position.z;
        else if (a.position.z > this.boundingBox.z[1])
          this.boundingBox.z[1] = a.position.z;
      }
    }
  },
  computeBoundingSphere: function () {
    for (
      var a = this.boundingSphere === null ? 0 : this.boundingSphere.radius,
        b = 0,
        c = this.vertices.length;
      b < c;
      b++
    )
      a = Math.max(a, this.vertices[b].position.length());
    this.boundingSphere = { radius: a };
  },
  computeEdgeFaces: function () {
    function a(h, j) {
      return Math.min(h, j) + "_" + Math.max(h, j);
    }
    function b(h, j, p) {
      if (h[j] === undefined) {
        h[j] = { set: {}, array: [] };
        h[j].set[p] = 1;
        h[j].array.push(p);
      } else if (h[j].set[p] === undefined) {
        h[j].set[p] = 1;
        h[j].array.push(p);
      }
    }
    var c,
      d,
      e,
      g,
      f,
      i = {};
    c = 0;
    for (d = this.faces.length; c < d; c++) {
      f = this.faces[c];
      if (f instanceof THREE.Face3) {
        e = a(f.a, f.b);
        b(i, e, c);
        e = a(f.b, f.c);
        b(i, e, c);
        e = a(f.a, f.c);
        b(i, e, c);
      } else if (f instanceof THREE.Face4) {
        e = a(f.b, f.d);
        b(i, e, c);
        e = a(f.a, f.b);
        b(i, e, c);
        e = a(f.a, f.d);
        b(i, e, c);
        e = a(f.b, f.c);
        b(i, e, c);
        e = a(f.c, f.d);
        b(i, e, c);
      }
    }
    c = 0;
    for (d = this.edges.length; c < d; c++) {
      f = this.edges[c];
      e = f.vertexIndices[0];
      g = f.vertexIndices[1];
      f.faceIndices = i[a(e, g)].array;
      for (e = 0; e < f.faceIndices.length; e++) {
        g = f.faceIndices[e];
        f.faces.push(this.faces[g]);
      }
    }
  },
};
THREE.GeometryIdCounter = 0;
THREE.Camera = function (a, b, c, d, e) {
  THREE.Object3D.call(this);
  this.fov = a || 50;
  this.aspect = b || 1;
  this.near = c || 0.1;
  this.far = d || 2e3;
  this.target = e || new THREE.Object3D();
  this.useTarget = !0;
  this.matrixWorldInverse = new THREE.Matrix4();
  this.projectionMatrix = null;
  this.updateProjectionMatrix();
};
THREE.Camera.prototype = new THREE.Object3D();
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.supr = THREE.Object3D.prototype;
THREE.Camera.prototype.translate = function (a, b) {
  this.matrix.rotateAxis(b);
  this.position.addSelf(b.multiplyScalar(a));
  this.target.position.addSelf(b.multiplyScalar(a));
};
THREE.Camera.prototype.updateProjectionMatrix = function () {
  this.projectionMatrix = THREE.Matrix4.makePerspective(
    this.fov,
    this.aspect,
    this.near,
    this.far
  );
};
THREE.Camera.prototype.update = function (a, b, c) {
  if (this.useTarget) {
    this.matrix.lookAt(this.position, this.target.position, this.up);
    this.matrix.setPosition(this.position);
    a
      ? this.matrixWorld.multiply(a, this.matrix)
      : this.matrixWorld.copy(this.matrix);
    THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
    b = !0;
  } else {
    this.matrixAutoUpdate && this.updateMatrix();
    if (b || this.matrixWorldNeedsUpdate) {
      a
        ? this.matrixWorld.multiply(a, this.matrix)
        : this.matrixWorld.copy(this.matrix);
      this.matrixWorldNeedsUpdate = !1;
      b = !0;
      THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
    }
  }
  for (a = 0; a < this.children.length; a++)
    this.children[a].update(this.matrixWorld, b, c);
};
THREE.Light = function (a) {
  THREE.Object3D.call(this);
  this.color = new THREE.Color(a);
};
THREE.Light.prototype = new THREE.Object3D();
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.AmbientLight = function (a) {
  THREE.Light.call(this, a);
};
THREE.AmbientLight.prototype = new THREE.Light();
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function (a, b, c, d) {
  THREE.Light.call(this, a);
  this.position = new THREE.Vector3(0, 1, 0);
  this.intensity = b || 1;
  this.distance = c || 0;
  this.castShadow = d !== undefined ? d : !1;
};
THREE.DirectionalLight.prototype = new THREE.Light();
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function (a, b, c) {
  THREE.Light.call(this, a);
  this.position = new THREE.Vector3();
  this.intensity = b || 1;
  this.distance = c || 0;
};
THREE.PointLight.prototype = new THREE.Light();
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.Material = function (a) {
  this.id = THREE.MaterialCounter.value++;
  a = a || {};
  this.opacity = a.opacity !== undefined ? a.opacity : 1;
  this.transparent = a.transparent !== undefined ? a.transparent : !1;
  this.blending = a.blending !== undefined ? a.blending : THREE.NormalBlending;
  this.depthTest = a.depthTest !== undefined ? a.depthTest : !0;
};
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NormalBlending = 0;
THREE.AdditiveBlending = 1;
THREE.SubtractiveBlending = 2;
THREE.MultiplyBlending = 3;
THREE.AdditiveAlphaBlending = 4;
THREE.MaterialCounter = { value: 0 };
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.LatitudeReflectionMapping = function () {};
THREE.LatitudeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.UVMapping = function () {};
THREE.LineBasicMaterial = function (a) {
  THREE.Material.call(this, a);
  a = a || {};
  this.color =
    a.color !== undefined
      ? new THREE.Color(a.color)
      : new THREE.Color(16777215);
  this.linewidth = a.linewidth !== undefined ? a.linewidth : 1;
  this.linecap = a.linecap !== undefined ? a.linecap : "round";
  this.linejoin = a.linejoin !== undefined ? a.linejoin : "round";
  this.vertexColors = a.vertexColors ? a.vertexColors : !1;
};
THREE.LineBasicMaterial.prototype = new THREE.Material();
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.MeshBasicMaterial = function (a) {
  THREE.Material.call(this, a);
  a = a || {};
  this.color =
    a.color !== undefined
      ? new THREE.Color(a.color)
      : new THREE.Color(16777215);
  this.map = a.map !== undefined ? a.map : null;
  this.lightMap = a.lightMap !== undefined ? a.lightMap : null;
  this.envMap = a.envMap !== undefined ? a.envMap : null;
  this.combine = a.combine !== undefined ? a.combine : THREE.MultiplyOperation;
  this.reflectivity = a.reflectivity !== undefined ? a.reflectivity : 1;
  this.refractionRatio =
    a.refractionRatio !== undefined ? a.refractionRatio : 0.98;
  this.shading = a.shading !== undefined ? a.shading : THREE.SmoothShading;
  this.wireframe = a.wireframe !== undefined ? a.wireframe : !1;
  this.wireframeLinewidth =
    a.wireframeLinewidth !== undefined ? a.wireframeLinewidth : 1;
  this.wireframeLinecap =
    a.wireframeLinecap !== undefined ? a.wireframeLinecap : "round";
  this.wireframeLinejoin =
    a.wireframeLinejoin !== undefined ? a.wireframeLinejoin : "round";
  this.vertexColors = a.vertexColors !== undefined ? a.vertexColors : !1;
  this.skinning = a.skinning !== undefined ? a.skinning : !1;
  this.morphTargets = a.morphTargets !== undefined ? a.morphTargets : !1;
};
THREE.MeshBasicMaterial.prototype = new THREE.Material();
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial = function (a) {
  THREE.Material.call(this, a);
  a = a || {};
  this.color =
    a.color !== undefined
      ? new THREE.Color(a.color)
      : new THREE.Color(16777215);
  this.map = a.map !== undefined ? a.map : null;
  this.lightMap = a.lightMap !== undefined ? a.lightMap : null;
  this.envMap = a.envMap !== undefined ? a.envMap : null;
  this.combine = a.combine !== undefined ? a.combine : THREE.MultiplyOperation;
  this.reflectivity = a.reflectivity !== undefined ? a.reflectivity : 1;
  this.refractionRatio =
    a.refractionRatio !== undefined ? a.refractionRatio : 0.98;
  this.shading = a.shading !== undefined ? a.shading : THREE.SmoothShading;
  this.wireframe = a.wireframe !== undefined ? a.wireframe : !1;
  this.wireframeLinewidth =
    a.wireframeLinewidth !== undefined ? a.wireframeLinewidth : 1;
  this.wireframeLinecap =
    a.wireframeLinecap !== undefined ? a.wireframeLinecap : "round";
  this.wireframeLinejoin =
    a.wireframeLinejoin !== undefined ? a.wireframeLinejoin : "round";
  this.vertexColors = a.vertexColors !== undefined ? a.vertexColors : !1;
  this.skinning = a.skinning !== undefined ? a.skinning : !1;
  this.morphTargets = a.morphTargets !== undefined ? a.morphTargets : !1;
};
THREE.MeshLambertMaterial.prototype = new THREE.Material();
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial = function (a) {
  THREE.Material.call(this, a);
  a = a || {};
  this.color =
    a.color !== undefined
      ? new THREE.Color(a.color)
      : new THREE.Color(16777215);
  this.ambient =
    a.ambient !== undefined
      ? new THREE.Color(a.ambient)
      : new THREE.Color(328965);
  this.specular =
    a.specular !== undefined
      ? new THREE.Color(a.specular)
      : new THREE.Color(1118481);
  this.shininess = a.shininess !== undefined ? a.shininess : 30;
  this.map = a.map !== undefined ? a.map : null;
  this.lightMap = a.lightMap !== undefined ? a.lightMap : null;
  this.envMap = a.envMap !== undefined ? a.envMap : null;
  this.combine = a.combine !== undefined ? a.combine : THREE.MultiplyOperation;
  this.reflectivity = a.reflectivity !== undefined ? a.reflectivity : 1;
  this.refractionRatio =
    a.refractionRatio !== undefined ? a.refractionRatio : 0.98;
  this.shading = a.shading !== undefined ? a.shading : THREE.SmoothShading;
  this.wireframe = a.wireframe !== undefined ? a.wireframe : !1;
  this.wireframeLinewidth =
    a.wireframeLinewidth !== undefined ? a.wireframeLinewidth : 1;
  this.wireframeLinecap =
    a.wireframeLinecap !== undefined ? a.wireframeLinecap : "round";
  this.wireframeLinejoin =
    a.wireframeLinejoin !== undefined ? a.wireframeLinejoin : "round";
  this.vertexColors = a.vertexColors !== undefined ? a.vertexColors : !1;
  this.skinning = a.skinning !== undefined ? a.skinning : !1;
  this.morphTargets = a.morphTargets !== undefined ? a.morphTargets : !1;
};
THREE.MeshPhongMaterial.prototype = new THREE.Material();
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial = function (a) {
  THREE.Material.call(this, a);
  a = a || {};
  this.shading = a.shading !== undefined ? a.shading : THREE.SmoothShading;
  this.wireframe = a.wireframe !== undefined ? a.wireframe : !1;
  this.wireframeLinewidth =
    a.wireframeLinewidth !== undefined ? a.wireframeLinewidth : 1;
};
THREE.MeshDepthMaterial.prototype = new THREE.Material();
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial = function (a) {
  THREE.Material.call(this, a);
  a = a || {};
  this.shading = a.shading ? a.shading : THREE.FlatShading;
  this.wireframe = a.wireframe ? a.wireframe : !1;
  this.wireframeLinewidth = a.wireframeLinewidth ? a.wireframeLinewidth : 1;
};
THREE.MeshNormalMaterial.prototype = new THREE.Material();
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshFaceMaterial = function () {};
THREE.ParticleBasicMaterial = function (a) {
  THREE.Material.call(this, a);
  a = a || {};
  this.color =
    a.color !== undefined
      ? new THREE.Color(a.color)
      : new THREE.Color(16777215);
  this.map = a.map !== undefined ? a.map : null;
  this.size = a.size !== undefined ? a.size : 1;
  this.sizeAttenuation =
    a.sizeAttenuation !== undefined ? a.sizeAttenuation : !0;
  this.vertexColors = a.vertexColors !== undefined ? a.vertexColors : !1;
};
THREE.ParticleBasicMaterial.prototype = new THREE.Material();
THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial;
THREE.ParticleCanvasMaterial = function (a) {
  THREE.Material.call(this, a);
  a = a || {};
  this.color =
    a.color !== undefined
      ? new THREE.Color(a.color)
      : new THREE.Color(16777215);
  this.program = a.program !== undefined ? a.program : function () {};
};
THREE.ParticleCanvasMaterial.prototype = new THREE.Material();
THREE.ParticleCanvasMaterial.prototype.constructor =
  THREE.ParticleCanvasMaterial;
THREE.Texture = function (a, b, c, d, e, g) {
  this.image = a;
  this.mapping = b !== undefined ? b : new THREE.UVMapping();
  this.wrapS = c !== undefined ? c : THREE.ClampToEdgeWrapping;
  this.wrapT = d !== undefined ? d : THREE.ClampToEdgeWrapping;
  this.magFilter = e !== undefined ? e : THREE.LinearFilter;
  this.minFilter = g !== undefined ? g : THREE.LinearMipMapLinearFilter;
  this.needsUpdate = !1;
};
THREE.Texture.prototype = {
  clone: function () {
    return new THREE.Texture(
      this.image,
      this.mapping,
      this.wrapS,
      this.wrapT,
      this.magFilter,
      this.minFilter
    );
  },
};
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;
THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;
THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;
THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
THREE.Particle = function (a) {
  THREE.Object3D.call(this);
  this.materials = a instanceof Array ? a : [a];
};
THREE.Particle.prototype = new THREE.Object3D();
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.Line = function (a, b, c) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.materials = b instanceof Array ? b : [b];
  this.type = c != undefined ? c : THREE.LineStrip;
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D();
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.materials = b && b.length ? b : [b];
  this.flipSided = !1;
  this.doubleSided = !1;
  this.overdraw = !1;
  if (this.geometry) {
    this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
    this.boundRadius = a.boundingSphere.radius;
    if (this.geometry.morphTargets.length) {
      this.morphTargetBase = -1;
      this.morphTargetForcedOrder = [];
      this.morphTargetInfluences = [];
      this.morphTargetDictionary = {};
      for (var c = 0; c < this.geometry.morphTargets.length; c++) {
        this.morphTargetInfluences.push(0);
        this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c;
      }
    }
  }
};
THREE.Mesh.prototype = new THREE.Object3D();
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
  if (this.morphTargetDictionary[a] !== undefined)
    return this.morphTargetDictionary[a];
  console.log(
    "THREE.Mesh.getMorphTargetIndexByName: morph target " +
      a +
      " does not exist. Returning 0."
  );
  return 0;
};
THREE.Bone = function (a) {
  THREE.Object3D.call(this);
  this.skin = a;
  this.skinMatrix = new THREE.Matrix4();
  this.hasNoneBoneChildren = !1;
};
THREE.Bone.prototype = new THREE.Object3D();
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function (a, b, c) {
  this.matrixAutoUpdate && (b |= this.updateMatrix());
  if (b || this.matrixWorldNeedsUpdate) {
    a
      ? this.skinMatrix.multiply(a, this.matrix)
      : this.skinMatrix.copy(this.matrix);
    this.matrixWorldNeedsUpdate = !1;
    b = !0;
  }
  var d,
    e = this.children.length;
  if (this.hasNoneBoneChildren) {
    this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix);
    for (d = 0; d < e; d++) {
      a = this.children[d];
      a instanceof THREE.Bone
        ? a.update(this.skinMatrix, b, c)
        : a.update(this.matrixWorld, !0, c);
    }
  } else for (d = 0; d < e; d++) this.children[d].update(this.skinMatrix, b, c);
};
THREE.Bone.prototype.addChild = function (a) {
  if (this.children.indexOf(a) === -1) {
    a.parent !== undefined && a.parent.removeChild(a);
    a.parent = this;
    this.children.push(a);
    if (!(a instanceof THREE.Bone)) this.hasNoneBoneChildren = !0;
  }
};
THREE.Sound = function (a, b, c, d) {
  THREE.Object3D.call(this);
  this.isLoaded = !1;
  this.isAddedToDOM = !1;
  this.isPlaying = !1;
  this.duration = -1;
  this.radius = b !== undefined ? Math.abs(b) : 100;
  this.volume = Math.min(1, Math.max(0, c !== undefined ? c : 1));
  this.domElement = document.createElement("audio");
  this.domElement.volume = 0;
  this.domElement.pan = 0;
  this.domElement.loop = d !== undefined ? d : !0;
  this.sources = a instanceof Array ? a : [a];
  var e;
  c = this.sources.length;
  for (a = 0; a < c; a++) {
    b = this.sources[a];
    b.toLowerCase();
    if (b.indexOf(".mp3") !== -1) e = "audio/mpeg";
    else if (b.indexOf(".ogg") !== -1) e = "audio/ogg";
    else b.indexOf(".wav") !== -1 && (e = "audio/wav");
    if (this.domElement.canPlayType(e)) {
      e = document.createElement("source");
      e.src = this.sources[a];
      this.domElement.THREESound = this;
      this.domElement.appendChild(e);
      this.domElement.addEventListener("canplay", this.onLoad, !0);
      this.domElement.load();
      break;
    }
  }
};
THREE.Sound.prototype = new THREE.Object3D();
THREE.Sound.prototype.constructor = THREE.Sound;
THREE.Sound.prototype.supr = THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad = function () {
  var a = this.THREESound;
  if (!a.isLoaded) {
    this.removeEventListener("canplay", this.onLoad, !0);
    a.isLoaded = !0;
    a.duration = this.duration;
    a.isPlaying && a.play();
  }
};
THREE.Sound.prototype.addToDOM = function (a) {
  this.isAddedToDOM = !0;
  a.appendChild(this.domElement);
};
THREE.Sound.prototype.play = function (a) {
  this.isPlaying = !0;
  if (this.isLoaded) {
    this.domElement.play();
    if (a) this.domElement.currentTime = a % this.duration;
  }
};
THREE.Sound.prototype.pause = function () {
  this.isPlaying = !1;
  this.domElement.pause();
};
THREE.Sound.prototype.stop = function () {
  this.isPlaying = !1;
  this.domElement.pause();
  this.domElement.currentTime = 0;
};
THREE.Sound.prototype.calculateVolumeAndPan = function (a) {
  a = a.length();
  this.domElement.volume =
    a <= this.radius ? this.volume * (1 - a / this.radius) : 0;
};
THREE.Sound.prototype.update = function (a, b, c) {
  if (this.matrixAutoUpdate) {
    this.matrix.setPosition(this.position);
    b = !0;
  }
  if (b || this.matrixWorldNeedsUpdate) {
    a
      ? this.matrixWorld.multiply(a, this.matrix)
      : this.matrixWorld.copy(this.matrix);
    this.matrixWorldNeedsUpdate = !1;
    b = !0;
  }
  var d = this.children.length;
  for (a = 0; a < d; a++) this.children[a].update(this.matrixWorld, b, c);
};
THREE.Scene = function () {
  THREE.Object3D.call(this);
  this.matrixAutoUpdate = !1;
  this.collisions = this.fog = null;
  this.objects = [];
  this.lights = [];
  this.sounds = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = [];
};
THREE.Scene.prototype = new THREE.Object3D();
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.supr = THREE.Object3D.prototype;
THREE.Scene.prototype.addChild = function (a) {
  this.supr.addChild.call(this, a);
  this.addChildRecurse(a);
};
THREE.Scene.prototype.addChildRecurse = function (a) {
  if (a instanceof THREE.Light)
    this.lights.indexOf(a) === -1 && this.lights.push(a);
  else if (a instanceof THREE.Sound)
    this.sounds.indexOf(a) === -1 && this.sounds.push(a);
  else if (
    !(a instanceof THREE.Camera || a instanceof THREE.Bone) &&
    this.objects.indexOf(a) === -1
  ) {
    this.objects.push(a);
    this.__objectsAdded.push(a);
  }
  for (var b = 0; b < a.children.length; b++)
    this.addChildRecurse(a.children[b]);
};
THREE.Scene.prototype.removeChild = function (a) {
  this.supr.removeChild.call(this, a);
  this.removeChildRecurse(a);
};
THREE.Scene.prototype.removeChildRecurse = function (a) {
  if (a instanceof THREE.Light) {
    var b = this.lights.indexOf(a);
    b !== -1 && this.lights.splice(b, 1);
  } else if (a instanceof THREE.Sound) {
    b = this.sounds.indexOf(a);
    b !== -1 && this.sounds.splice(b, 1);
  } else if (!(a instanceof THREE.Camera)) {
    b = this.objects.indexOf(a);
    if (b !== -1) {
      this.objects.splice(b, 1);
      this.__objectsRemoved.push(a);
    }
  }
  for (b = 0; b < a.children.length; b++)
    this.removeChildRecurse(a.children[b]);
};
THREE.Scene.prototype.addObject = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeObject = THREE.Scene.prototype.removeChild;
THREE.Scene.prototype.addLight = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeLight = THREE.Scene.prototype.removeChild;
THREE.Projector = function () {
  function a() {
    var C = (h[i] = h[i] || new THREE.RenderableVertex());
    i++;
    return C;
  }
  function b(C, A) {
    return A.z - C.z;
  }
  function c(C, A) {
    var I = 0,
      O = 1,
      R = C.z + C.w,
      J = A.z + A.w,
      y = -C.z + C.w,
      F = -A.z + A.w;
    if (R >= 0 && J >= 0 && y >= 0 && F >= 0) return !0;
    else if ((R < 0 && J < 0) || (y < 0 && F < 0)) return !1;
    else {
      if (R < 0) I = Math.max(I, R / (R - J));
      else J < 0 && (O = Math.min(O, R / (R - J)));
      if (y < 0) I = Math.max(I, y / (y - F));
      else F < 0 && (O = Math.min(O, y / (y - F)));
      if (O < I) return !1;
      else {
        C.lerpSelf(A, I);
        A.lerpSelf(C, 1 - O);
        return !0;
      }
    }
  }
  var d,
    e,
    g = [],
    f,
    i,
    h = [],
    j,
    p,
    n = [],
    o,
    k = [],
    t,
    w,
    D = [],
    x,
    W,
    X = [],
    aa = new THREE.Vector4(),
    H = new THREE.Vector4(),
    q = new THREE.Matrix4(),
    B = new THREE.Matrix4(),
    z = [
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
    ],
    L = new THREE.Vector4(),
    Y = new THREE.Vector4();
  this.projectVector = function (C, A) {
    q.multiply(A.projectionMatrix, A.matrixWorldInverse);
    q.multiplyVector3(C);
    return C;
  };
  this.unprojectVector = function (C, A) {
    q.multiply(A.matrixWorld, THREE.Matrix4.makeInvert(A.projectionMatrix));
    q.multiplyVector3(C);
    return C;
  };
  this.projectObjects = function (C, A, I) {
    A = [];
    var O, R, J;
    e = 0;
    R = C.objects;
    C = 0;
    for (O = R.length; C < O; C++) {
      J = R[C];
      var y;
      if (!(y = !J.visible))
        if ((y = J instanceof THREE.Mesh)) {
          a: {
            y = void 0;
            for (
              var F = J.matrixWorld,
                Q =
                  -J.geometry.boundingSphere.radius *
                  Math.max(J.scale.x, Math.max(J.scale.y, J.scale.z)),
                S = 0;
              S < 6;
              S++
            ) {
              y = z[S].x * F.n14 + z[S].y * F.n24 + z[S].z * F.n34 + z[S].w;
              if (y <= Q) {
                y = !1;
                break a;
              }
            }
            y = !0;
          }
          y = !y;
        }
      if (!y) {
        y = g[e] = g[e] || new THREE.RenderableObject();
        e++;
        d = y;
        aa.copy(J.position);
        q.multiplyVector3(aa);
        d.object = J;
        d.z = aa.z;
        A.push(d);
      }
    }
    I && A.sort(b);
    return A;
  };
  this.projectScene = function (C, A, I) {
    var O = [],
      R = A.near,
      J = A.far,
      y,
      F,
      Q,
      S,
      G,
      ba,
      Z,
      da,
      M,
      E,
      T,
      $,
      ea,
      oa,
      ia,
      ka,
      fa;
    W = w = o = p = 0;
    A.matrixAutoUpdate && A.update(undefined, !0);
    C.update(undefined, !1, A);
    q.multiply(A.projectionMatrix, A.matrixWorldInverse);
    z[0].set(q.n41 - q.n11, q.n42 - q.n12, q.n43 - q.n13, q.n44 - q.n14);
    z[1].set(q.n41 + q.n11, q.n42 + q.n12, q.n43 + q.n13, q.n44 + q.n14);
    z[2].set(q.n41 + q.n21, q.n42 + q.n22, q.n43 + q.n23, q.n44 + q.n24);
    z[3].set(q.n41 - q.n21, q.n42 - q.n22, q.n43 - q.n23, q.n44 - q.n24);
    z[4].set(q.n41 - q.n31, q.n42 - q.n32, q.n43 - q.n33, q.n44 - q.n34);
    z[5].set(q.n41 + q.n31, q.n42 + q.n32, q.n43 + q.n33, q.n44 + q.n34);
    for (y = 0; y < 6; y++) {
      M = z[y];
      M.divideScalar(Math.sqrt(M.x * M.x + M.y * M.y + M.z * M.z));
    }
    M = this.projectObjects(C, A, !0);
    C = 0;
    for (y = M.length; C < y; C++) {
      E = M[C].object;
      if (E.visible) {
        T = E.matrixWorld;
        $ = E.matrixRotationWorld;
        ea = E.materials;
        oa = E.overdraw;
        i = 0;
        if (E instanceof THREE.Mesh) {
          ia = E.geometry;
          S = ia.vertices;
          ka = ia.faces;
          ia = ia.faceVertexUvs;
          F = 0;
          for (Q = S.length; F < Q; F++) {
            f = a();
            f.positionWorld.copy(S[F].position);
            T.multiplyVector3(f.positionWorld);
            f.positionScreen.copy(f.positionWorld);
            q.multiplyVector4(f.positionScreen);
            f.positionScreen.x /= f.positionScreen.w;
            f.positionScreen.y /= f.positionScreen.w;
            f.visible = f.positionScreen.z > R && f.positionScreen.z < J;
          }
          S = 0;
          for (F = ka.length; S < F; S++) {
            Q = ka[S];
            if (Q instanceof THREE.Face3) {
              G = h[Q.a];
              ba = h[Q.b];
              Z = h[Q.c];
              if (
                G.visible &&
                ba.visible &&
                Z.visible &&
                (E.doubleSided ||
                  E.flipSided !=
                    (Z.positionScreen.x - G.positionScreen.x) *
                      (ba.positionScreen.y - G.positionScreen.y) -
                      (Z.positionScreen.y - G.positionScreen.y) *
                        (ba.positionScreen.x - G.positionScreen.x) <
                      0)
              ) {
                da = n[p] = n[p] || new THREE.RenderableFace3();
                p++;
                j = da;
                j.v1.copy(G);
                j.v2.copy(ba);
                j.v3.copy(Z);
              } else continue;
            } else if (Q instanceof THREE.Face4) {
              G = h[Q.a];
              ba = h[Q.b];
              Z = h[Q.c];
              da = h[Q.d];
              if (
                G.visible &&
                ba.visible &&
                Z.visible &&
                da.visible &&
                (E.doubleSided ||
                  E.flipSided !=
                    ((da.positionScreen.x - G.positionScreen.x) *
                      (ba.positionScreen.y - G.positionScreen.y) -
                      (da.positionScreen.y - G.positionScreen.y) *
                        (ba.positionScreen.x - G.positionScreen.x) <
                      0 ||
                      (ba.positionScreen.x - Z.positionScreen.x) *
                        (da.positionScreen.y - Z.positionScreen.y) -
                        (ba.positionScreen.y - Z.positionScreen.y) *
                          (da.positionScreen.x - Z.positionScreen.x) <
                        0))
              ) {
                fa = k[o] = k[o] || new THREE.RenderableFace4();
                o++;
                j = fa;
                j.v1.copy(G);
                j.v2.copy(ba);
                j.v3.copy(Z);
                j.v4.copy(da);
              } else continue;
            }
            j.normalWorld.copy(Q.normal);
            $.multiplyVector3(j.normalWorld);
            j.centroidWorld.copy(Q.centroid);
            T.multiplyVector3(j.centroidWorld);
            j.centroidScreen.copy(j.centroidWorld);
            q.multiplyVector3(j.centroidScreen);
            Z = Q.vertexNormals;
            G = 0;
            for (ba = Z.length; G < ba; G++) {
              da = j.vertexNormalsWorld[G];
              da.copy(Z[G]);
              $.multiplyVector3(da);
            }
            G = 0;
            for (ba = ia.length; G < ba; G++)
              if ((fa = ia[G][S])) {
                Z = 0;
                for (da = fa.length; Z < da; Z++) j.uvs[G][Z] = fa[Z];
              }
            j.meshMaterials = ea;
            j.faceMaterials = Q.materials;
            j.overdraw = oa;
            j.z = j.centroidScreen.z;
            O.push(j);
          }
        } else if (E instanceof THREE.Line) {
          B.multiply(q, T);
          S = E.geometry.vertices;
          G = a();
          G.positionScreen.copy(S[0].position);
          B.multiplyVector4(G.positionScreen);
          F = 1;
          for (Q = S.length; F < Q; F++) {
            G = a();
            G.positionScreen.copy(S[F].position);
            B.multiplyVector4(G.positionScreen);
            ba = h[i - 2];
            L.copy(G.positionScreen);
            Y.copy(ba.positionScreen);
            if (c(L, Y)) {
              L.multiplyScalar(1 / L.w);
              Y.multiplyScalar(1 / Y.w);
              T = D[w] = D[w] || new THREE.RenderableLine();
              w++;
              t = T;
              t.v1.positionScreen.copy(L);
              t.v2.positionScreen.copy(Y);
              t.z = Math.max(L.z, Y.z);
              t.materials = E.materials;
              O.push(t);
            }
          }
        } else if (E instanceof THREE.Particle) {
          H.set(E.matrixWorld.n14, E.matrixWorld.n24, E.matrixWorld.n34, 1);
          q.multiplyVector4(H);
          H.z /= H.w;
          if (H.z > 0 && H.z < 1) {
            T = X[W] = X[W] || new THREE.RenderableParticle();
            W++;
            x = T;
            x.x = H.x / H.w;
            x.y = H.y / H.w;
            x.z = H.z;
            x.rotation = E.rotation.z;
            x.scale.x =
              E.scale.x *
              Math.abs(
                x.x -
                  (H.x + A.projectionMatrix.n11) /
                    (H.w + A.projectionMatrix.n14)
              );
            x.scale.y =
              E.scale.y *
              Math.abs(
                x.y -
                  (H.y + A.projectionMatrix.n22) /
                    (H.w + A.projectionMatrix.n24)
              );
            x.materials = E.materials;
            O.push(x);
          }
        }
      }
    }
    I && O.sort(b);
    return O;
  };
};
THREE.CanvasRenderer = function () {
  function a(U) {
    if (D != U) k.globalAlpha = D = U;
  }
  function b(U) {
    if (x != U) {
      switch (U) {
        case THREE.NormalBlending:
          k.globalCompositeOperation = "source-over";
          break;
        case THREE.AdditiveBlending:
          k.globalCompositeOperation = "lighter";
          break;
        case THREE.SubtractiveBlending:
          k.globalCompositeOperation = "darker";
      }
      x = U;
    }
  }
  function c(U) {
    if (W != U.hex) {
      W = U.hex;
      k.strokeStyle = "#" + e(W.toString(16));
    }
  }
  function d(U) {
    if (X != U.hex) {
      X = U.hex;
      k.fillStyle = "#" + e(X.toString(16));
    }
  }
  function e(U) {
    for (; U.length < 6; ) U = "0" + U;
    return U;
  }
  var g = this,
    f = null,
    i = new THREE.Projector(),
    h = document.createElement("canvas"),
    j,
    p,
    n,
    o,
    k = h.getContext("2d"),
    t = new THREE.Color(0),
    w = 0,
    D = 1,
    x = 0,
    W = null,
    X = null,
    aa = null,
    H = null,
    q = null,
    B,
    z,
    L,
    Y,
    C = new THREE.RenderableVertex(),
    A = new THREE.RenderableVertex(),
    I,
    O,
    R,
    J,
    y,
    F,
    Q,
    S,
    G,
    ba,
    Z,
    da,
    M = new THREE.Color(0),
    E = new THREE.Color(0),
    T = new THREE.Color(0),
    $ = new THREE.Color(0),
    ea = new THREE.Color(0),
    oa,
    ia,
    ka,
    fa,
    Wa,
    Xa,
    Ya,
    Za,
    $a,
    ab,
    Ca = new THREE.Rectangle(),
    ma = new THREE.Rectangle(),
    ha = new THREE.Rectangle(),
    Ua = !1,
    la = new THREE.Color(),
    ja = new THREE.Color(),
    Ma = new THREE.Color(),
    Na = new THREE.Color(),
    ca = new THREE.Vector3(),
    Ha,
    Ia,
    Va,
    na,
    Ja,
    Oa,
    Ea = 16;
  Ha = document.createElement("canvas");
  Ha.width = Ha.height = 2;
  Ia = Ha.getContext("2d");
  Ia.fillStyle = "rgba(0,0,0,1)";
  Ia.fillRect(0, 0, 2, 2);
  Va = Ia.getImageData(0, 0, 2, 2);
  na = Va.data;
  Ja = document.createElement("canvas");
  Ja.width = Ja.height = Ea;
  Oa = Ja.getContext("2d");
  Oa.translate(-Ea / 2, -Ea / 2);
  Oa.scale(Ea, Ea);
  Ea--;
  this.domElement = h;
  this.autoClear = !0;
  this.sortObjects = !0;
  this.sortElements = !0;
  this.data = { vertices: 0, faces: 0 };
  this.setSize = function (U, pa) {
    j = U;
    p = pa;
    n = j / 2;
    o = p / 2;
    h.width = j;
    h.height = p;
    Ca.set(-n, -o, n, o);
    D = 1;
    x = 0;
    q = H = aa = X = W = null;
  };
  this.setClearColor = function (U, pa) {
    t = U;
    w = pa;
  };
  this.setClearColorHex = function (U, pa) {
    t.setHex(U);
    w = pa;
  };
  this.clear = function () {
    k.setTransform(1, 0, 0, -1, n, o);
    if (!ma.isEmpty()) {
      ma.inflate(1);
      ma.minSelf(Ca);
      if (t.hex == 0 && w == 0)
        k.clearRect(ma.getX(), ma.getY(), ma.getWidth(), ma.getHeight());
      else {
        b(THREE.NormalBlending);
        a(1);
        k.fillStyle =
          "rgba(" +
          Math.floor(t.r * 255) +
          "," +
          Math.floor(t.g * 255) +
          "," +
          Math.floor(t.b * 255) +
          "," +
          w +
          ")";
        k.fillRect(ma.getX(), ma.getY(), ma.getWidth(), ma.getHeight());
      }
      ma.empty();
    }
  };
  this.render = function (U, pa) {
    function db(m) {
      var v,
        s,
        r,
        K = m.lights;
      ja.setRGB(0, 0, 0);
      Ma.setRGB(0, 0, 0);
      Na.setRGB(0, 0, 0);
      m = 0;
      for (v = K.length; m < v; m++) {
        s = K[m];
        r = s.color;
        if (s instanceof THREE.AmbientLight) {
          ja.r += r.r;
          ja.g += r.g;
          ja.b += r.b;
        } else if (s instanceof THREE.DirectionalLight) {
          Ma.r += r.r;
          Ma.g += r.g;
          Ma.b += r.b;
        } else if (s instanceof THREE.PointLight) {
          Na.r += r.r;
          Na.g += r.g;
          Na.b += r.b;
        }
      }
    }
    function ta(m, v, s, r) {
      var K,
        N,
        u,
        l,
        V = m.lights;
      m = 0;
      for (K = V.length; m < K; m++) {
        N = V[m];
        u = N.color;
        if (N instanceof THREE.DirectionalLight) {
          l = s.dot(N.position);
          if (!(l <= 0)) {
            l *= N.intensity;
            r.r += u.r * l;
            r.g += u.g * l;
            r.b += u.b * l;
          }
        } else if (N instanceof THREE.PointLight) {
          l = s.dot(ca.sub(N.position, v).normalize());
          if (!(l <= 0)) {
            l *=
              N.distance == 0
                ? 1
                : 1 - Math.min(v.distanceTo(N.position) / N.distance, 1);
            if (l != 0) {
              l *= N.intensity;
              r.r += u.r * l;
              r.g += u.g * l;
              r.b += u.b * l;
            }
          }
        }
      }
    }
    function eb(m, v, s) {
      a(s.opacity);
      b(s.blending);
      var r, K, N, u, l, V;
      if (s instanceof THREE.ParticleBasicMaterial) {
        if (s.map) {
          u = s.map.image;
          l = u.width >> 1;
          V = u.height >> 1;
          s = v.scale.x * n;
          N = v.scale.y * o;
          r = s * l;
          K = N * V;
          ha.set(m.x - r, m.y - K, m.x + r, m.y + K);
          if (Ca.instersects(ha)) {
            k.save();
            k.translate(m.x, m.y);
            k.rotate(-v.rotation);
            k.scale(s, -N);
            k.translate(-l, -V);
            k.drawImage(u, 0, 0);
            k.restore();
          }
        }
      } else if (s instanceof THREE.ParticleCanvasMaterial) {
        r = v.scale.x * n;
        K = v.scale.y * o;
        ha.set(m.x - r, m.y - K, m.x + r, m.y + K);
        if (Ca.instersects(ha)) {
          c(s.color);
          d(s.color);
          k.save();
          k.translate(m.x, m.y);
          k.rotate(-v.rotation);
          k.scale(r, K);
          s.program(k);
          k.restore();
        }
      }
    }
    function fb(m, v, s, r) {
      a(r.opacity);
      b(r.blending);
      k.beginPath();
      k.moveTo(m.positionScreen.x, m.positionScreen.y);
      k.lineTo(v.positionScreen.x, v.positionScreen.y);
      k.closePath();
      if (r instanceof THREE.LineBasicMaterial) {
        m = r.linewidth;
        if (aa != m) k.lineWidth = aa = m;
        m = r.linecap;
        if (H != m) k.lineCap = H = m;
        m = r.linejoin;
        if (q != m) k.lineJoin = q = m;
        c(r.color);
        k.stroke();
        ha.inflate(r.linewidth * 2);
      }
    }
    function Pa(m, v, s, r, K, N, u, l, V) {
      g.data.vertices += 3;
      g.data.faces++;
      a(l.opacity);
      b(l.blending);
      I = m.positionScreen.x;
      O = m.positionScreen.y;
      R = v.positionScreen.x;
      J = v.positionScreen.y;
      y = s.positionScreen.x;
      F = s.positionScreen.y;
      Ka(I, O, R, J, y, F);
      if (l instanceof THREE.MeshBasicMaterial)
        if (l.map) {
          if (l.map.mapping instanceof THREE.UVMapping) {
            fa = u.uvs[0];
            ua(
              I,
              O,
              R,
              J,
              y,
              F,
              l.map.image,
              fa[r].u,
              fa[r].v,
              fa[K].u,
              fa[K].v,
              fa[N].u,
              fa[N].v
            );
          }
        } else if (l.envMap) {
          if (l.envMap.mapping instanceof THREE.SphericalReflectionMapping) {
            m = pa.matrixWorldInverse;
            ca.copy(u.vertexNormalsWorld[0]);
            Wa = (ca.x * m.n11 + ca.y * m.n12 + ca.z * m.n13) * 0.5 + 0.5;
            Xa = -(ca.x * m.n21 + ca.y * m.n22 + ca.z * m.n23) * 0.5 + 0.5;
            ca.copy(u.vertexNormalsWorld[1]);
            Ya = (ca.x * m.n11 + ca.y * m.n12 + ca.z * m.n13) * 0.5 + 0.5;
            Za = -(ca.x * m.n21 + ca.y * m.n22 + ca.z * m.n23) * 0.5 + 0.5;
            ca.copy(u.vertexNormalsWorld[2]);
            $a = (ca.x * m.n11 + ca.y * m.n12 + ca.z * m.n13) * 0.5 + 0.5;
            ab = -(ca.x * m.n21 + ca.y * m.n22 + ca.z * m.n23) * 0.5 + 0.5;
            ua(I, O, R, J, y, F, l.envMap.image, Wa, Xa, Ya, Za, $a, ab);
          }
        } else
          l.wireframe
            ? ya(
                l.color,
                l.wireframeLinewidth,
                l.wireframeLinecap,
                l.wireframeLinejoin
              )
            : za(l.color);
      else if (l instanceof THREE.MeshLambertMaterial) {
        if (l.map && !l.wireframe) {
          if (l.map.mapping instanceof THREE.UVMapping) {
            fa = u.uvs[0];
            ua(
              I,
              O,
              R,
              J,
              y,
              F,
              l.map.image,
              fa[r].u,
              fa[r].v,
              fa[K].u,
              fa[K].v,
              fa[N].u,
              fa[N].v
            );
          }
          b(THREE.SubtractiveBlending);
        }
        if (Ua)
          if (
            !l.wireframe &&
            l.shading == THREE.SmoothShading &&
            u.vertexNormalsWorld.length == 3
          ) {
            E.r = T.r = $.r = ja.r;
            E.g = T.g = $.g = ja.g;
            E.b = T.b = $.b = ja.b;
            ta(V, u.v1.positionWorld, u.vertexNormalsWorld[0], E);
            ta(V, u.v2.positionWorld, u.vertexNormalsWorld[1], T);
            ta(V, u.v3.positionWorld, u.vertexNormalsWorld[2], $);
            ea.r = (T.r + $.r) * 0.5;
            ea.g = (T.g + $.g) * 0.5;
            ea.b = (T.b + $.b) * 0.5;
            ka = Qa(E, T, $, ea);
            ua(I, O, R, J, y, F, ka, 0, 0, 1, 0, 0, 1);
          } else {
            la.r = ja.r;
            la.g = ja.g;
            la.b = ja.b;
            ta(V, u.centroidWorld, u.normalWorld, la);
            M.r = Math.max(0, Math.min(l.color.r * la.r, 1));
            M.g = Math.max(0, Math.min(l.color.g * la.g, 1));
            M.b = Math.max(0, Math.min(l.color.b * la.b, 1));
            M.updateHex();
            l.wireframe
              ? ya(
                  M,
                  l.wireframeLinewidth,
                  l.wireframeLinecap,
                  l.wireframeLinejoin
                )
              : za(M);
          }
        else
          l.wireframe
            ? ya(
                l.color,
                l.wireframeLinewidth,
                l.wireframeLinecap,
                l.wireframeLinejoin
              )
            : za(l.color);
      } else if (l instanceof THREE.MeshDepthMaterial) {
        oa = pa.near;
        ia = pa.far;
        E.r = E.g = E.b = 1 - Da(m.positionScreen.z, oa, ia);
        T.r = T.g = T.b = 1 - Da(v.positionScreen.z, oa, ia);
        $.r = $.g = $.b = 1 - Da(s.positionScreen.z, oa, ia);
        ea.r = (T.r + $.r) * 0.5;
        ea.g = (T.g + $.g) * 0.5;
        ea.b = (T.b + $.b) * 0.5;
        ka = Qa(E, T, $, ea);
        ua(I, O, R, J, y, F, ka, 0, 0, 1, 0, 0, 1);
      } else if (l instanceof THREE.MeshNormalMaterial) {
        M.r = Fa(u.normalWorld.x);
        M.g = Fa(u.normalWorld.y);
        M.b = Fa(u.normalWorld.z);
        M.updateHex();
        l.wireframe
          ? ya(M, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin)
          : za(M);
      }
    }
    function bb(m, v, s, r, K, N, u, l, V) {
      g.data.vertices += 4;
      g.data.faces++;
      a(l.opacity);
      b(l.blending);
      if (l.map || l.envMap) {
        Pa(m, v, r, 0, 1, 3, u, l, V);
        Pa(K, s, N, 1, 2, 3, u, l, V);
      } else {
        I = m.positionScreen.x;
        O = m.positionScreen.y;
        R = v.positionScreen.x;
        J = v.positionScreen.y;
        y = s.positionScreen.x;
        F = s.positionScreen.y;
        Q = r.positionScreen.x;
        S = r.positionScreen.y;
        G = K.positionScreen.x;
        ba = K.positionScreen.y;
        Z = N.positionScreen.x;
        da = N.positionScreen.y;
        if (l instanceof THREE.MeshBasicMaterial) {
          Ra(I, O, R, J, y, F, Q, S);
          l.wireframe
            ? ya(
                l.color,
                l.wireframeLinewidth,
                l.wireframeLinecap,
                l.wireframeLinejoin
              )
            : za(l.color);
        } else if (l instanceof THREE.MeshLambertMaterial)
          if (Ua)
            if (
              !l.wireframe &&
              l.shading == THREE.SmoothShading &&
              u.vertexNormalsWorld.length == 4
            ) {
              E.r = T.r = $.r = ea.r = ja.r;
              E.g = T.g = $.g = ea.g = ja.g;
              E.b = T.b = $.b = ea.b = ja.b;
              ta(V, u.v1.positionWorld, u.vertexNormalsWorld[0], E);
              ta(V, u.v2.positionWorld, u.vertexNormalsWorld[1], T);
              ta(V, u.v4.positionWorld, u.vertexNormalsWorld[3], $);
              ta(V, u.v3.positionWorld, u.vertexNormalsWorld[2], ea);
              ka = Qa(E, T, $, ea);
              Ka(I, O, R, J, Q, S);
              ua(I, O, R, J, Q, S, ka, 0, 0, 1, 0, 0, 1);
              Ka(G, ba, y, F, Z, da);
              ua(G, ba, y, F, Z, da, ka, 1, 0, 1, 1, 0, 1);
            } else {
              la.r = ja.r;
              la.g = ja.g;
              la.b = ja.b;
              ta(V, u.centroidWorld, u.normalWorld, la);
              M.r = Math.max(0, Math.min(l.color.r * la.r, 1));
              M.g = Math.max(0, Math.min(l.color.g * la.g, 1));
              M.b = Math.max(0, Math.min(l.color.b * la.b, 1));
              M.updateHex();
              Ra(I, O, R, J, y, F, Q, S);
              l.wireframe
                ? ya(
                    M,
                    l.wireframeLinewidth,
                    l.wireframeLinecap,
                    l.wireframeLinejoin
                  )
                : za(M);
            }
          else {
            Ra(I, O, R, J, y, F, Q, S);
            l.wireframe
              ? ya(
                  l.color,
                  l.wireframeLinewidth,
                  l.wireframeLinecap,
                  l.wireframeLinejoin
                )
              : za(l.color);
          }
        else if (l instanceof THREE.MeshNormalMaterial) {
          M.r = Fa(u.normalWorld.x);
          M.g = Fa(u.normalWorld.y);
          M.b = Fa(u.normalWorld.z);
          M.updateHex();
          Ra(I, O, R, J, y, F, Q, S);
          l.wireframe
            ? ya(
                M,
                l.wireframeLinewidth,
                l.wireframeLinecap,
                l.wireframeLinejoin
              )
            : za(M);
        } else if (l instanceof THREE.MeshDepthMaterial) {
          oa = pa.near;
          ia = pa.far;
          E.r = E.g = E.b = 1 - Da(m.positionScreen.z, oa, ia);
          T.r = T.g = T.b = 1 - Da(v.positionScreen.z, oa, ia);
          $.r = $.g = $.b = 1 - Da(r.positionScreen.z, oa, ia);
          ea.r = ea.g = ea.b = 1 - Da(s.positionScreen.z, oa, ia);
          ka = Qa(E, T, $, ea);
          Ka(I, O, R, J, Q, S);
          ua(I, O, R, J, Q, S, ka, 0, 0, 1, 0, 0, 1);
          Ka(G, ba, y, F, Z, da);
          ua(G, ba, y, F, Z, da, ka, 1, 0, 1, 1, 0, 1);
        }
      }
    }
    function Ka(m, v, s, r, K, N) {
      k.beginPath();
      k.moveTo(m, v);
      k.lineTo(s, r);
      k.lineTo(K, N);
      k.lineTo(m, v);
      k.closePath();
    }
    function Ra(m, v, s, r, K, N, u, l) {
      k.beginPath();
      k.moveTo(m, v);
      k.lineTo(s, r);
      k.lineTo(K, N);
      k.lineTo(u, l);
      k.lineTo(m, v);
      k.closePath();
    }
    function ya(m, v, s, r) {
      if (aa != v) k.lineWidth = aa = v;
      if (H != s) k.lineCap = H = s;
      if (q != r) k.lineJoin = q = r;
      c(m);
      k.stroke();
      ha.inflate(v * 2);
    }
    function za(m) {
      d(m);
      k.fill();
    }
    function ua(m, v, s, r, K, N, u, l, V, va, qa, wa, La) {
      var sa, xa;
      sa = u.width - 1;
      xa = u.height - 1;
      l *= sa;
      V *= xa;
      va *= sa;
      qa *= xa;
      wa *= sa;
      La *= xa;
      s -= m;
      r -= v;
      K -= m;
      N -= v;
      va -= l;
      qa -= V;
      wa -= l;
      La -= V;
      sa = va * La - wa * qa;
      if (sa != 0) {
        xa = 1 / sa;
        sa = (La * s - qa * K) * xa;
        qa = (La * r - qa * N) * xa;
        s = (va * K - wa * s) * xa;
        r = (va * N - wa * r) * xa;
        m = m - sa * l - s * V;
        v = v - qa * l - r * V;
        k.save();
        k.transform(sa, qa, s, r, m, v);
        k.clip();
        k.drawImage(u, 0, 0);
        k.restore();
      }
    }
    function Qa(m, v, s, r) {
      var K = ~~(m.r * 255),
        N = ~~(m.g * 255);
      m = ~~(m.b * 255);
      var u = ~~(v.r * 255),
        l = ~~(v.g * 255);
      v = ~~(v.b * 255);
      var V = ~~(s.r * 255),
        va = ~~(s.g * 255);
      s = ~~(s.b * 255);
      var qa = ~~(r.r * 255),
        wa = ~~(r.g * 255);
      r = ~~(r.b * 255);
      na[0] = K < 0 ? 0 : K > 255 ? 255 : K;
      na[1] = N < 0 ? 0 : N > 255 ? 255 : N;
      na[2] = m < 0 ? 0 : m > 255 ? 255 : m;
      na[4] = u < 0 ? 0 : u > 255 ? 255 : u;
      na[5] = l < 0 ? 0 : l > 255 ? 255 : l;
      na[6] = v < 0 ? 0 : v > 255 ? 255 : v;
      na[8] = V < 0 ? 0 : V > 255 ? 255 : V;
      na[9] = va < 0 ? 0 : va > 255 ? 255 : va;
      na[10] = s < 0 ? 0 : s > 255 ? 255 : s;
      na[12] = qa < 0 ? 0 : qa > 255 ? 255 : qa;
      na[13] = wa < 0 ? 0 : wa > 255 ? 255 : wa;
      na[14] = r < 0 ? 0 : r > 255 ? 255 : r;
      Ia.putImageData(Va, 0, 0);
      Oa.drawImage(Ha, 0, 0);
      return Ja;
    }
    function Da(m, v, s) {
      m = (m - v) / (s - v);
      return m * m * (3 - 2 * m);
    }
    function Fa(m) {
      m = (m + 1) * 0.5;
      return m < 0 ? 0 : m > 1 ? 1 : m;
    }
    function Aa(m, v) {
      var s = v.x - m.x,
        r = v.y - m.y,
        K = 1 / Math.sqrt(s * s + r * r);
      s *= K;
      r *= K;
      v.x += s;
      v.y += r;
      m.x -= s;
      m.y -= r;
    }
    var Sa, cb, P, ra, Ba, Ga, Ta, ga;
    this.autoClear ? this.clear() : k.setTransform(1, 0, 0, -1, n, o);
    g.data.vertices = 0;
    g.data.faces = 0;
    f = i.projectScene(U, pa, this.sortElements);
    (Ua = U.lights.length > 0) && db(U);
    Sa = 0;
    for (cb = f.length; Sa < cb; Sa++) {
      P = f[Sa];
      ha.empty();
      if (P instanceof THREE.RenderableParticle) {
        B = P;
        B.x *= n;
        B.y *= o;
        ra = 0;
        for (Ba = P.materials.length; ra < Ba; ) {
          ga = P.materials[ra++];
          ga.opacity != 0 && eb(B, P, ga, U);
        }
      } else if (P instanceof THREE.RenderableLine) {
        B = P.v1;
        z = P.v2;
        B.positionScreen.x *= n;
        B.positionScreen.y *= o;
        z.positionScreen.x *= n;
        z.positionScreen.y *= o;
        ha.addPoint(B.positionScreen.x, B.positionScreen.y);
        ha.addPoint(z.positionScreen.x, z.positionScreen.y);
        if (Ca.instersects(ha)) {
          ra = 0;
          for (Ba = P.materials.length; ra < Ba; ) {
            ga = P.materials[ra++];
            ga.opacity != 0 && fb(B, z, P, ga, U);
          }
        }
      } else if (P instanceof THREE.RenderableFace3) {
        B = P.v1;
        z = P.v2;
        L = P.v3;
        B.positionScreen.x *= n;
        B.positionScreen.y *= o;
        z.positionScreen.x *= n;
        z.positionScreen.y *= o;
        L.positionScreen.x *= n;
        L.positionScreen.y *= o;
        if (P.overdraw) {
          Aa(B.positionScreen, z.positionScreen);
          Aa(z.positionScreen, L.positionScreen);
          Aa(L.positionScreen, B.positionScreen);
        }
        ha.add3Points(
          B.positionScreen.x,
          B.positionScreen.y,
          z.positionScreen.x,
          z.positionScreen.y,
          L.positionScreen.x,
          L.positionScreen.y
        );
        if (Ca.instersects(ha)) {
          ra = 0;
          for (Ba = P.meshMaterials.length; ra < Ba; ) {
            ga = P.meshMaterials[ra++];
            if (ga instanceof THREE.MeshFaceMaterial) {
              Ga = 0;
              for (Ta = P.faceMaterials.length; Ga < Ta; )
                (ga = P.faceMaterials[Ga++]) &&
                  ga.opacity != 0 &&
                  Pa(B, z, L, 0, 1, 2, P, ga, U);
            } else ga.opacity != 0 && Pa(B, z, L, 0, 1, 2, P, ga, U);
          }
        }
      } else if (P instanceof THREE.RenderableFace4) {
        B = P.v1;
        z = P.v2;
        L = P.v3;
        Y = P.v4;
        B.positionScreen.x *= n;
        B.positionScreen.y *= o;
        z.positionScreen.x *= n;
        z.positionScreen.y *= o;
        L.positionScreen.x *= n;
        L.positionScreen.y *= o;
        Y.positionScreen.x *= n;
        Y.positionScreen.y *= o;
        C.positionScreen.copy(z.positionScreen);
        A.positionScreen.copy(Y.positionScreen);
        if (P.overdraw) {
          Aa(B.positionScreen, z.positionScreen);
          Aa(z.positionScreen, Y.positionScreen);
          Aa(Y.positionScreen, B.positionScreen);
          Aa(L.positionScreen, C.positionScreen);
          Aa(L.positionScreen, A.positionScreen);
        }
        ha.addPoint(B.positionScreen.x, B.positionScreen.y);
        ha.addPoint(z.positionScreen.x, z.positionScreen.y);
        ha.addPoint(L.positionScreen.x, L.positionScreen.y);
        ha.addPoint(Y.positionScreen.x, Y.positionScreen.y);
        if (Ca.instersects(ha)) {
          ra = 0;
          for (Ba = P.meshMaterials.length; ra < Ba; ) {
            ga = P.meshMaterials[ra++];
            if (ga instanceof THREE.MeshFaceMaterial) {
              Ga = 0;
              for (Ta = P.faceMaterials.length; Ga < Ta; )
                (ga = P.faceMaterials[Ga++]) &&
                  ga.opacity != 0 &&
                  bb(B, z, L, Y, C, A, P, ga, U);
            } else ga.opacity != 0 && bb(B, z, L, Y, C, A, P, ga, U);
          }
        }
      }
      ma.addRectangle(ha);
    }
    k.setTransform(1, 0, 0, 1, 0, 0);
  };
};
THREE.SoundRenderer = function () {
  this.volume = 1;
  this.domElement = document.createElement("div");
  this.domElement.id = "THREESound";
  this.cameraPosition = new THREE.Vector3();
  this.soundPosition = new THREE.Vector3();
  this.render = function (a, b, c) {
    c && a.update(undefined, !1, b);
    c = a.sounds;
    var d,
      e = c.length;
    for (d = 0; d < e; d++) {
      a = c[d];
      this.soundPosition.set(
        a.matrixWorld.n14,
        a.matrixWorld.n24,
        a.matrixWorld.n34
      );
      this.soundPosition.subSelf(b.position);
      if (a.isPlaying && a.isLoaded) {
        a.isAddedToDOM || a.addToDOM(this.domElement);
        a.calculateVolumeAndPan(this.soundPosition);
      }
    }
  };
};
THREE.RenderableVertex = function () {
  this.positionWorld = new THREE.Vector3();
  this.positionScreen = new THREE.Vector4();
  this.visible = !0;
};
THREE.RenderableVertex.prototype.copy = function (a) {
  this.positionWorld.copy(a.positionWorld);
  this.positionScreen.copy(a.positionScreen);
};
THREE.RenderableFace3 = function () {
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.v3 = new THREE.RenderableVertex();
  this.centroidWorld = new THREE.Vector3();
  this.centroidScreen = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ];
  this.faceMaterials = this.meshMaterials = null;
  this.overdraw = !1;
  this.uvs = [[]];
  this.z = null;
};
THREE.RenderableFace4 = function () {
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.v3 = new THREE.RenderableVertex();
  this.v4 = new THREE.RenderableVertex();
  this.centroidWorld = new THREE.Vector3();
  this.centroidScreen = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ];
  this.faceMaterials = this.meshMaterials = null;
  this.overdraw = !1;
  this.uvs = [[]];
  this.z = null;
};
THREE.RenderableObject = function () {
  this.z = this.object = null;
};
THREE.RenderableParticle = function () {
  this.rotation = this.z = this.y = this.x = null;
  this.scale = new THREE.Vector2();
  this.materials = null;
};
THREE.RenderableLine = function () {
  this.z = null;
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.materials = null;
};
