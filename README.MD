# Base64 Typescript class
## Simply download or copy or paste this class into your project

> Base64 encoding / decoding Typescript class. 


```
//URL safe result is option. Defaults to false.
TsBase64.encode(encodeStr:string, urlSafeResult?:boolean): string
TsBase64.decode(decodeStr:string): string
TsBase64.toBase64(yourStr:string, urlSafeResult?:boolean): string

//USAGE
const _encoded = TsBase64.encode("Typescript", true);
const _decoded = TsBase64.decode("VHlwZXNjcmlwdA");
const _toB64Encoded = TsBase64.toBase64("Typescript", false);

//RESULT
console.log(_encoded); // VHlwZXNjcmlwdA==
console.log(_decoded); // Typescript
console.log(_toB64Encoded); // VHlwZXNjcmlwdA==

