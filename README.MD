# TsBase64 Encode & Decode

> Simply download or copy/paste this class into your project

#Or you can use NPM

>npm i ts-base-64

Static Methods:
```
ToBase64(strObj: string|object|number): string
FromBase64(str:string):string
EncodeURI(str:string):string
```
Usage:
```
TsBase64.Encode("Typescript"); // Non-URI encoded, Base64 string.
TsBase64.Decode("VHlwZXNjcmlwdA=="); // Typescript
TsBase64.EncodeURI("Typescript\""); // "VHlwZXNjcmlwdA" (Removes the '==' chars)
```
