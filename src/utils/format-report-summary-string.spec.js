import { expect } from 'chai';
import formatReportSummaryString from './format-report-summary-string';

describe('utils/formatReportSummaryString', function() {
    it('Format report message', () => {
        const report = {
            createdAt: '2020-01-30T21:08:06.709Z',
            message: 'Foo Bar',
            siteId: '',
            values: [],
            id: '',
            git_commit: '',
        };
        const summary = formatReportSummaryString(report);

        expect(summary).to.be.equal(report.message);
    });
});