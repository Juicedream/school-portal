# Complete School Portal Development Guide

## Project Overview
A comprehensive school management system with three main user roles: Students, Teachers, and Principal (Admin).

## Tech Stack Recommendation

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/UI** for components
- **React Hook Form** for form handling
- **Zustand** for state management
- **React Query/TanStack Query** for data fetching

### Backend & Database
- **Next.js API Routes** for backend
- **PostgreSQL** with **Prisma ORM**
- **NextAuth.js** for authentication
- **Cloudinary** for file storage
- **Resend** for email notifications

### Payment Integration
- **Paystack** or **Flutterwave** for Nigerian payments

### Real-time Features
- **Pusher** or **Socket.io** for chat groups
- **React Query** for real-time updates

## Database Schema Design

### Core Tables

```prisma
// Users table (handles all user types)
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  firstName String
  lastName  String
  role      Role     @default(STUDENT)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  student   Student?
  teacher   Teacher?
  principal Principal?

  @@map("users")
}

enum Role {
  STUDENT
  TEACHER
  PRINCIPAL
}

// Student specific data
model Student {
  id           String    @id @default(uuid())
  userId       String    @unique
  admissionNo  String    @unique
  classId      String
  dateOfBirth  DateTime
  gender       Gender
  address      String
  phoneNumber  String
  guardianName String
  guardianPhone String
  compulsoryClubId String?
  electiveClubId   String?
  
  // Relations
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  class        Class     @relation(fields: [classId], references: [id])
  compulsoryClub Club?   @relation("CompulsoryClubMembers", fields: [compulsoryClubId], references: [id])
  electiveClub   Club?   @relation("ElectiveClubMembers", fields: [electiveClubId], references: [id])
  grades       Grade[]
  examSubmissions ExamSubmission[]
  payments     Payment[]
  groupMembers GroupMember[]

  @@map("students")
}

// Teacher specific data
model Teacher {
  id          String @id @default(uuid())
  userId      String @unique
  employeeId  String @unique
  classId     String? // Class teacher assignment
  phoneNumber String
  address     String
  salary      Decimal @default(0)
  isPaid      Boolean @default(false)
  lastPaidAt  DateTime?
  
  // Relations
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  assignedClass Class? @relation(fields: [classId], references: [id])
  subjects    TeacherSubject[]
  exams       Exam[]
  grades      Grade[]
  groupAdmins GroupAdmin[]

  @@map("teachers")
}

// Principal specific data
model Principal {
  id     String @id @default(uuid())
  userId String @unique
  
  // Relations
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("principals")
}

// Classes (JSS1 to SS3)
model Class {
  id       String @id @default(uuid())
  name     String @unique // JSS1, JSS2, JSS3, SS1, SS2, SS3
  level    ClassLevel
  capacity Int    @default(50)
  
  // Relations
  students Student[]
  teacher  Teacher[]
  subjects ClassSubject[]
  exams    Exam[]
  groups   Group[]

  @@map("classes")
}

enum ClassLevel {
  JSS1
  JSS2
  JSS3
  SS1
  SS2
  SS3
}

enum Gender {
  MALE
  FEMALE
}

// Subjects
model Subject {
  id          String @id @default(uuid())
  name        String @unique
  code        String @unique
  description String?
  
  // Relations
  teachers    TeacherSubject[]
  classes     ClassSubject[]
  exams       Exam[]
  grades      Grade[]

  @@map("subjects")
}

// Many-to-many: Teacher-Subject
model TeacherSubject {
  id        String @id @default(uuid())
  teacherId String
  subjectId String
  
  teacher   Teacher @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  subject   Subject @relation(fields: [subjectId], references: [id], onDelete: Cascade)

  @@unique([teacherId, subjectId])
  @@map("teacher_subjects")
}

// Many-to-many: Class-Subject
model ClassSubject {
  id        String @id @default(uuid())
  classId   String
  subjectId String
  
  class     Class   @relation(fields: [classId], references: [id], onDelete: Cascade)
  subject   Subject @relation(fields: [subjectId], references: [id], onDelete: Cascade)

  @@unique([classId, subjectId])
  @@map("class_subjects")
}

// Clubs
model Club {
  id             String    @id @default(uuid())
  name           String    @unique
  type           ClubType
  description    String?
  subscriptionFee Decimal  @default(0)
  term           Term
  
  // Relations
  compulsoryMembers Student[] @relation("CompulsoryClubMembers")
  electiveMembers   Student[] @relation("ElectiveClubMembers")

  @@map("clubs")
}

enum ClubType {
  COMPULSORY
  ELECTIVE
}

enum Term {
  FIRST
  SECOND
  THIRD
}

// Exams and Tests
model Exam {
  id          String     @id @default(uuid())
  title       String
  type        ExamType
  subjectId   String
  classId     String
  teacherId   String
  totalMarks  Int        @default(100)
  duration    Int        // in minutes
  scheduledAt DateTime
  isPublished Boolean    @default(false)
  term        Term
  session     String     // e.g., "2023/2024"
  
  // Relations
  subject     Subject    @relation(fields: [subjectId], references: [id])
  class       Class      @relation(fields: [classId], references: [id])
  teacher     Teacher    @relation(fields: [teacherId], references: [id])
  questions   Question[]
  submissions ExamSubmission[]
  grades      Grade[]

  @@map("exams")
}

enum ExamType {
  TEST
  EXAM
}

// Exam Questions
model Question {
  id       String        @id @default(uuid())
  examId   String
  question String
  type     QuestionType
  options  Json?         // For multiple choice
  answer   String        // Correct answer
  marks    Int           @default(1)
  order    Int

  // Relations
  exam     Exam          @relation(fields: [examId], references: [id], onDelete: Cascade)

  @@map("questions")
}

enum QuestionType {
  MULTIPLE_CHOICE
  TRUE_FALSE
  SHORT_ANSWER
  ESSAY
}

// Student Exam Submissions
model ExamSubmission {
  id        String   @id @default(uuid())
  examId    String
  studentId String
  answers   Json     // Store all answers
  score     Int?     // Auto-calculated score
  isGraded  Boolean  @default(false)
  submittedAt DateTime @default(now())
  
  // Relations
  exam      Exam     @relation(fields: [examId], references: [id])
  student   Student  @relation(fields: [studentId], references: [id])

  @@unique([examId, studentId])
  @@map("exam_submissions")
}

// Grades
model Grade {
  id         String      @id @default(uuid())
  studentId  String
  subjectId  String
  examId     String
  teacherId  String
  score      Int
  totalMarks Int
  percentage Decimal
  grade      String      // A, B, C, D, F
  remark     String?
  term       Term
  session    String
  isApproved Boolean     @default(false)
  isReleased Boolean     @default(false)
  createdAt  DateTime    @default(now())
  
  // Relations
  student    Student     @relation(fields: [studentId], references: [id])
  subject    Subject     @relation(fields: [subjectId], references: [id])
  exam       Exam        @relation(fields: [examId], references: [id])
  teacher    Teacher     @relation(fields: [teacherId], references: [id])

  @@unique([studentId, subjectId, examId])
  @@map("grades")
}

// Payments
model Payment {
  id          String      @id @default(uuid())
  studentId   String
  type        PaymentType
  amount      Decimal
  description String
  term        Term
  session     String
  status      PaymentStatus @default(PENDING)
  reference   String      @unique // Payment gateway reference
  receiptUrl  String?     // Generated receipt URL
  paidAt      DateTime?
  createdAt   DateTime    @default(now())
  
  // Relations
  student     Student     @relation(fields: [studentId], references: [id])

  @@map("payments")
}

enum PaymentType {
  SCHOOL_FEES
  CLUB_FEES
  EXAM_FEES
  OTHER
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

// Class Groups (Chat Groups)
model Group {
  id        String   @id @default(uuid())
  classId   String   @unique
  name      String
  createdAt DateTime @default(now())
  
  // Relations
  class     Class         @relation(fields: [classId], references: [id])
  members   GroupMember[]
  admins    GroupAdmin[]
  messages  GroupMessage[]

  @@map("groups")
}

// Group Members
model GroupMember {
  id        String   @id @default(uuid())
  groupId   String
  studentId String
  joinedAt  DateTime @default(now())
  
  // Relations
  group     Group    @relation(fields: [groupId], references: [id], onDelete: Cascade)
  student   Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)

  @@unique([groupId, studentId])
  @@map("group_members")
}

// Group Admins (Teachers and Principal)
model GroupAdmin {
  id        String   @id @default(uuid())
  groupId   String
  teacherId String
  role      AdminRole @default(MODERATOR)
  addedAt   DateTime @default(now())
  
  // Relations
  group     Group    @relation(fields: [groupId], references: [id], onDelete: Cascade)
  teacher   Teacher  @relation(fields: [teacherId], references: [id], onDelete: Cascade)

  @@unique([groupId, teacherId])
  @@map("group_admins")
}

enum AdminRole {
  SUPER_ADMIN // Principal
  MODERATOR   // Class Teacher
}

// Group Messages
model GroupMessage {
  id        String   @id @default(uuid())
  groupId   String
  senderId  String   // User ID
  message   String
  type      MessageType @default(TEXT)
  fileUrl   String?
  sentAt    DateTime @default(now())
  
  // Relations
  group     Group    @relation(fields: [groupId], references: [id], onDelete: Cascade)

  @@map("group_messages")
}

enum MessageType {
  TEXT
  FILE
  IMAGE
  ANNOUNCEMENT
}

// Notifications
model Notification {
  id        String           @id @default(uuid())
  userId    String
  title     String
  message   String
  type      NotificationType
  isRead    Boolean          @default(false)
  data      Json?            // Additional data
  createdAt DateTime         @default(now())

  @@map("notifications")
}

enum NotificationType {
  EXAM_SCHEDULED
  GRADE_RELEASED
  PAYMENT_DUE
  PAYMENT_RECEIVED
  CLUB_ANNOUNCEMENT
  GENERAL
}
```

## Project Structure

```
school-portal/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── student/
│   │   │   ├── teacher/
│   │   │   └── admin/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── students/
│   │   │   ├── teachers/
│   │   │   ├── exams/
│   │   │   ├── grades/
│   │   │   ├── payments/
│   │   │   └── groups/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   ├── dashboards/
│   │   └── shared/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   ├── hooks/
│   ├── store/
│   └── types/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── package.json
└── next.config.js
```

## Implementation Steps

### Phase 1: Setup & Authentication (Week 1-2)

1. **Initialize Project**
```bash
npx create-next-app@latest school-portal --typescript --tailwind --eslint --app
cd school-portal
npm install prisma @prisma/client next-auth bcryptjs @types/bcryptjs
npm install @hookform/resolvers react-hook-form zod
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

2. **Setup Database**
- Create PostgreSQL database
- Configure Prisma schema
- Run migrations

3. **Implement Authentication**
- NextAuth.js configuration
- Login/Register pages
- Role-based access control

### Phase 2: Core User Management (Week 3-4)

1. **Admin Dashboard**
- Student registration
- Teacher registration
- User management interface

2. **User Dashboards**
- Student dashboard layout
- Teacher dashboard layout
- Admin dashboard layout

### Phase 3: Academic Management (Week 5-7)

1. **Class & Subject Management**
- Create classes (JSS1-SS3)
- Create subjects
- Assign teachers to classes/subjects

2. **Exam System**
- Create exams/tests
- Question management
- Auto-grading system
- Grade submission & approval

### Phase 4: Financial Management (Week 8-9)

1. **Payment System**
- Integration with Paystack/Flutterwave
- Fee management
- Receipt generation
- Teacher salary system

2. **Club Management**
- Create clubs
- Subscription system
- Student enrollment

### Phase 5: Communication & Reports (Week 10-11)

1. **Group Chat System**
- Real-time messaging
- File sharing
- Announcement system

2. **Report Generation**
- Student report cards
- Grade transcripts
- Promotion status

### Phase 6: Notifications & Polish (Week 12)

1. **Notification System**
- Email notifications
- In-app notifications
- Exam scheduling alerts

2. **UI/UX Polish**
- Responsive design
- Performance optimization
- Testing

## Key Features Implementation

### Authentication System
```typescript
// lib/auth.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            student: true,
            teacher: true,
            principal: true
          }
        })
        
        if (!user || !await bcrypt.compare(credentials.password, user.password)) {
          return null
        }
        
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: `${user.firstName} ${user.lastName}`
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user.role = token.role
      return session
    }
  }
}
```

### Role-based Access Control
```typescript
// lib/auth-guards.ts
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { redirect } from 'next/navigation'

export async function requireAuth(allowedRoles?: string[]) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    redirect('/unauthorized')
  }
  
  return session
}
```

### Exam Auto-Grading System
```typescript
// lib/grading.ts
export function calculateScore(questions: Question[], answers: Record<string, string>) {
  let totalScore = 0
  let maxScore = 0
  
  questions.forEach(question => {
    maxScore += question.marks
    const studentAnswer = answers[question.id]
    
    if (question.type === 'MULTIPLE_CHOICE' || question.type === 'TRUE_FALSE') {
      if (studentAnswer === question.answer) {
        totalScore += question.marks
      }
    }
    // Add logic for other question types
  })
  
  return {
    score: totalScore,
    totalMarks: maxScore,
    percentage: (totalScore / maxScore) * 100
  }
}
```

### Payment Integration (Paystack)
```typescript
// lib/payments.ts
export async function initializePayment(studentId: string, amount: number, type: PaymentType) {
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: student.user.email,
      amount: amount * 100, // Convert to kobo
      callback_url: `${process.env.NEXTAUTH_URL}/api/payments/verify`,
      metadata: {
        studentId,
        type
      }
    })
  })
  
  return response.json()
}
```

## Development Timeline (12 Weeks)

### Weeks 1-2: Foundation
- Project setup
- Database design
- Authentication system

### Weeks 3-4: User Management
- Registration systems
- Dashboard layouts
- User profiles

### Weeks 5-7: Academic Features
- Class/subject management
- Exam system
- Grading system

### Weeks 8-9: Financial System
- Payment integration
- Fee management
- Club subscriptions

### Weeks 10-11: Communication
- Group chat system
- Report generation
- Notifications

### Week 12: Polish & Deploy
- Testing
- Performance optimization
- Deployment

## Deployment Recommendations

### Database
- **Railway** or **Supabase** for PostgreSQL
- **PlanetScale** for MySQL alternative

### Hosting
- **Vercel** (recommended for Next.js)
- **Netlify** alternative

### File Storage
- **Cloudinary** for images/documents
- **AWS S3** alternative

### Email Service
- **Resend** for transactional emails
- **SendGrid** alternative

## Budget Estimation

### Development (if hiring)
- Frontend Developer: ₦800,000 - ₦1,200,000
- Backend Developer: ₦800,000 - ₦1,200,000
- UI/UX Designer: ₦400,000 - ₦600,000

### Monthly Running Costs
- Database hosting: ₦10,000 - ₦30,000
- App hosting: ₦0 - ₦20,000 (Vercel has generous free tier)
- File storage: ₦5,000 - ₦15,000
- Email service: ₦3,000 - ₦10,000
- Payment processing: 1.5% + ₦100 per transaction

### Total Monthly: ₦18,000 - ₦75,000

## Security Considerations

1. **Data Protection**
- Hash all passwords
- Input validation
- SQL injection prevention
- XSS protection

2. **Access Control**
- Role-based permissions
- API route protection
- Session management

3. **Payment Security**
- Never store card details
- Use HTTPS only
- Webhook verification

## Next Steps

1. **Start with Phase 1** - Get authentication working
2. **Create MVP** - Focus on core features first
3. **Test Early** - Get feedback from real users
4. **Iterate** - Add features based on user needs
5. **Scale** - Optimize for performance as you grow

This is a comprehensive system that will take time to build properly. Start with the core features and gradually add more advanced functionality. The key is to build something that works well for the basic use cases first, then expand.