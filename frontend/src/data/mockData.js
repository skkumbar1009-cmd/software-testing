export const COURSES = [
  {
    id: "manual-testing",
    title: "Manual Testing",
    category: "Manual Testing",
    duration: "6 Weeks",
    fees: 12000,
    rating: 4.5,
    type: "Beginner",
    placementSupport: "Yes",
    badge: "Popular",
    description: "Master software testing fundamentals, test case designing, execution, bug tracking, and Agile methodologies.",
    syllabus: [
      "Introduction to Software Engineering & Testing",
      "Software Development Life Cycle (SDLC) - Waterfall, Spiral, Agile Scrum",
      "Software Testing Life Cycle (STLC)",
      "Test Design Techniques (Boundary Value Analysis, Equivalence Partitioning)",
      "Bug Life Cycle & Defect Management using Jira",
      "Types of Testing (Functional, Regression, System, Usability)"
    ],
    tools: ["Jira", "Trello", "Excel"],
    trainers: ["Sanjay Patil (10+ yrs exp)", "Neha Sharma (8+ yrs exp)"],
    skillsCovered: ["Agile Testing", "Defect Logging", "Test Plan Creation", "Black Box Testing"]
  },
  {
    id: "automation-testing",
    title: "Automation Testing Masterclass",
    category: "Automation Testing",
    duration: "12 Weeks",
    fees: 28000,
    rating: 4.8,
    type: "Advanced",
    placementSupport: "100% Placement Support",
    badge: "Best Seller",
    description: "A comprehensive program covering Java/Python, Selenium WebDriver, TestNG, Cucumber BDD, Git, and Jenkins.",
    syllabus: [
      "Core Java / Python Fundamentals for Automation",
      "Selenium WebDriver Core Concepts & Element Locators",
      "TestNG / PyTest Framework Design & Data Driven Testing",
      "Page Object Model (POM) Design Pattern",
      "BDD Framework with Cucumber",
      "CI/CD Integration with Jenkins & Git"
    ],
    tools: ["Selenium", "Java", "TestNG", "Jenkins", "Git", "Maven"],
    trainers: ["Vikram Aditya (12+ yrs exp)", "Kunal Deshmukh (15+ yrs exp)"],
    skillsCovered: ["Framework Architecture", "Automation Scripting", "CI/CD Pipeline", "Automation Framework Design"]
  },
  {
    id: "selenium-testing",
    title: "Selenium WebDriver Certification",
    category: "Selenium",
    duration: "8 Weeks",
    fees: 18000,
    rating: 4.4,
    type: "Intermediate",
    placementSupport: "Yes",
    badge: "Trending",
    description: "Deep dive into web application automation using Selenium WebDriver with Java. Design custom frameworks.",
    syllabus: [
      "Selenium Architecture & Installation",
      "Handling Dynamic Web Elements & Alerts",
      "Interacting with Dropdowns, Checkboxes, and Windows",
      "Hybrid & Data-Driven Automation Frameworks",
      "Reporting tools (Extent Reports / Allure Reports)",
      "Grid Execution & Parallel Testing"
    ],
    tools: ["Selenium", "Java", "Maven", "Eclipse"],
    trainers: ["Amol Shinde (9+ yrs exp)", "Pooja Mehta (7+ yrs exp)"],
    skillsCovered: ["Web Automation", "Xpath Writing", "Extent Reports", "Selenium Grid"]
  },
  {
    id: "api-testing",
    title: "API Testing with Postman & RestAssured",
    category: "API Testing",
    duration: "4 Weeks",
    fees: 10000,
    rating: 4.6,
    type: "Intermediate",
    placementSupport: "Yes",
    badge: "In Demand",
    description: "Learn manual API testing using Postman and backend automation using Java RestAssured library.",
    syllabus: [
      "API & HTTP Protocol Fundamentals (GET, POST, PUT, DELETE)",
      "Postman Collections, Environments, and Mock Servers",
      "API Assertions & Scripting in Postman",
      "RestAssured Framework Architecture in Java",
      "JSON/XML Schema Validation & Parsing Response",
      "Authentication mechanisms (OAuth, API Keys, Bearer Tokens)"
    ],
    tools: ["Postman", "RestAssured", "Jackson", "Newman"],
    trainers: ["Rohit Kadam (8+ yrs exp)", "Sagar Kulkarni (11+ yrs exp)"],
    skillsCovered: ["API Automation", "Postman Scripting", "JSON Schema Validation", "REST Endpoints Testing"]
  },
  {
    id: "performance-testing",
    title: "Performance Testing using JMeter",
    category: "Performance Testing",
    duration: "6 Weeks",
    fees: 15000,
    rating: 4.3,
    type: "Advanced",
    placementSupport: "Yes",
    badge: "Specialized",
    description: "Master load testing, stress testing, scalability, and performance monitoring of servers using Apache JMeter.",
    syllabus: [
      "Performance Testing Concepts & Metric Analysis",
      "JMeter Elements (Thread Group, Samplers, Listeners)",
      "Correlation & Parameterization Techniques",
      "Distributed load testing & Non-GUI execution",
      "Analyzing Performance Bottlenecks & Memory Leaks",
      "InfluxDB & Grafana dashboard integration"
    ],
    tools: ["JMeter", "Blazemeter", "Grafana", "AppDynamics"],
    trainers: ["Anant Joshi (14+ yrs exp)"],
    skillsCovered: ["Load Testing", "Stress Testing", "Bottleneck Analysis", "JMeter Scripting"]
  },
  {
    id: "mobile-testing",
    title: "Mobile App Testing with Appium",
    category: "Mobile Testing",
    duration: "5 Weeks",
    fees: 12000,
    rating: 4.1,
    type: "Intermediate",
    placementSupport: "Yes",
    badge: "New",
    description: "Automate Android and iOS native, hybrid, and mobile web applications using Appium WebDriver.",
    syllabus: [
      "Introduction to Mobile Testing & Appium Architecture",
      "Setting up Android SDK and Xcode iOS environments",
      "Locating Mobile Elements using Appium Inspector",
      "Automating Touch Gestures, Swipes, and Key Events",
      "Mobile Test Framework Design with TestNG",
      "Cloud Testing Platforms (BrowserStack, SauceLabs)"
    ],
    tools: ["Appium", "Android Studio", "Xcode", "BrowserStack"],
    trainers: ["Snehal Jadhav (7+ yrs exp)"],
    skillsCovered: ["Mobile Automation", "Appium Scripting", "Cross-Platform Mobile Testing"]
  },
  {
    id: "sql-for-testers",
    title: "SQL & Database Testing",
    category: "SQL For Testers",
    duration: "3 Weeks",
    fees: 6000,
    rating: 4.5,
    type: "Beginner",
    placementSupport: "Yes",
    badge: "Essential",
    description: "Comprehensive relational database training tailormade for testers, covering joins, subqueries, and data integrity checks.",
    syllabus: [
      "DBMS & RDBMS Concepts",
      "Writing SELECT Queries, Filters, and Aggregations",
      "Advanced Joins (INNER, LEFT, RIGHT, FULL) & Subqueries",
      "Data Manipulation Language (DML) - INSERT, UPDATE, DELETE",
      "Database Testing Strategies & ETL testing basics",
      "Writing SQL Assertions in Automation Frameworks"
    ],
    tools: ["PostgreSQL", "MySQL", "DBeaver", "SQL Developer"],
    trainers: ["Ramesh More (6+ yrs exp)"],
    skillsCovered: ["Database Verification", "Query Optimization", "Joins & Subqueries", "Data Integrity Testing"]
  },
  {
    id: "istqb-certification",
    title: "ISTQB Certified Tester Prep Course",
    category: "ISTQB Certification",
    duration: "4 Weeks",
    fees: 10000,
    rating: 4.7,
    type: "Professional",
    placementSupport: "Yes",
    badge: "Global Standard",
    description: "Pass your ISTQB Certified Tester Foundation Level (CTFL) exam on the first attempt with mock exams and question reviews.",
    syllabus: [
      "Fundamentals of Testing & Seven Principles",
      "Testing Throughout the Software Development Lifecycle",
      "Static Testing Techniques (Walkthroughs & Inspections)",
      "Test Design Techniques (Equivalence Partitioning, State Transition)",
      "Test Management, Risk, and Defect Logging",
      "Tool Support for Testing & Final Mock Exams"
    ],
    tools: ["ISTQB Syllabus", "Mock Exam Engine"],
    trainers: ["Milind Kulkarni (16+ yrs exp, ISTQB Board Member)"],
    skillsCovered: ["ISTQB Terminology", "Global Testing Standards", "Exam Strategy", "Structured Testing Processes"]
  }
];

export const INSTITUTES = [
  {
    id: "sevenmentor",
    name: "SevenMentor",
    logo: "SM",
    description: "SevenMentor is a premier training provider in Pune, recognized for its modern learning hubs and classroom infrastructure. They focus on practical automation testing labs and live project modules.",
    rating: 4.4,
    reviewsCount: 312,
    placementRate: 88,
    studentsTrained: 8500,
    avgPackage: "4.5 LPA",
    highestPackage: "9.5 LPA",
    duration: "3 - 4 Months",
    feesRange: "₹18,000 - ₹35,000",
    locations: ["Shivaji Nagar", "FC Road", "Kharadi"],
    phone: "+91 97633 97633",
    email: "enquiry@sevenmentor.com",
    hiringPartners: ["TCS", "Infosys", "Wipro", "Tech Mahindra", "Capgemini", "LTI"],
    trainers: [
      { name: "Sanjay Patil", role: "Sr. Automation Architect", exp: "12 Years" },
      { name: "Neha Sharma", role: "Manual Testing Specialist", exp: "8 Years" }
    ],
    coursesOffered: ["manual-testing", "automation-testing", "selenium-testing", "sql-for-testers"],
    gallery: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80"
    ],
    testimonials: [
      {
        studentName: "Aditya Rane",
        course: "Automation Testing Masterclass",
        company: "Wipro",
        package: "5.2 LPA",
        text: "SevenMentor's labs in Shivaji Nagar are good, though finding parking in the evening can be a challenge. The trainer Sanjay was very patient in explaining Selenium framework design from scratch, which helped me clear my basic coding round."
      }
    ]
  },
  {
    id: "qspiders",
    name: "QSpiders Pune",
    logo: "QS",
    description: "QSpiders is India's largest software testing training ecosystem. Known for its extensive placement cell, QSpiders offers fully practical courses and multiple large branches in Pune.",
    rating: 4.6,
    reviewsCount: 584,
    placementRate: 91,
    studentsTrained: 18000,
    avgPackage: "4.8 LPA",
    highestPackage: "12.0 LPA",
    duration: "4 Months",
    feesRange: "₹25,000 - ₹40,000",
    locations: ["Deccan Gymkhana", "Hinjewadi", "Chinchwad"],
    phone: "+91 80505 80505",
    email: "pune@qspiders.com",
    hiringPartners: ["Cognizant", "Accenture", "Deloitte", "Atos Syntel", "Mindtree", "Capgemini"],
    trainers: [
      { name: "Vikram Aditya", role: "Principal Instructor", exp: "15 Years" },
      { name: "Ganesh K.", role: "Java Expert", exp: "10 Years" }
    ],
    coursesOffered: ["manual-testing", "automation-testing", "selenium-testing", "api-testing", "sql-for-testers"],
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
    ],
    testimonials: [
      {
        studentName: "Priyanka Joshi",
        course: "Selenium WebDriver Certification",
        company: "Cognizant",
        package: "6.0 LPA",
        text: "They host massive placement drives at Deccan. The batch strength was a bit high (around 60 students), but the instructors are highly skilled. I attended three drives and got placed at Cognizant after 25 days."
      }
    ]
  },
  {
    id: "testometer",
    name: "TestoMeter",
    logo: "TM",
    description: "TestoMeter focuses exclusively on core Software Testing specializations. They offer high-intensity bootcamps, personalized mentorship, and rigorous mock interviews aligned with ISTQB guidelines.",
    rating: 4.8,
    reviewsCount: 245,
    placementRate: 92,
    studentsTrained: 4200,
    avgPackage: "5.2 LPA",
    highestPackage: "11.0 LPA",
    duration: "2 - 3 Months",
    feesRange: "₹15,000 - ₹30,000",
    locations: ["Kothrud", "Online Live"],
    phone: "+91 99701 40019",
    email: "info@testometer.co.in",
    hiringPartners: ["Coforge", "Persistent Systems", "Symantec", "PTC", "Quick Heal", "Tietoevry"],
    trainers: [
      { name: "Kunal Deshmukh", role: "Technical Director", exp: "16 Years" },
      { name: "Ramesh More", role: "SQL & API Specialist", exp: "7 Years" }
    ],
    coursesOffered: ["manual-testing", "automation-testing", "api-testing", "performance-testing", "istqb-certification"],
    gallery: [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
    ],
    testimonials: [
      {
        studentName: "Siddharth Kale",
        course: "ISTQB Certified Tester Prep Course",
        company: "Persistent Systems",
        package: "5.8 LPA",
        text: "TestoMeter Kothrud has a solid focus on manual + api testing. They conducting mock interviews every Saturday, which was stressful but helped me identify my weak points in SQL. Placed at Persistent Systems."
      }
    ]
  },
  {
    id: "skillio",
    name: "Skillio",
    logo: "SK",
    description: "Skillio stands out for its digital-first learning model, industry-relevant curriculum, and strong startup connections. They place emphasis on API pipelines, CI/CD, and mobile testing tools.",
    rating: 4.1,
    reviewsCount: 174,
    placementRate: 81,
    studentsTrained: 3000,
    avgPackage: "4.2 LPA",
    highestPackage: "8.5 LPA",
    duration: "2.5 Months",
    feesRange: "₹20,000 - ₹32,000",
    locations: ["Viman Nagar"],
    phone: "+91 91588 56789",
    email: "hello@skillio.in",
    hiringPartners: ["Xento Systems", "Globant", "Zensar", "KPIT", "PTC", "Emtec"],
    trainers: [
      { name: "Snehal Jadhav", role: "Lead Mobile QA Trainer", exp: "8 Years" },
      { name: "Sagar Kulkarni", role: "DevOps & CI/CD Consultant", exp: "11 Years" }
    ],
    coursesOffered: ["automation-testing", "api-testing", "mobile-testing"],
    gallery: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
    ],
    testimonials: [
      {
        studentName: "Ananya Deshpande",
        course: "API Testing with Postman & RestAssured",
        company: "Globant",
        package: "4.8 LPA",
        text: "Good boutique setup in Viman Nagar. Course is very fast-paced, so you have to self-study a lot. Their API automation lab was highly helpful for cracking startup interviews."
      }
    ]
  },
  {
    id: "three-ri",
    name: "3RI Technologies",
    logo: "3R",
    description: "3RI Technologies has been a reliable IT training institute in Pune for over a decade. They offer job-oriented training in manual and automation testing with corporate trainers.",
    rating: 4.3,
    reviewsCount: 232,
    placementRate: 84,
    studentsTrained: 6000,
    avgPackage: "4.4 LPA",
    highestPackage: "9.0 LPA",
    duration: "3 Months",
    feesRange: "₹22,000 - ₹35,000",
    locations: ["Kothrud", "Pimple Saudagar"],
    phone: "+91 83084 85858",
    email: "info@3ritechnologies.com",
    hiringPartners: ["L&T Infotech", "Synechron", "Allscripts", "Cerner", "FIS", "Capgemini"],
    trainers: [
      { name: "Milind Kulkarni", role: "Core Testing Advisor", exp: "16 Years" },
      { name: "Rohit Kadam", role: "Lead Automation Engineer", exp: "9 Years" }
    ],
    coursesOffered: ["manual-testing", "automation-testing", "selenium-testing", "sql-for-testers"],
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    ],
    testimonials: [
      {
        studentName: "Rahul Shinde",
        course: "Automation Testing Masterclass",
        company: "Synechron",
        package: "5.0 LPA",
        text: "Average infrastructure at their Kothrud branch but the syllabus is very structured, covering real-time scenarios, framework building, and Git version control."
      }
    ]
  },
  {
    id: "cyber-success",
    name: "Cyber Success",
    logo: "CS",
    description: "Cyber Success focuses on bridging the gap between academic education and industry standards. Through active corporate partnerships, they provide placement opportunities in Pune.",
    rating: 4.5,
    reviewsCount: 385,
    placementRate: 89,
    studentsTrained: 7200,
    avgPackage: "4.6 LPA",
    highestPackage: "10.5 LPA",
    duration: "3 - 4 Months",
    feesRange: "₹24,000 - ₹38,000",
    locations: ["Deccan Gymkhana"],
    phone: "+91 99163 70929",
    email: "hello@cybersuccess.biz",
    hiringPartners: ["HCL Technologies", "Capgemini", "IBM", "Persistent", "Atos Syntel", "Vara United"],
    trainers: [
      { name: "Amol Shinde", role: "Senior Consultant", exp: "10 Years" },
      { name: "Pooja Mehta", role: "Selenium Trainer", exp: "8 Years" }
    ],
    coursesOffered: ["manual-testing", "automation-testing", "selenium-testing", "istqb-certification"],
    gallery: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
    ],
    testimonials: [
      {
        studentName: "Karan Johar",
        course: "Manual Testing",
        company: "HCL Technologies",
        package: "4.2 LPA",
        text: "Excellent guidance. The faculty took extra sessions for non-IT students to understand computer science basics first, which helped me catch up with programming."
      }
    ]
  },
  {
    id: "fusion",
    name: "Fusion Software Institute",
    logo: "FS",
    description: "Fusion Software Institute provides live-project training on Manual & Test Automation methodologies. They offer affordable lab facilities for freshers seeking corporate breakthroughs.",
    rating: 3.9,
    reviewsCount: 122,
    placementRate: 76,
    studentsTrained: 2800,
    avgPackage: "4.0 LPA",
    highestPackage: "8.0 LPA",
    duration: "3 Months",
    feesRange: "₹18,000 - ₹28,000",
    locations: ["Aundh"],
    phone: "+91 95455 33221",
    email: "info@fusioninstitute.in",
    hiringPartners: ["Zensar", "Fujitsu", "Systenics", "Hexaware", "Virtusa", "Mphasis"],
    trainers: [
      { name: "Anil G.", role: "QA Lead", exp: "9 Years" }
    ],
    coursesOffered: ["manual-testing", "automation-testing", "selenium-testing"],
    gallery: [],
    testimonials: [
      {
        studentName: "Mayur Patil",
        course: "Selenium WebDriver Certification",
        company: "Zensar",
        package: "4.5 LPA",
        text: "Affordable fees compared to larger brand names. The labs in Aundh are basic but the teaching staff is helpful."
      }
    ]
  },
  {
    id: "credence",
    name: "Credence IT",
    logo: "CR",
    description: "Credence IT is known for its project-based curriculum. Students work on database triggers, API requests, and load test scripts in local staging environments.",
    rating: 4.2,
    reviewsCount: 153,
    placementRate: 80,
    studentsTrained: 3200,
    avgPackage: "4.2 LPA",
    highestPackage: "9.0 LPA",
    duration: "3.5 Months",
    feesRange: "₹20,000 - ₹32,000",
    locations: ["Katraj"],
    phone: "+91 91586 12345",
    email: "admissions@credenceit.com",
    hiringPartners: ["Tata Technologies", "Cybage", "KPIT", "Neilsoft", "SECO", "Wipro"],
    trainers: [
      { name: "Swapnil S.", role: "QA Architect", exp: "11 Years" }
    ],
    coursesOffered: ["manual-testing", "automation-testing", "sql-for-testers"],
    gallery: [],
    testimonials: [
      {
        studentName: "Tejas Shinde",
        course: "SQL & Database Testing",
        company: "Cybage",
        package: "4.6 LPA",
        text: "The database testing module is exceptionally detailed. Working with complex Joins made database queries a breeze, though classes sometimes run late."
      }
    ]
  },
  {
    id: "lavatech",
    name: "Lavatech Technology",
    logo: "LT",
    description: "Lavatech Technology focusing on Python Automation and modern API integrations. Classes are conducted by active industry developers in small batches.",
    rating: 4.4,
    reviewsCount: 118,
    placementRate: 85,
    studentsTrained: 2100,
    avgPackage: "4.5 LPA",
    highestPackage: "8.8 LPA",
    duration: "2.5 Months",
    feesRange: "₹17,000 - ₹28,000",
    locations: ["Karve Nagar"],
    phone: "+91 98817 99999",
    email: "contact@lavatech.in",
    hiringPartners: ["Globant", "Zensar", "eClerx", "FIS Global", "Harbinger Group"],
    trainers: [
      { name: "Mohan Lal", role: "DevOps Engineer", exp: "10 Years" }
    ],
    coursesOffered: ["automation-testing", "selenium-testing", "api-testing"],
    gallery: [],
    testimonials: [
      {
        studentName: "Pranali Mane",
        course: "API Testing with Postman & RestAssured",
        company: "Zensar",
        package: "4.8 LPA",
        text: "Highly personalized attention. The batches are small (15-20 students), meaning your queries get solved immediately. Placed at Zensar after course completion."
      }
    ]
  },
  {
    id: "radical",
    name: "Radical Technologies",
    logo: "RT",
    description: "Radical Technologies is an established professional training institute offering diverse technical certifications, including automation, performance, and mobile QA.",
    rating: 4.0,
    reviewsCount: 265,
    placementRate: 78,
    studentsTrained: 5400,
    avgPackage: "4.1 LPA",
    highestPackage: "9.2 LPA",
    duration: "2 - 4 Months",
    feesRange: "₹22,000 - ₹40,000",
    locations: ["Aundh", "Kharadi"],
    phone: "+91 80552 23322",
    email: "aundh@radicaltechnologies.co.in",
    hiringPartners: ["Tech Mahindra", "Virtusa", "T-Systems", "Veritas", "Allscripts", "Accenture"],
    trainers: [
      { name: "Anant Joshi", role: "Performance Testing Lead", exp: "14 Years" }
    ],
    coursesOffered: ["automation-testing", "selenium-testing", "performance-testing", "istqb-certification"],
    gallery: [],
    testimonials: [
      {
        studentName: "Akash Thorat",
        course: "Performance Testing using JMeter",
        company: "T-Systems",
        package: "5.5 LPA",
        text: "The JMeter training covers real-time performance tracking topics. The batch scheduling was slightly unorganized, but the trainer's expertise made up for it."
      }
    ]
  }
];

export const PLACEMENTS = {
  highestPackage: "11.2 LPA",
  avgPackage: "4.6 LPA",
  studentsPlaced: "4,850+",
  activePartners: "72+",
  trends: [
    { year: "2022", placedCount: 680, avgSalary: 3.9 },
    { year: "2023", placedCount: 920, avgSalary: 4.2 },
    { year: "2024", placedCount: 1280, avgSalary: 4.5 },
    { year: "2025", placedCount: 1640, avgSalary: 4.9 }
  ],
  companyDemand: [
    { name: "Selenium Automation", demand: 92 },
    { name: "API & Postman", demand: 85 },
    { name: "Manual & Agile Testing", demand: 75 },
    { name: "Database Testing SQL", demand: 68 },
    { name: "Mobile QA Appium", demand: 62 },
    { name: "Performance JMeter", demand: 55 }
  ],
  monthlyLeads: [
    { month: "Jan", enquiries: 120, leads: 95 },
    { month: "Feb", enquiries: 150, leads: 120 },
    { month: "Mar", enquiries: 210, leads: 180 },
    { month: "Apr", enquiries: 340, leads: 290 },
    { month: "May", enquiries: 410, leads: 360 }
  ],
  recentSuccessStories: [
    {
      name: "Rohit Deshmukh",
      course: "Automation Masterclass",
      from: "QSpiders Pune",
      to: "Cognizant",
      package: "6.5 LPA",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Shweta Kulkarni",
      course: "Manual & API Testing",
      from: "TestoMeter",
      to: "Persistent Systems",
      package: "5.8 LPA",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Pratik Kamble",
      course: "Performance & JMeter",
      from: "SevenMentor",
      to: "Wipro",
      package: "5.5 LPA",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ]
};

export const BLOGS = [
  {
    id: "selenium-v4-features",
    title: "Key Features of Selenium v4 Every Tester Must Know",
    category: "Selenium",
    excerpt: "Selenium 4 introduces relative locators, native Chrome Debugging Protocol integration, and an upgraded grid system. Learn how to leverage them.",
    content: "Selenium 4 has brought major architectural updates, including W3C Standardization which ensures direct communication with web browsers without using JSON Wire Protocol. Relative Locators make it easier to locate sibling components, and CDP (Chrome DevTools Protocol) integration allows network traffic simulation, mock locations, and console logs analysis directly.",
    date: "May 15, 2026",
    readTime: "5 Min Read",
    author: "Kunal Deshmukh",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "api-testing-essential-guide",
    title: "API Testing Checklist: Postman to RestAssured Automation",
    category: "API Testing",
    excerpt: "Automating API responses helps save QA time. Here is the step-by-step checklist to migrate your Postman tests into a RestAssured framework.",
    content: "API testing is critical for headless system integrations. While Postman is outstanding for manual and collections execution, RestAssured helps software companies bundle checks into Maven workflows. Start by validating JSON schemas, verify response headers, test boundary payloads, and verify status codes using test assertions.",
    date: "April 28, 2026",
    readTime: "7 Min Read",
    author: "Ramesh More",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "manual-testing-dead-or-alive",
    title: "Is Manual Testing Dead? The QA Role in 2026",
    category: "Career Guidance",
    excerpt: "With AI taking over script-writing, many wonder if manual testers have a future. We explore exploratory testing and usability insights.",
    content: "Automation handles repetitive checks, but logic and visual design require human judgment. AI helps write tests, but exploratory testing, localization testing, user experience evaluation, and domain business rules testing still rely heavily on expert manual QAs. Upgrading your skill set with API verification and basic SQL operations makes you irreplaceable.",
    date: "March 12, 2026",
    readTime: "4 Min Read",
    author: "Sanjay Patil",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
  }
];

export const FAQS = [
  {
    q: "Which Software Testing Course is best for Freshers?",
    a: "For freshers, an Integrated Automation Testing Course (Manual + Java/Python + Selenium + API Testing) is highly recommended. It covers all core competencies required in job postings."
  },
  {
    q: "What is the average starting salary for a QA Engineer in Pune?",
    a: "A fresher software tester in Pune can expect a salary package ranging between ₹3.0 LPA to ₹5.5 LPA, depending on their skills and the training institute's placement network."
  },
  {
    q: "Is coding mandatory for Automation Testing?",
    a: "Yes, basic programming knowledge is required for automation tools like Selenium or Appium. The most popular languages are Java and Python, which are taught from scratch in most Pune institutes."
  },
  {
    q: "Can non-IT graduates join testing courses?",
    a: "Absolutely! Over 40% of enrolled students in Pune's software testing institutes come from non-CS/IT backgrounds. Manual testing is logical and easy to learn, and programming basics are built step-by-step."
  }
];
