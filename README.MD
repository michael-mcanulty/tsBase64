# TsBase64 Encode & Decode

> Simply download or copy/paste this class into your project

##Or you can use NPM

>npm i ts-base-64

```
//Methods
public static ToBase64(strObj: string|object|number): string
public static FromBase64(str:string):string
public static EncodeURI(str:string):string

//Usage
let toB64: string = TsBase64.Encode("Typescript"); // Non-URI encoded, Base64 string.
let fromB64: string = TsBase64.Decode("VHlwZXNjcmlwdA=="); // Typescript
let uriEncodedB64: string = TsBase64.EncodeURI("Typescript\""); // "VHlwZXNjcmlwdA" (Removes the '==' chars)

// Non-URI encoded, Base64 string.
console.log(toB64); // VHlwZXNjcmlwdA==
console.log(fromB64); // Typescript.

//Removes the special characters ('==').
console.log(uriEncodedB64); // VHlwZXNjcmlwdA==


