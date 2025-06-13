# BlueMoon Management System

**BlueMoon Management System** là hệ thống quản lý chung cư hiện đại, hỗ trợ Ban Quản Lý và cư dân trong việc quản lý căn hộ, hóa đơn, bảo trì, và tương tác nội bộ.

---

## 🇻🇳 Tiếng Việt — Hệ thống Quản lý Chung cư

### Công nghệ sử dụng

- **Backend**: Spring Boot (Java)
- **Frontend**: ReactJS
- **Cơ sở dữ liệu**: SQL Server
- **Xác thực**: JWT
- **API**: RESTful
- **Triển khai**: Docker (docker-compose -f bluemoon.yml)

### Tính năng chính

- Quản lý thông tin cư dân & căn hộ
- Quản lý hóa đơn điện, nước, dịch vụ
- Gửi thông báo và nhận phản hồi từ cư dân
- Quản lý yêu cầu bảo trì
- Đăng ký dịch vụ tiện ích

### Hướng dẫn chạy backend với Docker

```bash
cd .\backend\

docker-compose -f bluemoon.yml up --build
```

### Hướng dẫn chạy frontend

```bash
cd .\frontend\

npm install --force

npm run dev
```

---

## 🇬🇧 English — Apartment Management System

### Technologies Used

- **Backend**: Spring Boot (Java)
- **Frontend**: ReactJS
- **Database**: SQL Server
- **Authentication**: JWT
- **API**: RESTful
- **Deployment**: Docker (docker-compose -f bluemoon.yml)

### 🧩 Key Features

- Manage resident & apartment info
- Bill management
- Notifications and feedback system
- Maintenance request management
- Facility booking

### ⚙️ Run Backend with Docker

```bash
docker-compose -f bluemoon.yml up --build
```

### ⚙️ Run Frontend with npm

```bash
cd .\frontend\

npm install --force

npm run dev
```

---

## 🇯🇵 日本語 — マンション管理システム

### 使用技術

- **バックエンド**: Spring Boot（Java）
- **フロントエンド**: ReactJS
- **データベース**: SQL Server
- **認証**: JWT
- **API**: RESTful
- **デプロイ**: Docker（docker-compose -f bluemoon.yml）

### 主な機能

- 居住者と部屋情報の管理
- 請求書の管理
- 通知とフィードバック機能
- 修理依頼の管理
- 施設予約機能

### バックエンド Docker で実行

```bash
docker-compose -f bluemoon.yml up --build
```

### フロントエンド実行

```bash
cd .\frontend\

npm install --force

npm run dev
```

---

## 📂 Project Structure

## 📄 License

MIT License
