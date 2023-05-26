interface JobPosition {
  value: ITJob | AccountingJob | HRJob,
  label: string
}

enum ITJob {
  DATA_ANALYST = 'DATA_ANALYST',
  SYSTEM_ARCHITECT = 'SYSTEM_ARCHITECT',
  DATABASE_ADMINISTRATOR = 'DATABASE_ADMINISTRATOR',
  DATA_SCIENCE_SPECIALIST = 'DATA_SCIENCE_SPECIALIST',
  SOFTWARE_TESTER = 'SOFTWARE_TESTER',
  NETWORK_ENGINEER = 'NETWORK_ENGINEER',
  NETWORK_ADMINISTRATOR = 'NETWORK_ADMINISTRATOR',
  FRONTEND_DEVELOPER = 'FRONTEND_DEVELOPER',
  BACKEND_DEVELOPER = 'BACKEND_DEVELOPER',
  FULL_STACK_DEVELOPER = 'FULL_STACK_DEVELOPER',
  SECURITY_ADMINISTRATOR = 'SECURITY_ADMINISTRATOR'
}

const ITJobList: JobPosition[] = [
  { value: ITJob.DATA_ANALYST, label: 'Data Analyst' },
  { value: ITJob.SYSTEM_ARCHITECT, label: 'System Architect' },
  { value: ITJob.DATABASE_ADMINISTRATOR, label: 'Database Administrator' },
  { value: ITJob.DATA_SCIENCE_SPECIALIST, label: 'Data Science Specialist' },
  { value: ITJob.SOFTWARE_TESTER, label: 'Software Tester' },
  { value: ITJob.NETWORK_ENGINEER, label: 'Network Engineer' },
  { value: ITJob.NETWORK_ADMINISTRATOR, label: 'Network Administrator' },
  { value: ITJob.FRONTEND_DEVELOPER, label: 'Frontend Developer' },
  { value: ITJob.BACKEND_DEVELOPER, label: 'Backend Developer' },
  { value: ITJob.FULL_STACK_DEVELOPER, label: 'Full Stack Developer' },
  { value: ITJob.SECURITY_ADMINISTRATOR, label: 'Security Administrator' }
]

enum AccountingJob {
  ACCOUNTANT = 'ACCOUNTANT',
  AUDITOR = 'AUDITOR',
  TAX_ADVISOR = 'TAX_ADVISOR',
  BOOKKEEPER = 'BOOKKEEPER',
  FINANCIAL_ANALYST = 'FINANCIAL_ANALYST',
  PAYROLL_SPECIALIST = 'PAYROLL_SPECIALIST'
}

const AccountingJobList: JobPosition[] = [
  { value: AccountingJob.ACCOUNTANT, label: 'Accountant' },
  { value: AccountingJob.AUDITOR, label: 'Auditor' },
  { value: AccountingJob.TAX_ADVISOR, label: 'Tax Advisor' },
  { value: AccountingJob.BOOKKEEPER, label: 'Bookkeeper' },
  { value: AccountingJob.FINANCIAL_ANALYST, label: 'Financial Analyst' },
  { value: AccountingJob.PAYROLL_SPECIALIST, label: 'Payroll Specialist' }
]

enum HRJob {
  HR_BUSINESS_PARTNER = 'HR_BUSINESS_PARTNER',
  DATA_SCIENCE_SPECIALIST = 'DATA_SCIENCE_SPECIALIST',
  DATA_SCIENCE_MANAGER = 'DATA_SCIENCE_MANAGER',
  DATA_ANALYST = 'DATA_ANALYST',
  RECRUITER = 'RECRUITER',
  RECRUITMENT_SPECIALIST = 'RECRUITMENT_SPECIALIST',
  TRAINING_SPECIALIST = 'TRAINING_SPECIALIST',
  TRAINING_MANAGER = 'TRAINING_MANAGER',
  HR_ADMINISTRATOR = 'HR_ADMINISTRATOR'
}

const HRJobList: JobPosition[] = [
  { value: HRJob.HR_BUSINESS_PARTNER, label: 'HR Business Partner' },
  { value: HRJob.DATA_SCIENCE_SPECIALIST, label: 'Data Science Specialist' },
  { value: HRJob.DATA_SCIENCE_MANAGER, label: 'Data Science Manager' },
  { value: HRJob.DATA_ANALYST, label: 'Data Analyst' },
  { value: HRJob.RECRUITER, label: 'Recruiter' },
  { value: HRJob.RECRUITMENT_SPECIALIST, label: 'Recruitment Specialist' },
  { value: HRJob.TRAINING_SPECIALIST, label: 'Training Specialist' },
  { value: HRJob.TRAINING_MANAGER, label: 'Training Manager' },
  { value: HRJob.HR_ADMINISTRATOR, label: 'HR Administrator' }
]

export const jobs: Array<JobPosition> = [
  ...ITJobList,
  ...AccountingJobList,
  ...HRJobList
]
