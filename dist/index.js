"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TsBase64 {
    constructor() {
        TsBase64._b64tab = () => {
            let t = {};
            for (let i = 0, l = TsBase64._b64chars.length; i < l; i++)
                t[TsBase64._b64chars.charAt(i)] = i;
            return t;
        };
    }
    static _cb_btou(cccc) {
        switch (cccc.length) {
            case 4:
                let cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                    | ((0x3f & cccc.charCodeAt(1)) << 12)
                    | ((0x3f & cccc.charCodeAt(2)) << 6)
                    | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
                return (this._fromCharCode((offset >>> 10) + 0xD800)
                    + this._fromCharCode((offset & 0x3FF) + 0xDC00));
            case 3:
                return this._fromCharCode(((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    | (0x3f & cccc.charCodeAt(2)));
            default:
                return this._fromCharCode(((0x1f & cccc.charCodeAt(0)) << 6)
                    | (0x3f & cccc.charCodeAt(1)));
        }
    }
    static _cb_decode(cccc) {
        let len = cccc.length, padlen = len % 4, n = (len > 0 ? this._b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? this._b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? this._b64tab[cccc.charAt(2)] << 6 : 0)
            | (len > 3 ? this._b64tab[cccc.charAt(3)] : 0), chars = [
            this._fromCharCode(n >>> 16),
            this._fromCharCode((n >>> 8) & 0xff),
            this._fromCharCode(n & 0xff)
        ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    }
    static _cb_encode(ccc) {
        let padlen = [0, 2, 1][ccc.length % 3], ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)), chars = [
            TsBase64._b64chars.charAt(ord >>> 18),
            TsBase64._b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : TsBase64._b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : TsBase64._b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    }
    static _cb_utob(c) {
        if (c.length < 2) {
            let cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (this._fromCharCode(0xc0 | (cc >>> 6))
                    + this._fromCharCode(0x80 | (cc & 0x3f)))
                    : (this._fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                        + this._fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                        + this._fromCharCode(0x80 | (cc & 0x3f)));
        }
        else {
            let cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (this._fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                + this._fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                + this._fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                + this._fromCharCode(0x80 | (cc & 0x3f)));
        }
    }
    static _re_btou() {
        return new RegExp([
            '[\xC0-\xDF][\x80-\xBF]',
            '[\xE0-\xEF][\x80-\xBF]{2}',
            '[\xF0-\xF7][\x80-\xBF]{3}'
        ].join('|'), 'g');
    }
    static _atob(a) {
        return a.replace(/[\s\S]{1,4}/g, this._cb_decode);
    }
    static _btoa(b) {
        return b.replace(/[\s\S]{1,3}/g, this._cb_encode);
    }
    static _btou(b) {
        return b.replace(this._re_btou, this._cb_btou);
    }
    static _decode(a) {
        let _decode = (a) => {
            return this._btou(atob(a));
        };
        return _decode(String(a).replace(/[-_]/g, (m0) => {
            return m0 == '-' ? '+' : '/';
        })
            .replace(/[^A-Za-z0-9\+\/]/g, ''));
    }
    static _encode(u, urisafe = false) {
        let _encode = (u) => {
            return this._btoa(this._utob(u));
        };
        return !urisafe
            ? _encode(String(u))
            : _encode(String(u)).replace(/[+\/]/g, m0 => {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    }
    static EncodeURI(u) {
        return this._encode(u, true);
    }
    static FromBase64(c) {
        return this._decode(c);
    }
    static ToBase64(u) {
        return this._encode(u);
    }
    static _utob(u) {
        return u.replace(this._re_utob, this._cb_utob);
    }
}
TsBase64._b64chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`;
TsBase64._fromCharCode = String.fromCharCode;
TsBase64._re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
exports.TsBase64 = TsBase64;
const _toB64 = TsBase64.ToBase64("Typescript");
const _fromB64 = TsBase64.FromBase64("VHlwZXNjcmlwdA==");
const _uriEncodedB64 = TsBase64.EncodeURI("Typescript\"");
console.log(_toB64);
console.log(_fromB64);
console.log(_uriEncodedB64);
//# sourceMappingURL=index.js.map