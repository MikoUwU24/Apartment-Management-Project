# BlueMoon Management System

**BlueMoon Management System** là hệ thống quản lý chung cư hiện đại, được tích hợp với backend ktpm, hỗ trợ Ban Quản Lý trong việc quản lý hộ khẩu, nhân khẩu, khoản thu, và nộp tiền.

---

## 🇻🇳 Tiếng Việt — Hệ thống Quản lý Chung cư

### Công nghệ sử dụng

- **Backend**: Spring Boot (Java) - từ repository Giang2011/ktpm
- **Frontend**: Next.js 15 (React 19, TypeScript)
- **Cơ sở dữ liệu**: MySQL/PostgreSQL
- **UI Framework**: shadcn/ui + Tailwind CSS
- **API**: RESTful
- **Triển khai**: Docker

### Tính năng chính

#### Quản lý Hộ Khẩu (HoKhau)
- Tạo, xem, sửa, xóa hộ khẩu
- Xem danh sách thành viên trong hộ khẩu
- Xem lịch sử đóng tiền của hộ khẩu
- Tìm kiếm theo tên chủ hộ hoặc địa chỉ
- Phân loại hộ đang ở / đã chuyển đi

#### Quản lý Nhân Khẩu (NhanKhau)
- Tạo, xem, sửa, xóa nhân khẩu
- Liên kết nhân khẩu với hộ khẩu
- Quản lý thông tin: họ tên, ngày sinh, giới tính, CMND/CCCD, quan hệ với chủ hộ, nghề nghiệp
- Tìm kiếm theo họ tên hoặc CMND/CCCD

#### Quản lý Khoản Thu (KhoanThu)
- Tạo, xem, sửa, xóa khoản thu
- Phân loại: Bắt buộc (0) / Tự nguyện (1)
- Theo dõi hộ đã đóng / chưa đóng (chỉ với khoản bắt buộc)
- Thống kê tổng tiền đã thu
- Thiết lập ngày bắt đầu / kết thúc

#### Quản lý Nộp Tiền (NopTien)
- Ghi nhận nộp tiền từ hộ khẩu cho khoản thu
- Xem lịch sử nộp tiền theo hộ khẩu
- Xem lịch sử nộp tiền theo khoản thu
- Thống kê theo khoảng thời gian
- Ghi chú người nộp và thông tin chi tiết

#### Audit Logs
- Theo dõi tất cả thay đổi trong hệ thống
- Ghi lại: CREATE, UPDATE, DELETE
- Xem chi tiết dữ liệu cũ và mới
- Lọc theo người thực hiện, hành động, đối tượng

### Cấu trúc dự án

```
frontend/
├── app/
│   ├── households/              # Trang quản lý hộ khẩu
│   │   ├── page.tsx            # Danh sách hộ khẩu
│   │   └── [id]/
│   │       └── page.tsx        # Chi tiết hộ khẩu với thành viên
│   ├── residents/               # Trang quản lý nhân khẩu
│   │   └── page.tsx
│   ├── fees/                    # Trang quản lý khoản thu
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx        # Chi tiết khoản thu
│   ├── payments/                # Trang quản lý nộp tiền
│   │   └── page.tsx
│   ├── audit-logs/              # Trang xem audit logs
│   │   └── page.tsx
│   └── dashboard/               # Trang dashboard
│       └── page.tsx
├── components/
│   ├── households/              # Components cho hộ khẩu
│   │   ├── HouseholdsTable.tsx
│   │   ├── CreateHouseholdDialog.tsx
│   │   ├── UpdateHouseholdDialog.tsx
│   │   └── DeleteHouseholdDialog.tsx
│   ├── residents/               # Components cho nhân khẩu
│   ├── fees/                    # Components cho khoản thu
│   ├── payments/                # Components cho nộp tiền
│   └── audit/                   # Components cho audit logs
│       └── AuditLogsTable.tsx
├── lib/
│   ├── api/                     # API clients
│   │   ├── hokhau.ts           # API cho hộ khẩu
│   │   ├── nhankhau.ts         # API cho nhân khẩu
│   │   ├── khoanthu.ts         # API cho khoản thu
│   │   ├── noptien.ts          # API cho nộp tiền
│   │   ├── users.ts            # API cho user
│   │   └── audit.ts            # API cho audit logs
│   └── types/                   # TypeScript types
│       ├── household.ts         # Types cho hộ khẩu
│       ├── resident.ts          # Types cho nhân khẩu
│       ├── fee.ts              # Types cho khoản thu
│       ├── payment.ts          # Types cho nộp tiền
│       ├── user.ts             # Types cho user
│       └── audit.ts            # Types cho audit logs
```

### API Endpoints

#### Hộ Khẩu (HoKhau)
- `GET /api/hokhau` - Lấy tất cả hộ khẩu
- `GET /api/hokhau/{id}` - Lấy hộ khẩu theo ID
- `GET /api/hokhau/active` - Lấy hộ khẩu đang ở
- `GET /api/hokhau/{id}/chitiet` - Lấy chi tiết hộ khẩu (thành viên, khoản đã đóng, chưa đóng)
- `GET /api/hokhau/{id}/thanhvien` - Lấy danh sách thành viên
- `GET /api/hokhau/search/chuho?keyword=` - Tìm theo tên chủ hộ
- `POST /api/hokhau` - Tạo hộ khẩu mới
- `PUT /api/hokhau/{id}` - Cập nhật hộ khẩu
- `DELETE /api/hokhau/{id}` - Xóa hộ khẩu

#### Nhân Khẩu (NhanKhau)
- `GET /api/nhankhau` - Lấy tất cả nhân khẩu
- `GET /api/nhankhau/{id}` - Lấy nhân khẩu theo ID
- `GET /api/nhankhau/hokhau/{hoKhauId}` - Lấy nhân khẩu theo hộ khẩu
- `GET /api/nhankhau/search?keyword=` - Tìm theo họ tên
- `POST /api/nhankhau` - Tạo nhân khẩu mới (yêu cầu hoKhauId)
- `PUT /api/nhankhau/{id}` - Cập nhật nhân khẩu
- `DELETE /api/nhankhau/{id}` - Xóa nhân khẩu

#### Khoản Thu (KhoanThu)
- `GET /api/khoanthu` - Lấy tất cả khoản thu
- `GET /api/khoanthu/{id}` - Lấy khoản thu theo ID
- `GET /api/khoanthu/batbuoc` - Lấy khoản thu bắt buộc
- `GET /api/khoanthu/tunguyen` - Lấy khoản thu tự nguyện
- `GET /api/khoanthu/{id}/chitiet` - Lấy chi tiết khoản thu
- `POST /api/khoanthu` - Tạo khoản thu mới
- `PUT /api/khoanthu/{id}` - Cập nhật khoản thu
- `DELETE /api/khoanthu/{id}` - Xóa khoản thu

#### Nộp Tiền (NopTien)
- `GET /api/noptien` - Lấy tất cả nộp tiền
- `GET /api/noptien/hokhau/{hoKhauId}` - Lấy nộp tiền theo hộ khẩu
- `GET /api/noptien/khoanthu/{khoanThuId}` - Lấy nộp tiền theo khoản thu
- `POST /api/noptien` - Tạo nộp tiền mới (yêu cầu khoanThuId, hoKhauId)
- `PUT /api/noptien/{id}` - Cập nhật nộp tiền
- `DELETE /api/noptien/{id}` - Xóa nộp tiền

### Hướng dẫn chạy backend (ktpm)

Backend được lấy từ repository Giang2011/ktpm. Đảm bảo backend đang chạy tại `http://localhost:8080`

```bash
# Clone backend ktpm
git clone https://github.com/Giang2011/ktpm.git
cd ktpm/backend

# Cấu hình database trong application.properties
# Chạy Spring Boot application
./mvnw spring-boot:run
```

### Hướng dẫn chạy frontend

```bash
cd frontend

# Cài đặt dependencies
npm install --legacy-peer-deps

# Thiết lập biến môi trường (tùy chọn)
# Tạo file .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Chạy development server
npm run dev

# Build cho production
npm run build
npm start
```

Frontend sẽ chạy tại `http://localhost:3000`

### Cấu trúc Menu

- **Dashboard** - Tổng quan thống kê
- **Hộ Khẩu** - Quản lý hộ khẩu
- **Nhân Khẩu** - Quản lý nhân khẩu (thành viên hộ khẩu)
- **Khoản Thu** - Quản lý các khoản thu
- **Nộp Tiền** - Quản lý nộp tiền
- **Audit Logs** - Xem lịch sử thay đổi
- **Statistics** - Thống kê chi tiết
- **Settings** - Cài đặt hệ thống

---

## 🇬🇧 English — Apartment Management System

### Technologies Used

- **Backend**: Spring Boot (Java) - from Giang2011/ktpm repository
- **Frontend**: Next.js 15 (React 19, TypeScript)
- **Database**: MySQL/PostgreSQL
- **UI Framework**: shadcn/ui + Tailwind CSS
- **API**: RESTful
- **Deployment**: Docker

### Key Features

- **Household Management** (HoKhau): Create, view, edit, delete households with member tracking
- **Resident Management** (NhanKhau): Manage residents linked to households
- **Fee Management** (KhoanThu): Manage mandatory/voluntary fees with payment tracking
- **Payment Management** (NopTien): Record payments from households for fees
- **Audit Logs**: Track all system changes with detailed history

### Run Backend (ktpm)

Backend is from Giang2011/ktpm repository. Ensure backend runs at `http://localhost:8080`

```bash
git clone https://github.com/Giang2011/ktpm.git
cd ktpm/backend
./mvnw spring-boot:run
```

### Run Frontend

```bash
cd frontend
npm install --legacy-peer-deps

# Create .env.local (optional)
NEXT_PUBLIC_API_URL=http://localhost:8080/api

npm run dev
```

Frontend runs at `http://localhost:3000`

---

## 📄 License

MIT License
