# &lt;m-app&gt;
可能是你见过最简单的微前端解决方案，一行代码即可实现应用的接入 😎
```html
<m-app entry="http://example.com/path/to/entry.html"></m-app>
```
体验一下，并且可以在线接入你的应用 🎉
1. <a href="http://ambit.gitee.io/m-app/" target="_blank">Gitee Pages</a>
1. <a href="https://ambit-tsai.github.io/m-app/" target="_blank">GitHub Pages</a>


## 📃 简介
m-app 将应用的 DOM 树置于 Shadow DOM 中维护，从而实现 DOM 树独立以及 CSS 隔离。而 JavaScript 代码则置于**同源** iframe 中运行，由 iframe 提供独立的运行环境，并劫持 iframe 中 `document`、`document.head`、`document.body` 等元素对象的方法，重定向到 Shadow DOM 中对应的元素上去。此外，还劫持了普通元素上有引入新元素能力的方法，如 `appendChild`、`replaceChild` 等，分析其中的 `<script>` 元素，并置于 iframe 中运行。

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
1. 支持 `<script>` 的 type="module"、defer、async 等原生特性


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
