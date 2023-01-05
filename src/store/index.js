// index.js文件
import {createStore} from "vuex";

import {moduleA} from "./module/moduleA";

export const store = createStore({
    // Vuex允许将store分割成模块（module），每个模块拥有自己的state、mutation、action、getter、甚至是嵌套子模块
    // 访问moduleA的状态：store.state.moduleA
    modules: {
        moduleA
    }
});

// module/moduleA.js文件
// 对于模块内部的mutation和getter，接收的第一个参数是模块的局部状态对象
// 对于模块内部的action，局部状态通过context.state暴露出来，根节点状态则为context.rootState
// 对于模块内部的getter，根节点状态会作为第三个参数暴露出来

// 在带命名空间的模块内访问全局内容
// 如果希望使用全局state和getter，rootState和rootGetters会作为第三和第四个参数传入getter，也会通过context对象的属性传入action
// 若需要在全局命名空间内分发action或提交mutation，将{root: true}作为第三个参数传给dispatch或commit即可。

export const moduleA = {
    // 默认情况下，模块内部的action、mutation和getter是注册在全局命名空间的，如果希望模块具有更高的封装度和复用性，可以通过添加namespaced:true的方式使其成为带命名空间的模块
    namespaced: true,
    state: {
        testState1: 'xxxx',
        testState2: {
            a: 0,
            b: 1
        },
        testState3: 0
    },
    // 有的时候需要从store中的state中派生出一些状态，此时可以将该部分抽象出一个函数供多处使用。
    // Vuex允许在store中定义getter，像计算属性一样，getter的返回值会根据它的依赖被缓存起来，且只有当他的依赖值发生了改变才会被重新计算
    getters: {
        // getter接收state作为其第一个参数
        testGetter1: state => {
            return state.testState1 + state.testState3;
        },
        // getter可以接受其他getter作为第二个参数
        testGetter2: (state, getters) => {
            return getters.testGetter1.length;
        }
    },
    // 更改Vuex的store中的状态的唯一方法是提交mutation，每个mutation都有一个字符串的事件类型和一个回调函数，该回调函数接收state作为第一个参数，提交的载荷作为第二个参数
    // 以相应的type调用store.commit方法来触发相应的回调函数
    // Mutation必须是同步函数
    mutations: {
        testMutation1(state) {
            // 变更状态
            state.testState3++;
        },
        // 第二个参数是载荷
        testMutation2(state, payload) {
            state.testState1 += payload.content;
        }
    },
    // Action提交的是mutation，而不是直接变更状态
    // Action可以包含任意异步操作
    // Action函数接受一个与store实例具有相同方法和属性的context对象，因此可以调用context.commit提交一个mutation，或者通过context.state和context.getters来获取state和getters。
    // Action通过store.dispatch方法触发
    actions: {
        testAction1(context) {
            setTimeout(() => {
                context.commit('testMutation1');
            }, 1000);
        },
        testAction2({commit}, payload) {
            setTimeout(() => {
                commit({
                    type: 'testMutation2',
                    content: payload.content
                });
            }, 1000);
        }
    }
};