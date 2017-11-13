export class TsBase64{
    private static _b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    private _fromCharCode:any = String.fromCharCode;

    private _b64tab: any;

    private _cb_utob(c: string):string{
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc <         0x800 ? (this._fromCharCode(0xc0 | (cc >>> 6))
                                + this._fromCharCode(0x80 | (cc & 0x3f)))
                : (this._fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                   + this._fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                   + this._fromCharCode(0x80 | ( cc         & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (this._fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                    + this._fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                    + this._fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                    + this._fromCharCode(0x80 | ( cc         & 0x3f)));
        }
    }

    private _re_utob: RegExp = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;

    public utob(u):string{
        return u.replace(this._re_utob, this._cb_utob);
    }

    private _cb_encode(ccc):string{
        var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
        chars = [
            JsBase64._b64chars.charAt( ord >>> 18),
            JsBase64._b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : JsBase64._b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : JsBase64._b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    }

    public btoa(b) {
        return b.replace(/[\s\S]{1,3}/g, this._cb_encode);
    }

    public encode(u:string, urisafe: boolean):string{
        var _encode = u=>{ 
            return this.btoa(this.utob(u))
        }
        return !urisafe
            ? _encode(String(u))
            : _encode(String(u)).replace(/[+\/]/g, m0=>{
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    }

    public encodeURI(u):string{
        return this.encode(u, true);
    }

    private _re_btou():RegExp{
        return new RegExp([
            '[\xC0-\xDF][\x80-\xBF]',
            '[\xE0-\xEF][\x80-\xBF]{2}',
            '[\xF0-\xF7][\x80-\xBF]{3}'
        ].join('|'), 'g');
    }
    private _cb_btou(cccc):string{
        switch(cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                |    ((0x3f & cccc.charCodeAt(1)) << 12)
                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
                |     (0x3f & cccc.charCodeAt(3)),
            offset = cp - 0x10000;
            return (this._fromCharCode((offset  >>> 10) + 0xD800)
                    + this._fromCharCode((offset & 0x3FF) + 0xDC00));
        case 3:
            return this._fromCharCode(
                ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    |  (0x3f & cccc.charCodeAt(2))
            );
        default:
            return  this._fromCharCode(
                ((0x1f & cccc.charCodeAt(0)) << 6)
                    |  (0x3f & cccc.charCodeAt(1))
            );
        }
    }
    public btou(b) {
        return b.replace(this._re_btou, this._cb_btou);
    }

    private _cb_decode(cccc) {
        var len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? this._b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? this._b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? this._b64tab[cccc.charAt(2)] <<  6 : 0)
            | (len > 3 ? this._b64tab[cccc.charAt(3)]       : 0),
        chars = [
            this._fromCharCode( n >>> 16),
            this._fromCharCode((n >>>  8) & 0xff),
            this._fromCharCode( n         & 0xff)
        ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    }

    public atob(a):string{
        return a.replace(/[\s\S]{1,4}/g, this._cb_decode);
    }

    public decode(a:string):string{
        var _decode = (a)=>{ 
            return this.btou(atob(a)) 
        };
        return _decode(
            String(a).replace(/[-_]/g, (m0)=>{ return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    }
    public fromBase64(c:string){
        return this.decode(c);
    }
    public toBase64(u:string, urisafe: boolean){
        return this.encode(u, urisafe);
    }
    constructor(){
        this._b64tab = ()=>{
            var t = {};
            for (var i = 0, l = JsBase64._b64chars.length; i < l; i++) t[JsBase64._b64chars.charAt(i)] = i;
            return t;
        }
    }
}