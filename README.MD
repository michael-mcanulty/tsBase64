# Base64 Typescript class
## Simply download or copy or paste this class into your project

> Base64 encoding / decoding Typescript class. 


```
//Methods
public static ToBase64(str:string):string
public static FromBase64(str:string):string
public static EncodeURI(str:string):string

//Usage
const _toB64 = TsBase64.ToBase64("Typescript"); // Non-URI encoded, Base64 string.
const _fromB64 = TsBase64.FromBase64("VHlwZXNjcmlwdA=="); // Typescript
const _uriEncodedB64 = TsBase64.EncodeURI("Typescript\""); // "VHlwZXNjcmlwdA" (Removes the '==' chars)

// Non-URI encoded, Base64 string.
console.log(_toB64); // VHlwZXNjcmlwdA==
console.log(_fromB64); // Typescript.
//Removes the special characters ('==').
console.log(_uriEncodedB64); // VHlwZXNjcmlwdA==



