
```
smart-campus-portal
├─ backend
│  ├─ .env
│  ├─ config
│  │  └─ db.js
│  ├─ controllers
│  │  └─ authController.js
│  ├─ middleware
│  │  ├─ authMiddleware.js
│  │  └─ roleMiddleware.js
│  ├─ models
│  │  ├─ AttendanceModel.js
│  │  ├─ FeesModel.js
│  │  ├─ LandingPage.js
│  │  ├─ NoticesModel.js
│  │  └─ UsersModel.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ attendanceRoutes.js
│  │  ├─ feesRoutes.js
│  │  ├─ landingPageRoutes.js
│  │  ├─ noticesRoutes.js
│  │  └─ usersRoutes.js
│  ├─ server.js
│  └─ utils
│     ├─ errorHandler.js
│     └─ generateToken.js
└─ frontend
   ├─ .next
   │  ├─ dev
   │  │  ├─ build
   │  │  │  ├─ chunks
   │  │  │  │  ├─ [root-of-the-server]__51225daf._.js
   │  │  │  │  ├─ [root-of-the-server]__51225daf._.js.map
   │  │  │  │  ├─ [root-of-the-server]__974941ed._.js
   │  │  │  │  ├─ [root-of-the-server]__974941ed._.js.map
   │  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_7180740f._.js
   │  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_7180740f._.js.map
   │  │  │  │  ├─ [turbopack]_runtime.js
   │  │  │  │  └─ [turbopack]_runtime.js.map
   │  │  │  ├─ package.json
   │  │  │  ├─ postcss.js
   │  │  │  └─ postcss.js.map
   │  │  ├─ build-manifest.json
   │  │  ├─ cache
   │  │  │  ├─ .rscinfo
   │  │  │  ├─ chrome-devtools-workspace-uuid
   │  │  │  └─ next-devtools-config.json
   │  │  ├─ fallback-build-manifest.json
   │  │  ├─ lock
   │  │  ├─ logs
   │  │  │  └─ next-development.log
   │  │  ├─ package.json
   │  │  ├─ prerender-manifest.json
   │  │  ├─ routes-manifest.json
   │  │  ├─ server
   │  │  │  ├─ app
   │  │  │  │  ├─ admin
   │  │  │  │  │  ├─ landing
   │  │  │  │  │  │  ├─ page
   │  │  │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  │  │  ├─ page.js
   │  │  │  │  │  │  ├─ page.js.map
   │  │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  │  ├─ page
   │  │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  ├─ page.js.map
   │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  ├─ dashboards
   │  │  │  │  │  ├─ admin
   │  │  │  │  │  │  ├─ page
   │  │  │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  │  │  ├─ page.js
   │  │  │  │  │  │  ├─ page.js.map
   │  │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  │  ├─ faculty
   │  │  │  │  │  │  ├─ page
   │  │  │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  │  │  ├─ page.js
   │  │  │  │  │  │  ├─ page.js.map
   │  │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  │  ├─ monitor
   │  │  │  │  │  │  ├─ page
   │  │  │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  │  │  ├─ page.js
   │  │  │  │  │  │  ├─ page.js.map
   │  │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  │  └─ student
   │  │  │  │  │     ├─ page
   │  │  │  │  │     │  ├─ app-paths-manifest.json
   │  │  │  │  │     │  ├─ build-manifest.json
   │  │  │  │  │     │  ├─ next-font-manifest.json
   │  │  │  │  │     │  ├─ react-loadable-manifest.json
   │  │  │  │  │     │  └─ server-reference-manifest.json
   │  │  │  │  │     ├─ page.js
   │  │  │  │  │     ├─ page.js.map
   │  │  │  │  │     └─ page_client-reference-manifest.js
   │  │  │  │  ├─ login
   │  │  │  │  │  ├─ page
   │  │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  ├─ page.js.map
   │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  ├─ page
   │  │  │  │  │  ├─ app-paths-manifest.json
   │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  ├─ react-loadable-manifest.json
   │  │  │  │  │  └─ server-reference-manifest.json
   │  │  │  │  ├─ page.js
   │  │  │  │  ├─ page.js.map
   │  │  │  │  ├─ page_client-reference-manifest.js
   │  │  │  │  └─ _not-found
   │  │  │  │     ├─ page
   │  │  │  │     │  ├─ app-paths-manifest.json
   │  │  │  │     │  ├─ build-manifest.json
   │  │  │  │     │  ├─ next-font-manifest.json
   │  │  │  │     │  ├─ react-loadable-manifest.json
   │  │  │  │     │  └─ server-reference-manifest.json
   │  │  │  │     ├─ page.js
   │  │  │  │     ├─ page.js.map
   │  │  │  │     └─ page_client-reference-manifest.js
   │  │  │  ├─ app-paths-manifest.json
   │  │  │  ├─ chunks
   │  │  │  │  └─ ssr
   │  │  │  │     ├─ app_00fa20cc._.js
   │  │  │  │     ├─ app_00fa20cc._.js.map
   │  │  │  │     ├─ app_6e91bd3e._.js
   │  │  │  │     ├─ app_6e91bd3e._.js.map
   │  │  │  │     ├─ app_admin_landing_page_e765e846.js
   │  │  │  │     ├─ app_admin_landing_page_e765e846.js.map
   │  │  │  │     ├─ app_b9b1292a._.js
   │  │  │  │     ├─ app_b9b1292a._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_01027190._.js
   │  │  │  │     ├─ app_dashboards_admin_components_01027190._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_0453b3b8._.js
   │  │  │  │     ├─ app_dashboards_admin_components_0453b3b8._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_13a0b7e5._.js
   │  │  │  │     ├─ app_dashboards_admin_components_13a0b7e5._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_1581def5._.js
   │  │  │  │     ├─ app_dashboards_admin_components_1581def5._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_158b89c9._.js
   │  │  │  │     ├─ app_dashboards_admin_components_158b89c9._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_1749f98d._.js
   │  │  │  │     ├─ app_dashboards_admin_components_1749f98d._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_3b0d9894._.js
   │  │  │  │     ├─ app_dashboards_admin_components_3b0d9894._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_44a585d0._.js
   │  │  │  │     ├─ app_dashboards_admin_components_44a585d0._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_44da5e1b._.js
   │  │  │  │     ├─ app_dashboards_admin_components_44da5e1b._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_4c254972._.js
   │  │  │  │     ├─ app_dashboards_admin_components_4c254972._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_57f65040._.js
   │  │  │  │     ├─ app_dashboards_admin_components_57f65040._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_5954e4fb._.js
   │  │  │  │     ├─ app_dashboards_admin_components_5954e4fb._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_74b75d73._.js
   │  │  │  │     ├─ app_dashboards_admin_components_74b75d73._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_84278a01._.js
   │  │  │  │     ├─ app_dashboards_admin_components_84278a01._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_851414df._.js
   │  │  │  │     ├─ app_dashboards_admin_components_851414df._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_8d58344e._.js
   │  │  │  │     ├─ app_dashboards_admin_components_8d58344e._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_914ec519._.js
   │  │  │  │     ├─ app_dashboards_admin_components_914ec519._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_973c7a7d._.js
   │  │  │  │     ├─ app_dashboards_admin_components_973c7a7d._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_9bf87c9d._.js
   │  │  │  │     ├─ app_dashboards_admin_components_9bf87c9d._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_9f59a440._.js
   │  │  │  │     ├─ app_dashboards_admin_components_9f59a440._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_a8d316a6._.js
   │  │  │  │     ├─ app_dashboards_admin_components_a8d316a6._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_AccountSettings_006691dc.js
   │  │  │  │     ├─ app_dashboards_admin_components_AccountSettings_006691dc.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_afdc7f92._.js
   │  │  │  │     ├─ app_dashboards_admin_components_afdc7f92._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_Attendance_1a5af77e.js
   │  │  │  │     ├─ app_dashboards_admin_components_Attendance_1a5af77e.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_Attendance_1df645a5.js
   │  │  │  │     ├─ app_dashboards_admin_components_Attendance_1df645a5.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_b8d524cb._.js
   │  │  │  │     ├─ app_dashboards_admin_components_b8d524cb._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_ba7a091f._.js
   │  │  │  │     ├─ app_dashboards_admin_components_ba7a091f._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_caea0f10._.js
   │  │  │  │     ├─ app_dashboards_admin_components_caea0f10._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_Chat_b2e1d49e.js
   │  │  │  │     ├─ app_dashboards_admin_components_Chat_b2e1d49e.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_DashboardHome_601424c8.js
   │  │  │  │     ├─ app_dashboards_admin_components_DashboardHome_601424c8.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_eb935e51._.js
   │  │  │  │     ├─ app_dashboards_admin_components_eb935e51._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_f1d5a383._.js
   │  │  │  │     ├─ app_dashboards_admin_components_f1d5a383._.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_Fees_79e46467.js
   │  │  │  │     ├─ app_dashboards_admin_components_Fees_79e46467.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_LandingSettings_1edf78fb.js
   │  │  │  │     ├─ app_dashboards_admin_components_LandingSettings_1edf78fb.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_Notices_da9e58f9.js
   │  │  │  │     ├─ app_dashboards_admin_components_Notices_da9e58f9.js.map
   │  │  │  │     ├─ app_dashboards_admin_components_UsersManager_552bc791.js
   │  │  │  │     ├─ app_dashboards_admin_components_UsersManager_552bc791.js.map
   │  │  │  │     ├─ app_dashboards_admin_page_d070f2aa.js
   │  │  │  │     ├─ app_dashboards_admin_page_d070f2aa.js.map
   │  │  │  │     ├─ app_e13eb882._.js
   │  │  │  │     ├─ app_e13eb882._.js.map
   │  │  │  │     ├─ app_layout_5a7e0b9f.js
   │  │  │  │     ├─ app_layout_5a7e0b9f.js.map
   │  │  │  │     ├─ app_login_page_18b3409a.js
   │  │  │  │     ├─ app_login_page_18b3409a.js.map
   │  │  │  │     ├─ app_page_b06da40b.js
   │  │  │  │     ├─ app_page_b06da40b.js.map
   │  │  │  │     ├─ [externals]_next_dist_compiled_next-server_app-page-turbo_runtime_dev_062c5159.js
   │  │  │  │     ├─ [externals]_next_dist_compiled_next-server_app-page-turbo_runtime_dev_062c5159.js.map
   │  │  │  │     ├─ [externals]_next_dist_shared_lib_no-fallback-error_external_59b92b38.js
   │  │  │  │     ├─ [externals]_next_dist_shared_lib_no-fallback-error_external_59b92b38.js.map
   │  │  │  │     ├─ [root-of-the-server]__11cd032d._.js
   │  │  │  │     ├─ [root-of-the-server]__11cd032d._.js.map
   │  │  │  │     ├─ [root-of-the-server]__11d70b3c._.js
   │  │  │  │     ├─ [root-of-the-server]__11d70b3c._.js.map
   │  │  │  │     ├─ [root-of-the-server]__15d297ca._.js
   │  │  │  │     ├─ [root-of-the-server]__15d297ca._.js.map
   │  │  │  │     ├─ [root-of-the-server]__22ccc345._.js
   │  │  │  │     ├─ [root-of-the-server]__22ccc345._.js.map
   │  │  │  │     ├─ [root-of-the-server]__3103b4a9._.js
   │  │  │  │     ├─ [root-of-the-server]__3103b4a9._.js.map
   │  │  │  │     ├─ [root-of-the-server]__38b1df7c._.js
   │  │  │  │     ├─ [root-of-the-server]__38b1df7c._.js.map
   │  │  │  │     ├─ [root-of-the-server]__3cb6573f._.js
   │  │  │  │     ├─ [root-of-the-server]__3cb6573f._.js.map
   │  │  │  │     ├─ [root-of-the-server]__3e9237ca._.js
   │  │  │  │     ├─ [root-of-the-server]__3e9237ca._.js.map
   │  │  │  │     ├─ [root-of-the-server]__511bb548._.js
   │  │  │  │     ├─ [root-of-the-server]__511bb548._.js.map
   │  │  │  │     ├─ [root-of-the-server]__5aef4d9c._.js
   │  │  │  │     ├─ [root-of-the-server]__5aef4d9c._.js.map
   │  │  │  │     ├─ [root-of-the-server]__5b8e9c45._.js
   │  │  │  │     ├─ [root-of-the-server]__5b8e9c45._.js.map
   │  │  │  │     ├─ [root-of-the-server]__6cc1b65e._.js
   │  │  │  │     ├─ [root-of-the-server]__6cc1b65e._.js.map
   │  │  │  │     ├─ [root-of-the-server]__707940ac._.js
   │  │  │  │     ├─ [root-of-the-server]__707940ac._.js.map
   │  │  │  │     ├─ [root-of-the-server]__70a73b34._.js
   │  │  │  │     ├─ [root-of-the-server]__70a73b34._.js.map
   │  │  │  │     ├─ [root-of-the-server]__73cd46fa._.js
   │  │  │  │     ├─ [root-of-the-server]__73cd46fa._.js.map
   │  │  │  │     ├─ [root-of-the-server]__77fa65db._.js
   │  │  │  │     ├─ [root-of-the-server]__77fa65db._.js.map
   │  │  │  │     ├─ [root-of-the-server]__7b65e9e7._.js
   │  │  │  │     ├─ [root-of-the-server]__7b65e9e7._.js.map
   │  │  │  │     ├─ [root-of-the-server]__92913bd2._.js
   │  │  │  │     ├─ [root-of-the-server]__92913bd2._.js.map
   │  │  │  │     ├─ [root-of-the-server]__a408a47f._.js
   │  │  │  │     ├─ [root-of-the-server]__a408a47f._.js.map
   │  │  │  │     ├─ [root-of-the-server]__a83a9793._.js
   │  │  │  │     ├─ [root-of-the-server]__a83a9793._.js.map
   │  │  │  │     ├─ [root-of-the-server]__a8ab9a0d._.js
   │  │  │  │     ├─ [root-of-the-server]__a8ab9a0d._.js.map
   │  │  │  │     ├─ [root-of-the-server]__c80f7c8f._.js
   │  │  │  │     ├─ [root-of-the-server]__c80f7c8f._.js.map
   │  │  │  │     ├─ [root-of-the-server]__d974e4d0._.js
   │  │  │  │     ├─ [root-of-the-server]__d974e4d0._.js.map
   │  │  │  │     ├─ [root-of-the-server]__dc012465._.js
   │  │  │  │     ├─ [root-of-the-server]__dc012465._.js.map
   │  │  │  │     ├─ [root-of-the-server]__e0c934dc._.js
   │  │  │  │     ├─ [root-of-the-server]__e0c934dc._.js.map
   │  │  │  │     ├─ [root-of-the-server]__e6a4d965._.js
   │  │  │  │     ├─ [root-of-the-server]__e6a4d965._.js.map
   │  │  │  │     ├─ [root-of-the-server]__e72df855._.js
   │  │  │  │     ├─ [root-of-the-server]__e72df855._.js.map
   │  │  │  │     ├─ [root-of-the-server]__e8a2741f._.js
   │  │  │  │     ├─ [root-of-the-server]__e8a2741f._.js.map
   │  │  │  │     ├─ [root-of-the-server]__f2ad1cab._.js
   │  │  │  │     ├─ [root-of-the-server]__f2ad1cab._.js.map
   │  │  │  │     ├─ [turbopack]_runtime.js
   │  │  │  │     ├─ [turbopack]_runtime.js.map
   │  │  │  │     ├─ _131b77d1._.js
   │  │  │  │     ├─ _131b77d1._.js.map
   │  │  │  │     ├─ _28a6d289._.js
   │  │  │  │     ├─ _28a6d289._.js.map
   │  │  │  │     ├─ _2d5ab7a0._.js
   │  │  │  │     ├─ _2d5ab7a0._.js.map
   │  │  │  │     ├─ _3385fe18._.js
   │  │  │  │     ├─ _3385fe18._.js.map
   │  │  │  │     ├─ _3de71d26._.js
   │  │  │  │     ├─ _3de71d26._.js.map
   │  │  │  │     ├─ _52efb938._.js
   │  │  │  │     ├─ _52efb938._.js.map
   │  │  │  │     ├─ _5a5addee._.js
   │  │  │  │     ├─ _5a5addee._.js.map
   │  │  │  │     ├─ _68c85b02._.js
   │  │  │  │     ├─ _68c85b02._.js.map
   │  │  │  │     ├─ _6f0f5c64._.js
   │  │  │  │     ├─ _6f0f5c64._.js.map
   │  │  │  │     ├─ _7110179b._.js
   │  │  │  │     ├─ _7110179b._.js.map
   │  │  │  │     ├─ _87fdd847._.js
   │  │  │  │     ├─ _87fdd847._.js.map
   │  │  │  │     ├─ _a135d30f._.js
   │  │  │  │     ├─ _a135d30f._.js.map
   │  │  │  │     ├─ _aa4124be._.js
   │  │  │  │     ├─ _aa4124be._.js.map
   │  │  │  │     ├─ _b0844c7a._.js
   │  │  │  │     ├─ _b0844c7a._.js.map
   │  │  │  │     ├─ _be3a4407._.js
   │  │  │  │     ├─ _be3a4407._.js.map
   │  │  │  │     ├─ _cdce8ab6._.js
   │  │  │  │     ├─ _cdce8ab6._.js.map
   │  │  │  │     ├─ _f0f7256f._.js
   │  │  │  │     ├─ _f0f7256f._.js.map
   │  │  │  │     ├─ _fca356b3._.js
   │  │  │  │     ├─ _fca356b3._.js.map
   │  │  │  │     ├─ _next-internal_server_app_admin_landing_page_actions_6615540f.js
   │  │  │  │     ├─ _next-internal_server_app_admin_landing_page_actions_6615540f.js.map
   │  │  │  │     ├─ _next-internal_server_app_admin_page_actions_c7bd1b4f.js
   │  │  │  │     ├─ _next-internal_server_app_admin_page_actions_c7bd1b4f.js.map
   │  │  │  │     ├─ _next-internal_server_app_dashboards_admin_page_actions_562304bc.js
   │  │  │  │     ├─ _next-internal_server_app_dashboards_admin_page_actions_562304bc.js.map
   │  │  │  │     ├─ _next-internal_server_app_dashboards_faculty_page_actions_27f824bc.js
   │  │  │  │     ├─ _next-internal_server_app_dashboards_faculty_page_actions_27f824bc.js.map
   │  │  │  │     ├─ _next-internal_server_app_dashboards_monitor_page_actions_b74cd55b.js
   │  │  │  │     ├─ _next-internal_server_app_dashboards_monitor_page_actions_b74cd55b.js.map
   │  │  │  │     ├─ _next-internal_server_app_dashboards_student_page_actions_559cb9d8.js
   │  │  │  │     ├─ _next-internal_server_app_dashboards_student_page_actions_559cb9d8.js.map
   │  │  │  │     ├─ _next-internal_server_app_login_page_actions_0e9aafc0.js
   │  │  │  │     ├─ _next-internal_server_app_login_page_actions_0e9aafc0.js.map
   │  │  │  │     ├─ _next-internal_server_app_page_actions_39d4fc33.js
   │  │  │  │     ├─ _next-internal_server_app_page_actions_39d4fc33.js.map
   │  │  │  │     ├─ _next-internal_server_app__not-found_page_actions_554ec2bf.js
   │  │  │  │     └─ _next-internal_server_app__not-found_page_actions_554ec2bf.js.map
   │  │  │  ├─ interception-route-rewrite-manifest.js
   │  │  │  ├─ middleware-build-manifest.js
   │  │  │  ├─ middleware-manifest.json
   │  │  │  ├─ next-font-manifest.js
   │  │  │  ├─ next-font-manifest.json
   │  │  │  ├─ pages
   │  │  │  │  ├─ _app
   │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  ├─ client-build-manifest.json
   │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  ├─ pages-manifest.json
   │  │  │  │  │  └─ react-loadable-manifest.json
   │  │  │  │  ├─ _app.js
   │  │  │  │  ├─ _app.js.map
   │  │  │  │  ├─ _document
   │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  ├─ pages-manifest.json
   │  │  │  │  │  └─ react-loadable-manifest.json
   │  │  │  │  ├─ _document.js
   │  │  │  │  ├─ _document.js.map
   │  │  │  │  ├─ _error
   │  │  │  │  │  ├─ build-manifest.json
   │  │  │  │  │  ├─ client-build-manifest.json
   │  │  │  │  │  ├─ next-font-manifest.json
   │  │  │  │  │  ├─ pages-manifest.json
   │  │  │  │  │  └─ react-loadable-manifest.json
   │  │  │  │  ├─ _error.js
   │  │  │  │  └─ _error.js.map
   │  │  │  ├─ pages-manifest.json
   │  │  │  ├─ server-reference-manifest.js
   │  │  │  └─ server-reference-manifest.json
   │  │  ├─ static
   │  │  │  ├─ chunks
   │  │  │  │  ├─ app_296ae1f1._.js
   │  │  │  │  ├─ app_296ae1f1._.js.map
   │  │  │  │  ├─ app_4d345b60._.js
   │  │  │  │  ├─ app_4d345b60._.js.map
   │  │  │  │  ├─ app_9f294304._.js
   │  │  │  │  ├─ app_9f294304._.js.map
   │  │  │  │  ├─ app_admin_landing_page_05414c5d.js
   │  │  │  │  ├─ app_admin_landing_page_05414c5d.js.map
   │  │  │  │  ├─ app_admin_landing_page_3873bb71.js
   │  │  │  │  ├─ app_admin_landing_page_41be3b04.js
   │  │  │  │  ├─ app_admin_landing_page_70f31ab0.js
   │  │  │  │  ├─ app_admin_landing_page_73fa2717.js
   │  │  │  │  ├─ app_admin_landing_page_b687ecf6.js
   │  │  │  │  ├─ app_admin_landing_page_dcd2b2f8.js
   │  │  │  │  ├─ app_dashboards_admin_components_0281f2fb._.js
   │  │  │  │  ├─ app_dashboards_admin_components_0281f2fb._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_0c5e5ef8._.js
   │  │  │  │  ├─ app_dashboards_admin_components_0c5e5ef8._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_1316074a._.js
   │  │  │  │  ├─ app_dashboards_admin_components_1316074a._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_1e4e9540._.js
   │  │  │  │  ├─ app_dashboards_admin_components_1e4e9540._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_21e4a2d9._.js
   │  │  │  │  ├─ app_dashboards_admin_components_21e4a2d9._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_2c551819._.js
   │  │  │  │  ├─ app_dashboards_admin_components_2c551819._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_2e0b5fb1._.js
   │  │  │  │  ├─ app_dashboards_admin_components_2e0b5fb1._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_30c58deb._.js
   │  │  │  │  ├─ app_dashboards_admin_components_30c58deb._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_3ba61f81._.js
   │  │  │  │  ├─ app_dashboards_admin_components_3ba61f81._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_41d9c947._.js
   │  │  │  │  ├─ app_dashboards_admin_components_41d9c947._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_554dde87._.js
   │  │  │  │  ├─ app_dashboards_admin_components_554dde87._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_81e1160c._.js
   │  │  │  │  ├─ app_dashboards_admin_components_81e1160c._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_8b2ac9c7._.js
   │  │  │  │  ├─ app_dashboards_admin_components_8b2ac9c7._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_9d5df433._.js
   │  │  │  │  ├─ app_dashboards_admin_components_9d5df433._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_a005cd8e._.js
   │  │  │  │  ├─ app_dashboards_admin_components_a005cd8e._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_aa4e91e9._.js
   │  │  │  │  ├─ app_dashboards_admin_components_aa4e91e9._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_AccountSettings_68e44cb8.js
   │  │  │  │  ├─ app_dashboards_admin_components_AccountSettings_aa70e1d7.js
   │  │  │  │  ├─ app_dashboards_admin_components_AccountSettings_aa70e1d7.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_afd5c03f._.js
   │  │  │  │  ├─ app_dashboards_admin_components_afd5c03f._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_Attendance_68e44cb8.js
   │  │  │  │  ├─ app_dashboards_admin_components_Attendance_7c7abaf0.js
   │  │  │  │  ├─ app_dashboards_admin_components_Attendance_7c7abaf0.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_Attendance_a3e05860.js
   │  │  │  │  ├─ app_dashboards_admin_components_Attendance_a3e05860.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_be63dde4._.js
   │  │  │  │  ├─ app_dashboards_admin_components_be63dde4._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_c818ec76._.js
   │  │  │  │  ├─ app_dashboards_admin_components_c818ec76._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_c8588624._.js
   │  │  │  │  ├─ app_dashboards_admin_components_c8588624._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_cf5dc367._.js
   │  │  │  │  ├─ app_dashboards_admin_components_cf5dc367._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_Chat_68e44cb8.js
   │  │  │  │  ├─ app_dashboards_admin_components_Chat_ce6243e4.js
   │  │  │  │  ├─ app_dashboards_admin_components_Chat_ce6243e4.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_d63c718f._.js
   │  │  │  │  ├─ app_dashboards_admin_components_d63c718f._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_DashboardHome_68e44cb8.js
   │  │  │  │  ├─ app_dashboards_admin_components_DashboardHome_d069fc78.js
   │  │  │  │  ├─ app_dashboards_admin_components_DashboardHome_d069fc78.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_e0f1f024._.js
   │  │  │  │  ├─ app_dashboards_admin_components_e0f1f024._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_e6838a9a._.js
   │  │  │  │  ├─ app_dashboards_admin_components_e6838a9a._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_e75ac4a6._.js
   │  │  │  │  ├─ app_dashboards_admin_components_e75ac4a6._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_f5658975._.js
   │  │  │  │  ├─ app_dashboards_admin_components_f5658975._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_f7d1642a._.js
   │  │  │  │  ├─ app_dashboards_admin_components_f7d1642a._.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_Fees_68e44cb8.js
   │  │  │  │  ├─ app_dashboards_admin_components_Fees_c410b23e.js
   │  │  │  │  ├─ app_dashboards_admin_components_Fees_c410b23e.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_LandingSettings_68e44cb8.js
   │  │  │  │  ├─ app_dashboards_admin_components_LandingSettings_ae6e2c14.js
   │  │  │  │  ├─ app_dashboards_admin_components_LandingSettings_ae6e2c14.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_Notices_620a48bb.js
   │  │  │  │  ├─ app_dashboards_admin_components_Notices_620a48bb.js.map
   │  │  │  │  ├─ app_dashboards_admin_components_Notices_68e44cb8.js
   │  │  │  │  ├─ app_dashboards_admin_components_UsersManager_68e44cb8.js
   │  │  │  │  ├─ app_dashboards_admin_components_UsersManager_f9cfca9b.js
   │  │  │  │  ├─ app_dashboards_admin_components_UsersManager_f9cfca9b.js.map
   │  │  │  │  ├─ app_dashboards_admin_page_4f2d5ead.js
   │  │  │  │  ├─ app_dashboards_admin_page_4f2d5ead.js.map
   │  │  │  │  ├─ app_dashboards_admin_page_73fa2717.js
   │  │  │  │  ├─ app_favicon_ico_mjs_c2425b09._.js
   │  │  │  │  ├─ app_globals_css_bad6b30c._.single.css
   │  │  │  │  ├─ app_globals_css_bad6b30c._.single.css.map
   │  │  │  │  ├─ app_layout_3873bb71.js
   │  │  │  │  ├─ app_login_page_73fa2717.js
   │  │  │  │  ├─ app_login_page_d1b677fa.js
   │  │  │  │  ├─ app_login_page_d1b677fa.js.map
   │  │  │  │  ├─ app_page_70f31ab0.js
   │  │  │  │  ├─ app_page_73fa2717.js
   │  │  │  │  ├─ app_page_b687ecf6.js
   │  │  │  │  ├─ app_page_dcd2b2f8.js
   │  │  │  │  ├─ app_page_df5fb46e.js
   │  │  │  │  ├─ app_page_df5fb46e.js.map
   │  │  │  │  ├─ components_Navbar_8e982910.js
   │  │  │  │  ├─ components_Navbar_8e982910.js.map
   │  │  │  │  ├─ pages
   │  │  │  │  │  ├─ _app.js
   │  │  │  │  │  └─ _error.js
   │  │  │  │  ├─ pages__app_2da965e7._.js
   │  │  │  │  ├─ pages__app_7ae0d03a._.js.map
   │  │  │  │  ├─ pages__error_2da965e7._.js
   │  │  │  │  ├─ pages__error_54b6f5cd._.js.map
   │  │  │  │  ├─ turbopack-pages__app_7ae0d03a._.js
   │  │  │  │  ├─ turbopack-pages__error_54b6f5cd._.js
   │  │  │  │  ├─ turbopack-_376339a9._.js
   │  │  │  │  ├─ [next]_entry_page-loader_ts_43b523b5._.js
   │  │  │  │  ├─ [next]_entry_page-loader_ts_43b523b5._.js.map
   │  │  │  │  ├─ [next]_entry_page-loader_ts_742e4b53._.js
   │  │  │  │  ├─ [next]_entry_page-loader_ts_742e4b53._.js.map
   │  │  │  │  ├─ [next]_internal_font_google_geist_2ae47f08_module_css_bad6b30c._.single.css
   │  │  │  │  ├─ [next]_internal_font_google_geist_2ae47f08_module_css_bad6b30c._.single.css.map
   │  │  │  │  ├─ [next]_internal_font_google_geist_mono_eb58308d_module_css_bad6b30c._.single.css
   │  │  │  │  ├─ [next]_internal_font_google_geist_mono_eb58308d_module_css_bad6b30c._.single.css.map
   │  │  │  │  ├─ [root-of-the-server]__092393de._.js
   │  │  │  │  ├─ [root-of-the-server]__092393de._.js.map
   │  │  │  │  ├─ [root-of-the-server]__45f039c3._.js
   │  │  │  │  ├─ [root-of-the-server]__45f039c3._.js.map
   │  │  │  │  ├─ [root-of-the-server]__af6e68da._.css
   │  │  │  │  ├─ [root-of-the-server]__af6e68da._.css.map
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_2ac12087._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js.map
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_d62d378a._.js
   │  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_d62d378a._.js.map
   │  │  │  │  ├─ _012429de._.js
   │  │  │  │  ├─ _012429de._.js.map
   │  │  │  │  ├─ _01d5d403._.js
   │  │  │  │  ├─ _01d5d403._.js.map
   │  │  │  │  ├─ _21e66456._.js
   │  │  │  │  ├─ _21e66456._.js.map
   │  │  │  │  ├─ _22279ecf._.js
   │  │  │  │  ├─ _22279ecf._.js.map
   │  │  │  │  ├─ _2253fa9d._.js
   │  │  │  │  ├─ _2253fa9d._.js.map
   │  │  │  │  ├─ _376339a9._.js.map
   │  │  │  │  ├─ _42bbf4ef._.js
   │  │  │  │  ├─ _42bbf4ef._.js.map
   │  │  │  │  ├─ _44214074._.js
   │  │  │  │  ├─ _44214074._.js.map
   │  │  │  │  ├─ _5467450c._.js
   │  │  │  │  ├─ _5467450c._.js.map
   │  │  │  │  ├─ _5fd3e215._.js
   │  │  │  │  ├─ _5fd3e215._.js.map
   │  │  │  │  ├─ _6423a6f7._.js
   │  │  │  │  ├─ _6423a6f7._.js.map
   │  │  │  │  ├─ _68259c9e._.js
   │  │  │  │  ├─ _68259c9e._.js.map
   │  │  │  │  ├─ _6fae217b._.js
   │  │  │  │  ├─ _6fae217b._.js.map
   │  │  │  │  ├─ _7c49fd8c._.js
   │  │  │  │  ├─ _7c49fd8c._.js.map
   │  │  │  │  ├─ _7d995970._.js
   │  │  │  │  ├─ _7d995970._.js.map
   │  │  │  │  ├─ _8860ba15._.js
   │  │  │  │  ├─ _8860ba15._.js.map
   │  │  │  │  ├─ _92a92fd8._.js
   │  │  │  │  ├─ _92a92fd8._.js.map
   │  │  │  │  ├─ _98d11d56._.js
   │  │  │  │  ├─ _98d11d56._.js.map
   │  │  │  │  ├─ _a0ff3932._.js
   │  │  │  │  ├─ _b7a24b20._.js
   │  │  │  │  ├─ _b7a24b20._.js.map
   │  │  │  │  ├─ _e94307b7._.js
   │  │  │  │  ├─ _e94307b7._.js.map
   │  │  │  │  ├─ _f9a90baa._.js
   │  │  │  │  ├─ _f9a90baa._.js.map
   │  │  │  │  ├─ _fdfa68ad._.js
   │  │  │  │  └─ _fdfa68ad._.js.map
   │  │  │  ├─ development
   │  │  │  │  ├─ _buildManifest.js
   │  │  │  │  ├─ _clientMiddlewareManifest.json
   │  │  │  │  └─ _ssgManifest.js
   │  │  │  └─ media
   │  │  │     ├─ 4fa387ec64143e14-s.c1fdd6c2.woff2
   │  │  │     ├─ 7178b3e590c64307-s.b97b3418.woff2
   │  │  │     ├─ 797e433ab948586e-s.p.dbea232f.woff2
   │  │  │     ├─ 8a480f0b521d4e75-s.8e0177b5.woff2
   │  │  │     ├─ bbc41e54d2fcbd21-s.799d8ef8.woff2
   │  │  │     ├─ caa3a2e1cccd8315-s.p.853070df.woff2
   │  │  │     └─ favicon.0b3bf435.ico
   │  │  ├─ trace
   │  │  └─ types
   │  │     └─ routes.d.ts
   │  └─ types
   │     ├─ routes.d.ts
   │     └─ validator.ts
   ├─ app
   │  ├─ dashboards
   │  │  ├─ admin
   │  │  │  ├─ components
   │  │  │  │  ├─ AccountSettings.js
   │  │  │  │  ├─ Attendance.js
   │  │  │  │  ├─ Chat.js
   │  │  │  │  ├─ DashboardHome.js
   │  │  │  │  ├─ Fees.js
   │  │  │  │  ├─ LandingSettings.js
   │  │  │  │  ├─ modals
   │  │  │  │  │  ├─ AddUserModal.js
   │  │  │  │  │  ├─ BulkUploadModal.js
   │  │  │  │  │  └─ EditUserModal.js
   │  │  │  │  ├─ Notices.js
   │  │  │  │  └─ UsersManager.js
   │  │  │  └─ page.js
   │  │  ├─ faculty
   │  │  │  └─ page.js
   │  │  ├─ monitor
   │  │  │  └─ page.js
   │  │  └─ student
   │  │     └─ page.js
   │  ├─ favicon.ico
   │  ├─ globals.css
   │  ├─ layout.js
   │  ├─ lib
   │  │  ├─ apiClient.js
   │  │  ├─ csvUsers.js
   │  │  └─ usersApi.js
   │  ├─ login
   │  │  └─ page.js
   │  └─ page.js
   ├─ components
   │  ├─ AboutSection.js
   │  ├─ BranchesSection.js
   │  ├─ ContactSection.js
   │  ├─ Footer.js
   │  ├─ HeroSection.js
   │  ├─ Navbar.js
   │  ├─ SectionCard.js
   │  ├─ ServicesSection.js
   │  └─ TeamSection.js
   ├─ eslint.config.mjs
   ├─ jsconfig.json
   ├─ next.config.mjs
   ├─ package-lock.json
   ├─ package.json
   ├─ postcss.config.mjs
   ├─ public
   │  ├─ assets
   │  │  ├─ about.jpg
   │  │  ├─ admission.png
   │  │  ├─ background-login.jpg
   │  │  ├─ branch-1.jpg
   │  │  ├─ branch-2.jpg
   │  │  ├─ branch-3.jpg
   │  │  ├─ dashboards.png
   │  │  ├─ down.png
   │  │  ├─ home-1.jpg
   │  │  ├─ home-2.jpg
   │  │  ├─ home-3.jpg
   │  │  ├─ login-2.png
   │  │  ├─ mountain.jpg
   │  │  ├─ Sarhad-University-logo.jpg
   │  │  ├─ team-1.jpg
   │  │  ├─ team-2.jpg
   │  │  ├─ team-3.jpg
   │  │  ├─ team-4.jpg
   │  │  └─ uni_logo.png
   │  ├─ file.svg
   │  ├─ globe.svg
   │  ├─ next.svg
   │  ├─ uni_logo.png
   │  ├─ vercel.svg
   │  └─ window.svg
   ├─ README.md
   └─ tailwind.config.mjs

```