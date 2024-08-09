This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<!-- 
+ giữ phiên cho người dùng
+ điền sẵn thông tin từ onboarding sang register form
+  hiện những appointment đã đặt
+ các đơn mới ko hiện lên dù fresh (chỉ có set status nó mới lấy dữ liệu mới)
+ khi mất token access phải redirect admin lại homepage
+ recovery code twilio: 7GTD7ZAEMRE8NPPP4YC7XZSY 
 -->

<!-- feature of sentry
+ monitor the bugs as they happen and fix them immediately 
+ and of course after that we'll also add support for SMS
+ tracking the errors in the application and tracking the traces and
 -->

<!-- 1/8/2024
    name: CareSmart | SMART (S: schedule, M: medical, A: app, TR: trí)

    package: 
    + npx create-next-app@latest
    + npm i clsx tailwind-merge
    + npm i tailwindcss-animate
    + npx shadcn-ui@latest init
    + npx shadcn-ui@latest add button
    + npm install next-themes
    + npx shadcn-ui@latest add form
    + npx shadcn-ui@latest add input
    + npm install react-phone-number-input --save
    + npm install node-appwrite
    + npx shadcn-ui@latest add radio-group
    + npx shadcn-ui@latest add select
    + npm i react-datepicker
    + npm install --save react-dropzone
    + npx shadcn-ui@latest add checkbox

    + npx shadcn-ui@latest add alert-dialog
    + npx shadcn-ui@latest add input-otp
    + npx shadcn-ui@latest add table
    + npm install @tanstack/react-table
    + npx shadcn-ui@latest add dropdown-menu
    + npx shadcn-ui@latest add dialog

    + npx @sentry/wizard@latest -i nextjs



    Responsibilities:
        frontend:
    + sử dụng react-hook-form & shacd (tạo form validate)
    
    + reuseable components (CustomFormField, )
    + phone number input (react-phone-number-input)
    + feature: admin passcode verification ()   

        Backend:
    +




    techstack:
    + sentry
    + appwrite
    + shacd/ui
    + nextjs/reactjs/Typescript
    + TailwindCSS
    + Twilio

 -->