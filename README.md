# 2026時間設計半日工作坊

活動報名網站，包含活動標題、圓角活動圖片、活動流程與報名表單。

## GitHub Pages

Pages 網址：https://jamesxienctu.github.io/2026workshop/

## Google Sheet 與 Apps Script 設定

1. 建立一份 Google Sheet。
2. 在 Google Sheet 內選擇「擴充功能」>「Apps Script」。
3. 將本專案的 `apps-script.js` 內容貼到 Apps Script 編輯器。
4. 儲存專案，選擇「部署」>「新增部署作業」。
5. 類型選擇「網路應用程式」。
6. 執行身分選擇「我」。
7. 存取權選擇「任何人」。
8. 部署後依畫面完成 OAuth 驗證。
9. 複製 Web App URL，貼回給 Codex 以繼續驗證與測試。

注意：Apps Script 會操作第一個工作表，並將「電話」欄設定為文字型態。
