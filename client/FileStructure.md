## Client Side Folder Structure

```bash
-- client
    |-- .env.local
    |-- .eslintrc.json
    |-- .gitignore
    |-- README.md
    |-- next-env.d.ts
    |-- next.config.js
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json
    |-- api
    |   |-- auth.api.tsx
    |   |-- post.api.tsx
    |   |-- user.api.tsx
    |-- components
    |   |-- Advertisements
    |   |   |-- AdvertWidget.tsx
    |   |-- Connections
    |   |   |-- index.tsx
    |   |   |-- ConnectionList
    |   |       |-- index.tsx
    |   |-- Form
    |   |   |-- index.tsx
    |   |   |-- Login
    |   |   |   |-- index.tsx
    |   |   |   |-- userLoginSchema.ts
    |   |   |-- Register
    |   |   |   |-- index.tsx
    |   |   |   |-- userRegistrationSchema.ts
    |   |   |-- components
    |   |       |-- Dropzone
    |   |       |   |-- index.tsx
    |   |       |-- FormLink
    |   |           |-- index.tsx
    |   |-- Post
    |   |   |-- PostWidget.tsx
    |   |   |-- PostsWidget.tsx
    |   |   |-- UserPostWidget.tsx
    |   |   |-- PostDropzone
    |   |       |-- index.tsx
    |   |-- UI
    |   |   |-- ConnectionIcon.tsx
    |   |   |-- FlexBetween.tsx
    |   |   |-- FormButton.tsx
    |   |   |-- ImageIcon.tsx
    |   |   |-- Loading.tsx
    |   |   |-- Toast.tsx
    |   |-- User
    |   |   |-- UserImage.tsx
    |   |   |-- UserWidget.tsx
    |   |-- Wrappers
    |       |-- FormWrapper.tsx
    |       |-- IconWrapper.tsx
    |       |-- WidgetWrapper.tsx
    |       |-- HomepageWrappers
    |           |-- HomepageWrapper.tsx
    |           |-- LeftSectionWrapper.tsx
    |           |-- MiddleSectionWrapper.tsx
    |-- layout
    |   |-- HomePageLayout.tsx
    |   |-- Header
    |       |-- index.tsx
    |       |-- DesktopNav
    |       |   |-- index.tsx
    |       |-- Logo
    |       |   |-- index.tsx
    |       |-- MenuButton
    |       |   |-- index.tsx
    |       |-- MobileNav
    |       |   |-- index.tsx
    |       |-- NavIcons
    |       |   |-- index.tsx
    |       |-- NavbarForm
    |       |   |-- index.tsx
    |       |   |-- NavProgress
    |       |       |-- index.tsx
    |       |-- Search
    |       |   |-- index.tsx
    |       |   |-- InputListenerIcon
    |       |       |-- index.tsx
    |       |-- SwitchMode
    |           |-- index.tsx
    |-- pages
    |   |-- _app.tsx
    |   |-- _document.tsx
    |   |-- index.tsx
    |   |-- auth
    |   |   |-- index.tsx
    |   |-- profile
    |       |-- [userId].tsx
    |-- public
    |   |-- favicon.ico
    |-- state
    |   |-- index.tsx
    |   |-- auth
    |       |-- index.tsx
    |-- styles
    |   |-- Home.module.css
    |   |-- globals.css
    |-- themes
    |   |-- theme.tsx
    |-- types
        |-- mui.d.ts
        |-- state.types.ts
```
