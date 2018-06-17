# TsBase64 Encode & Decode

> Simply download or copy or paste this class into your project

```
//Methods
public static ToBase64(str:string):string
public static FromBase64(str:string):string
public static EncodeURI(str:string):string

//Usage
const toB64 = TsBase64.ToBase64("Typescript"); // Non-URI encoded, Base64 string.
const fromB64 = TsBase64.FromBase64("VHlwZXNjcmlwdA=="); // Typescript
const uriEncodedB64 = TsBase64.EncodeURI("Typescript\""); // "VHlwZXNjcmlwdA" (Removes the '==' chars)

// Non-URI encoded, Base64 string.
console.log(toB64); // VHlwZXNjcmlwdA==
console.log(fromB64); // Typescript.

//Removes the special characters ('==').
console.log(uriEncodedB64); // VHlwZXNjcmlwdA==


