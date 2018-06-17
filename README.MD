# Base64 Typescript class
## Just download or copy / pste the class into your project.

> Base64 encoding / decoding Typescript class. 


```
TsBase64.encode(encodeMe:string, urlSafe:boolean): string
TsBase64.decode(encodeMe:string): string
TsBase64.toBase64(encodeMe:string, urlSafe:boolean): string

//USAGE
const _encoded = TsBase64.encode("Typescript", true);
const _decoded = TsBase64.decode("VHlwZXNjcmlwdA");
const _toB64Encoded = TsBase64.toBase64("Typescript", false);

//RESULT
console.log(_encoded); // VHlwZXNjcmlwdA==
console.log(_decoded); // Typescript
console.log(_toB64Encoded); // VHlwZXNjcmlwdA==

