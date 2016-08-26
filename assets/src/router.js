import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import MainLayout from './components/MainLayout.vue'
import ControlPanel from './components/ControlPanel.vue'
import ObjectManager from './components/ObjectManager.vue'
import Settings from './components/Settings.vue'

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
    '/': {
        component: MainLayout,
        subRoutes: {
            '/': {
                component: ControlPanel
            },
            '/objects': {
                component: ObjectManager
            },
            '/settings': {
                component: Settings
            }
        }
    }
});

export default router