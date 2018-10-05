/**
 * @since 2018-10-04 21:03:10
 * @author vivaxy
 */

export default class Canvas {

  constructor({ el }) {
    this.el = el;
    this.ctx = el.getContext('2d');

    [
      'currentTransform',
      'direction',
      'fillStyle',
      'filter',
      'font',
      'globalAlpha',
      'globalCompositeOperation',
      'imageSmoothingEnabled',
      'imageSmoothingQuality',
      'lineCap',
      'lineDashOffset',
      'lineJoin',
      'lineWidth',
      'miterLimit',
      'shadowBlur',
      'shadowColor',
      'shadowOffsetX',
      'shadowOffsetY',
      'strokeStyle',
      'textAlign',
      'textBaseline',
    ].forEach((attr) => {
      Object.defineProperty(this, attr, {
        get() {
          return this.ctx[attr];
        },
        set(v) {
          return this.ctx[attr] = v;
        },
      });
    });

    ['width', 'height'].forEach((attr) => {
      Object.defineProperty(this, attr, {
        get() {
          return this.canvas[attr];
        },
        set(v) {
          return this.canvas[attr] = v;
        },
      });
    });

    //
    [
      'beginPath',
      'clearHitRegions',
      'closePath',
      'getLineDash',
      'resetTransform',
      'restore',
      'save',
    ].forEach((fn) => {
      this[fn] = () => {
        return this.ctx[fn]();
      };
    });

    // p1
    [
      'addHitRegion',
      'measureText',
      'removeHitRegion',
      'scrollPathIntoView',
      'setLineDash',
      'stroke',
    ].forEach((fn) => {
      this[fn] = (p1) => {
        return this.ctx[fn](p1);
      };
    });

    // p1, p2
    [
      'clip',
      'createImageData',
      'createPattern',
      'drawFocusIfNeeded',
      'fill',
    ].forEach((fn) => {
      this[fn] = (p1, p2) => {
        return this.ctx[fn](p1, p2);
      };
    });

    // l1, l2
    [
      'lineTo',
      'moveTo',
      'scale',
      'translate',
    ].forEach((fn) => {
      this[fn] = (l1, l2) => {
        return this.ctx[fn](l1, l2);
      };
    });

    // p1, p2, p3, p4, l1, l2
    ['setTransform', 'transform'].forEach((fn) => {
      this[fn] = (p1, p2, p3, p4, l1, l2) => {
        return this.ctx[fn](p1, p2, p3, p4, l1, l2);
      };
    });

    // l1, l2, l3, l4
    [
      'clearRect',
      'fillRect',
      'createLinearGradient',
      'fillRect',
      'getImageData',
      'quadraticCurveTo',
      'rect',
      'strokeRect',
    ].forEach((fn) => {
      this[fn] = (l1, l2, l3, l4) => {
        return this.ctx[fn](l1, l2, l3, l4);
      };
    });

    // l1, l2, l3, l4, l5
    ['arcTo'].forEach((fn) => {
      this[fn] = (l1, l2, l3, l4, l5) => {
        return this.ctx[fn](l1, l2, l3, l4, l5);
      };
    });

    // l1, l2, l3, l4, l5, l6
    ['bezierCurveTo', 'createRadialGradient'].forEach((fn) => {
      this[fn] = (l1, l2, l3, l4, l5, l6) => {
        return this.ctx[fn](l1, l2, l3, l4, l6);
      };
    });

    // a1
    ['rotate'].forEach((fn) => {
      this[fn] = (a1) => {
        return this.ctx[fn](a1);
      };
    });

    // l1, l2, l3, a1, a2, b1
    ['arc'].forEach((fn) => {
      this[fn] = (l1, l2, l3, a1, a2, b1) => {
        return this.ctx[fn](l1, l2, l3, a1, a2, b1);
      };
    });

    // l1, l2, l3, l4, a1, a2, a3, b1
    ['ellipse'].forEach((fn) => {
      this[fn] = (l1, l2, l3, l4, a1, a2, a3, b1) => {
        return this.ctx[fn](l1, l2, l3, l4, a1, a2, a3, b1);
      };
    });

    // p1, l1, l2, l3
    ['fillText', 'strokeText'].forEach((fn) => {
      this[fn] = (p1, l1, l2, l3) => {
        return this.ctx[fn](p1, l1, l2, l3);
      };
    });

    // p1, l1, l2, l3, l4, l5, l6, l7, l8
    ['drawImage', 'putImageData'].forEach((fn) => {
      this[fn] = (p1, l1, l2, l3, l4, l5, l6, l7, l8) => {
        return this.ctx[fn](p1, l1, l2, l3, l4, l5, l6, l7, l8);
      };
    });

    // l1, l2 / p1, l1, l2
    ['isPointInStroke'].forEach((fn) => {
      this[fn] = (p1, p2, p3) => {
        if (typeof p1 === 'number') {
          return this.ctx[fn](p1, p2);
        }
        return this.ctx[fn](p1, p2, p3);
      };
    });

    // l1, l2, p1 / p1, l1, l2, p2
    ['isPointInPath'].forEach((fn) => {
      this[fn] = (p1, p2, p3, p4) => {
        if (typeof p1 === 'number') {
          return this.ctx[fn](p1, p2, p3);
        }
        return this.ctx[fn](p1, p2, p3, p4);
      };
    });

  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.el.width, this.el.height);
  }

  fillWindow() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.el.width = w * window.devicePixelRatio;
    this.el.height = h * window.devicePixelRatio;
    this.el.style.width = w;
    this.el.style.height = h;
    this.el.style.display = 'block';
  }

}
