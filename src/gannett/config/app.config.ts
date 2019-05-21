export const configPath = "src/gannett/config";

export interface WeekRange {
    week: number;
    startOfWeek: string;
    endOfWeek: string;
    Mon: string;
    Tues: string;
    Wed: string;
    Thurs: string;
    Fri: string;
    Sat: string;
    Sun: string;
}

export interface AdAccount {
    account_id: string;
    id: string;
    name: string;
    site: string;
    fb_account_type: string;
    insights_include: boolean;
}

