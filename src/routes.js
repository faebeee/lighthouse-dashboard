import Overview from './pages/Secure/Overview/Index.vue';
import MainSecure from './pages/Secure/Index.vue';
import ProjectOverview from './pages/Secure/Project/Overview.vue';
import ProjectHistory from './pages/Secure/Project/History.vue';
import Project from './pages/Secure/Project/Index.vue';
import Login from './pages/Login/Login.vue';

export default [
    { path: '/login', name: 'login', component: Login, meta: { requiresAuth: false } },
    {
        path: '/secure', name: 'index', component: MainSecure,
        children: [
            { path: '', name: 'dashboard', component: Overview },
            {
                path: ':vcs/:username/:project',
                component: Project,
                props: true,
                children: [
                    { path: '', name: 'overview', component: ProjectOverview, props: true },
                    { path: 'history', name: 'history', component: ProjectHistory, props: true },
                ]
            },
        ]
    }
]
