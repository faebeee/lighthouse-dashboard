export interface Report {
    values: ReportValue[];
    id: string;
    siteId: string;
    createdAt: string;
    message: string | null;
    git_commit: string | null;
    raw: Object | null;
    hasRawData?: boolean;
}

export interface ReportValue {
    id: string;
    value: number;
}
