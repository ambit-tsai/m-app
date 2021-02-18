# &lt;m-app&gt;
可能是你见过最简单的微前端解决方案，一行代码即可实现应用的接入。
```html
<m-app entry="http://example.com/path/to/entry.html"></m-app>
```
m-app 将应用的 DOM 树置于 Shadow DOM 中维护，从而实现 DOM 树独立与 CSS 隔离。而 JavaScript 代码则置于**同源** iframe 中运行，由 iframe 提供独立的运行环境。

m-app 的 Shadow DOM 结构如下：
```html
           ├─<iframe hidden>  
           │                 ├─<meta>
ShadowRoot─│        ├─<head>─├─<title>
           │        │        ├─...
           ├─<html>─│
                    │        ├─<h1>
                    ├─<body>─├─<div>
                             ├─...
```
m-app 的 Shadow DOM 与正常的 DOM 结构基本一致，降低应用接入的改造成本。
```html
                             ├─<meta>
                    ├─<head>─├─<title>
                    │        ├─...
   Document──<html>─│
                    │        ├─<h1>
                    ├─<body>─├─<div>
                             ├─...
```


## ✨ 特性
1. 运行时集成，应用可独立开发、部署、升级
1. HTML Entry
1. 天然支持 DOM、CSS、JS 隔离
1. 不限制接入应用的技术栈
1. 支持多应用并行
1. 支持 `<script>` 的 type="module"、defer、async 等特性


## ⬇️ 安装
```
npm i -S m-app
```


## 🔨 使用
```javascript
import 'm-app';
```
或者
```html
<script src="path/to/m-app.js"></script>
```


## 📱 联系
1. *微信*: ambit_tsai
1. *QQ群*: 663286147
1. *邮箱*: ambit_tsai@qq.com
