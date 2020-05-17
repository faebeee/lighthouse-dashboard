import Vue from 'vue';
import { mapActions } from 'vuex';

const withReports = (component) => {
    return Vue.component('WithReportsContainer', {
        props: {
            id: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                reports: [],
            };
        },

        methods: {
            ...mapActions('reports', ['fetchReportsForSite']),
            loadData() {
                return this.fetchReportsForSite({ id: this.id })
                    .then((reports) => {
                        this.reports = reports;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },

        mounted() {
            this.loadData();
        },

        render(createElement) {
            return createElement(component, {
                props: {
                    id: this.id,
                    reports: this.reports,
                    ...this.$attrs,
                },
            });
        },
    });
};

export default withReports;
