import createFakeReport from '../../../../../../src/utils/create-fake-report';
import withLayout from '../../../storybook/decorators/withLayout';
import AuditReportList from './audit-report-list.vue';

export default {
    title: 'Reports / Audit Report List',
    decorators: [withLayout],
};

export const component = () => ({
    components: { AuditReportList },
    props: {
        reports: {
            default: () => [
                createFakeReport({ raw: 'foo' }),
                createFakeReport({ raw: 'foo' }),
                createFakeReport({ raw: 'foo' }),
                createFakeReport({ raw: 'foo' }),
                createFakeReport({ raw: 'foo' }),
            ],
        },
    },
    template: '<audit-report-list :reports="reports" />',
});

export const emptyList = () => ({
    components: { AuditReportList },
    props: {
        reports: {
            default: () => [
                createFakeReport(),
                createFakeReport(),
                createFakeReport(),
                createFakeReport(),
                createFakeReport(),
            ],
        },
    },
    template: '<audit-report-list :reports="reports" />',
});
