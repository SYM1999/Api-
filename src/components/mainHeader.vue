<template>
    <header class="main-header">
        <div class="container">
            <a href="/" class="logo">
                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
                    alt="稀土掘金" class="logo-img">
                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg"
                    alt="稀土掘金" class="mobile">
            </a>
            <nav role="navigation" class="main-nav">
                <ul class="nav-list">
                    <li class="main-nav-list">
                        <div class="phone-show-menu" @click="indexSvg()">
                            <span>首页</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="unfold16-icon"
                                :class="{ active: indexActive }">
                                <path
                                    d="M2.45025 4.82431C2.17422 4.49957 2.40501 4.00049 2.83122 4.00049H9.16878C9.59498 4.00049 9.82578 4.49957 9.54975 4.82431L6.38097 8.55229C6.1813 8.78719 5.8187 8.78719 5.61903 8.55229L2.45025 4.82431Z"
                                    data-v-925bf8d6="">
                                </path>
                            </svg>

                        </div>
                        <ul class="phone-hide" :class="{ show: indexActive }">

                            <template v-for="item,key in navArr">
                            <li class="nav-item link-item" :class="{ active: activeIndex === key }" @click="setIndex(key)">
                                <a href="#">
                                    {{item}}
                                </a>
                            </li>
                            </template>

                            <nav class="nav-item link-item">
                                <a href="https://detail.youzan.com/show/goods/newest?kdt_id=104340304" target="_blank"
                                    rel="nofollow noopener noreferrer" class="nav-item link-item no-border">
                                    <span>商城</span>
                                </a>
                            </nav>
                            <nav class="nav-item link-item download-icon">
                                <a href="https://juejin.cn/app?utm_source=jj_nav" target="_blank"
                                    rel="nofollow noopener noreferrer" class="download-app no-border">
                                    <span>APP</span>
                                </a>
                            </nav>
                            <nav class="nav-item link-item extension-icon">
                                <a href="https://juejin.cn/extension?utm_source=jj_nav" target="_blank"
                                    rel="nofollow noopener noreferrer" class="broswer-extension no-border">
                                    <span>插件</span>
                                </a>
                            </nav>

                        </ul>
                    </li>
                    <ul class="right-side-nav">
                        <li class="search-add"></li>
                    </ul>
                </ul>
            </nav>
        </div>

    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let activeIndex = ref(0);
let indexActive = ref(false)
const navArr=ref(['首页','沸点','课程','直播','活动'])

function indexSvg() {
    indexActive.value = !indexActive.value
}

const setIndex = (index: number) => {
    activeIndex.value = index;
}


</script>


<style>
.main-header {
    height: 5rem;
    margin: auto;
    max-width: 1440px;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    color: #909090;
    z-index: 250;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    transition: all .2s;
}

.container {

    max-width: 1440px;
    margin: auto;

    display: flex;
    align-items: center;
    height: 100%;


    position: relative;
    margin: 0 auto;
    width: 100%;
    /* max-width: 960px; */


}

a {
    text-decoration: none;
    cursor: pointer;
    color: #909090;
}

.logo {
    /*(max-width: 1149px)  margin-left: 0; */

    margin-right: 1rem;
    margin-left: 24px;
    display: inline-block;
    height: 22px;
    width: auto;
}

img {
    border-style: none;
}

.logo-img {
    display: block;
    width: 107px;
    height: 22px;
}

.mobile {
    display: none;
    width: 31px;
}

.main-nav {
    height: 100%;
    flex: 1 0 auto;
    background-color: palegoldenrod;
}

.nav-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    flex-direction: row-reverse;
    height: 100%;
    margin: 0;
}

ul {
    padding: 0;
    margin: 0;
}

ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    /* padding-inline-start: 40px; */
}

.main-nav-list {
    display: flex;
    order: 99;
}

li {
    list-style: none;
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
}

.right-side-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    height: 100%;
    margin: 0;
    order: 0;
}

ul ul {
    list-style-type: circle;
    margin-block-start: 0px;
    margin-block-end: 0px;
}

.phone-show-menu {
    cursor: pointer;
    display: none;
}

.unfold16-icon {
    fill: #515767;
    transform: rotate(0deg);
    transition: transform .2s ease-in-out;
}

.unfold16-icon.active {
    fill: #1e80ff;
    transform: rotate(-180deg);
}

svg:not(:root) {
    overflow: hidden;
}

svg {
    width: 12;
    height: 12;
    fill: none;
}

svg:not(:root) {
    overflow: hidden;
}

.phone-hide {
    display: flex;
}

.nav-item.link-item {
    padding: 0;
    height: 5rem;
}

.nav-item {
    color: #86909c;
    padding: 0 1rem;
    font-size: 1.167rem;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.nav-item {
    position: relative;
    cursor: pointer;
}

.phone-hide .nav-item.link-item a:not(.no-hover) {
    display: inline-block;
    height: 5rem;
    margin: 0 1rem;
    line-height: 5rem;
}

.nav-item.active>.icon,
.nav-item.active>a {
    color: #1e80ff;
    font-weight: 500;
}

.nav-item>a:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.nav-item a {
    color: #515767;
    position: relative;
}

.nav-item a:hover {
    padding-top: 2px;
    border-bottom: #1e80ff 2px solid;
}

a,
button,
input {
    margin: initial;
}

a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
}

a {
    text-decoration: none;
    cursor: pointer;
    color: #909090;
}

.search-add {
    flex: 1 1 auto;
    height: 5rem;
    display: flex;
    justify-content: flex-end;
}

:target {
    color: pink;
}

.acitve>a {
    color: pink;
}
</style>


<style>
@media screen and (max-width: 640px) {
    .nav-item {
        padding: 0 1.667rem 0 1rem;
    }

    .container {
        margin: 0 .917rem 0 1.333rem !important;
    }

    .main-header {
        height: 4.333rem;
    }

    .logo-img {
        display: none;
    }

    .logo {
        margin-right: 0;
    }

    .mobile {
        display: block;
        height: 2rem;
    }

    .right-side-nav {
        margin-right: 2rem;
        margin-left: 0;
        width: 365px;
    }

    .right-side-nav {
        width: 322px;
        margin-right: 0;
    }

    .phone-show-menu {
        height: 4.333rem;
    }

    .search-add {
        margin-left: 0;
    }


}
</style>

<style>
@media screen and (max-width: 800px) {

    .right-side-nav {
        margin-right: 2rem;
    }


}
</style>

<style>
@media screen and (max-width: 799px) {

    .right-side-nav {
        width: 383px;
        margin-right: 2rem;
    }

    .search-add {
        justify-content: flex-start;
        width: 270px;
        margin-left: 1rem;
    }

}
</style>

<style>
@media screen and (max-width: 1149px) {

    .phone-hide {
        display: none;
        background-color: #fff;
        box-shadow: 0 8px 24px rgb(81 87 103 / 16%);
        border: 1px solid #ebebeb;
        border-radius: 4px;
        font-size: 1.2rem;
    }

    .right-side-nav {
        margin-right: 1.667rem;
    }

    .main-nav-list {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #fff;
        z-index: 1;
    }

    .logo {
        margin-left: 0;
    }

    .container {
        width: 97%;
        margin: 0 2rem !important;
    }

    .nav-list {
        justify-content: flex-end;
    }

    .nav-list {
        flex-direction: row;
    }

    .phone-show-menu {
        height: 5rem;
        display: flex;
        align-items: center;
        color: #1e80ff;
        font-size: 1.33rem;
        justify-content: center;
        padding: 0;
        width: 5.66rem;
    }

    .phone-show-menu span {
        margin-right: .333rem;
    }

    .nav-item.link-item {
        height: 4rem;
    }

    .download-icon,
    .extension-icon {
        display: none;
    }

    .search-add {
        margin-right: .292rem;
    }

    .phone-hide.show {
        display: block;
        position: absolute;
        right: -4rem;
        left: -4.3rem;
        padding: .667rem;
        width: 11.9rem;
        top: 52px;
    }

}
</style>