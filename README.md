# &lt;m-app&gt;
可能是你见过最简单的微前端解决方案，一行代码即可实现应用的接入 😎
```html
<m-app entry="http://example.com/path/to/entry.html"></m-app>
```
体验一下，并且可以在线接入你的应用 🎉
1. <a href="http://ambit.gitee.io/m-app/" target="_blank">Gitee Pages</a>
1. <a href="https://ambit-tsai.github.io/m-app/" target="_blank">GitHub Pages</a>


## 📃 简介
***m-app*** 将微应用的 DOM 树置于 **Shadow DOM** 中维护，从而实现 DOM 树独立以及 CSS 隔离，而 JavaScript 代码则置于**同源 iframe** 中运行，由 iframe 提供独立的运行环境。

<p align="center">
    <img src="https://raw.githubusercontent.com/ambit-tsai/m-app/assets/structure.svg" title="感谢王*扬同学的图" width="300px">
</p>

出于降低改造成本的考虑，微应用的 Shadow DOM 与正常 DOM 的结构保持一致。

微应用的 Shadow DOM 结构：
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
正常 DOM 结构：
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
1. 对 DOM、CSS、JS 进行硬隔离，实现**真正**的技术栈无关
1. 微应用与基座应用的 UI 可以完美融合，无 `<iframe>` 的窗口隔离问题
1. 运行时集成，微应用可独立开发、部署、升级
1. 支持多应用同时接入
1. 支持 `<script>` 的 `type="module"`、`defer`、`async` 等特性
1. HTML Entry，符合一般应用的开发方式，无需改造


## ⬇️ 安装
```
npm i -S @ambit_tsai/m-app
```


## 🔨 使用
```javascript
import '@ambit_tsai/m-app';
```
或者
```html
<script src="path/to/m-app.js"></script>
```
更多信息请查看 <a href="https://github.com/ambit-tsai/m-app/wiki" target="_blank">Wiki</a>


## ☎️ 联系
1. *微信*: ambit_tsai
1. *QQ群*: 663286147
1. *邮箱*: ambit_tsai@qq.com
