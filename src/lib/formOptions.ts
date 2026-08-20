/*
  The application form's option lists, and the GHL field each one writes into.

  These used to live only in Builder.tsx, which made them look like a
  presentation detail. They are not. Several of the GHL fields behind them are
  dropdowns with a fixed set of allowed values, so an option that exists here
  and not in GHL is not a cosmetic mismatch: GHL rejects the value and that
  answer is dropped from the contact record. The application still succeeds,
  Slack still fires, and nothing anywhere says the data went missing.

  That is exactly what happened when the revenue bands went from four to six.

  So the lists live here, the form renders from them, and the health dashboard
  reads the same lists and compares them against what GHL will actually accept.
  One definition, checked continuously, instead of two that drift.

  Adding or renaming an option here means updating the matching GHL dropdown.
  The dashboard will tell you if you forget.
*/

export const revenueBands = ['0-1M', '1-3M', '3-10M', '10-20M', '20-50M', '50M+'];

export const revenueLabels: Record<string, string> = {
  '0-1M': '$0 - $1M',
  '1-3M': '$1M - $3M',
  '3-10M': '$3M - $10M',
  '10-20M': '$10M - $20M',
  '20-50M': '$20M - $50M',
  '50M+': '$50M+',
};

export const channels = ['Instagram', 'YouTube', 'Email', 'LinkedIn', 'Podcast', 'Other'];

export const problems = [
  'Content doesnt match business level',
  'Inconsistent / founder dependent',
  'Message unclear / fragmented',
  'Creates a lot but no pipeline',
];

/* What the form shows, and what GHL and Notion actually store. The two differ
   because the stored values were named first, so the form maps onto them. */
export const opsOptions = ['Yes, full time', 'Yes, part time', 'No'];
export const opsToStored: Record<string, string> = {
  'Yes, full time': 'Yes full-time',
  'Yes, part time': 'Yes part-time',
  No: 'No',
};

export const yesNo = ['Yes', 'No'];

/*
  Every list above that lands in a GHL dropdown, paired with the env var holding
  that field's id. Anything in `values` that GHL will not accept is a silently
  dropped answer, so the dashboard walks this table.

  A list writing to a free text field does not belong here. `channels` is one:
  it is stored as text, so any value is accepted and there is nothing to drift.
*/
export const ghlOptionContracts: Array<{
  label: string;
  envVar: string;
  values: string[];
}> = [
  { label: 'Annual revenue', envVar: 'GHL_FIELD_ANNUAL_REVENUE', values: revenueBands },
  { label: 'Whats broken', envVar: 'GHL_FIELD_WHATS_BROKEN', values: problems },
  {
    label: 'Operator status',
    envVar: 'GHL_FIELD_OPERATOR_STATUS',
    values: Object.values(opsToStored),
  },
  { label: 'Can commit 30 days', envVar: 'GHL_FIELD_CAN_COMMIT_30_DAYS', values: yesNo },
];
