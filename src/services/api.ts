const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const applicationNames = [
  "Q1 Sales Bonus", "Diwali Reward Program", "New Year Employee Gifts", "Project Titan Completion Bonus", 
  "Annual Performance Awards", "Client Acquisition Incentive", "Tech Upgrade Program", "Marketing Campaign Rewards",
  "Employee Wellness Subsidy", "Holiday Season Vouchers", "Customer Loyalty Gifts", "Partner Onboarding Kits",
  "Q2 Sales Contest", "Innovation Challenge Prize", "Team Building Event Funds", "Training & Development Stipend",
  "Work From Home Setup Grant", "Referral Program Bonus", "Oktoberfest Celebration", "Christmas Hampers",
  "Eid Festivity Vouchers", "Summer Outing Budget", "Product Launch Incentive", "Cost Savings Reward",
  "Customer Service Excellence Award"
];

const users = ["John Doe", "Jane Smith", "Emily White", "Michael Brown", "Sarah Jones", "David Wilson"];

const generateApplications = (count: number, type: 'draft' | 'submitted') => {
  const applications: any[] = [];
  const statuses = type === 'draft' ? ["Draft"] : ["Approved", "Pending Approval", "Rejected"];
  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date();
    date.setDate(date.getDate() - i);
    applications.push({
      id: `${type === 'draft' ? 'DRAFT' : 'APP'}-${String(1245 - i).padStart(6, '0')}`,
      applicationName: applicationNames[i % applicationNames.length],
      date: date.toISOString().split('T')[0],
      status: status,
      updatedBy: users[Math.floor(Math.random() * users.length)],
    });
  }
  return applications;
}

const submittedApplications = generateApplications(25, 'submitted');
const draftApplicationsData = generateApplications(25, 'draft');

export const apiClient = {
  getBalance: async () => {
    await delay(300);
    return {
      balance: 1250420.5,
      lastUpdated: "just now",
    };
  },
  getPendingApplications: async () => {
    await delay(300);
    return {
      count: 3,
      totalRecords: 282,
    };
  },
  getDraftApplications: async () => {
    await delay(300);
    return [
      {
        id: "APP-001",
        date: "10/30/2023",
        description: '25 records for "Project Phoenix". Awaiting final details.',
      },
      {
        id: "APP-002",
        date: "10/28/2023",
        description: '50 records for "Q4 Employee Perks". File upload incomplete.',
      },
    ];
  },
  getRecentSubmissions: async () => {
    await delay(300);
    return submittedApplications.slice(0, 5);
  },
  getApplications: async () => {
    await delay(300);
    return submittedApplications;
  },
  getDrafts: async () => {
    await delay(300);
    return draftApplicationsData;
  },
  checkSso: async (email: string) => {
    await delay(300);
    console.log("API: checkSso for", email, "returns", { sso: email.endsWith("@example.com") });
    return { sso: email.endsWith("@example.com") };
  },
  login: async (email: string, password) => {
    await delay(300);
    const is2fa = email === "2fa@example.com";
    const response = { twoFactor: is2fa, token: is2fa ? null : "jwt-token-here" };
    console.log("API: login for", email, "returns", response);
    return response;
  },
  verifyTwoFactor: async (otp: string) => {
    await delay(300);
    const response = { token: otp === "123456" ? "jwt-token-here" : null };
    console.log("API: verifyTwoFactor for", otp, "returns", response);
    return response;
  },
};
