# Allkart E-Commerce Platform

**Allkart** is a comprehensive e-commerce solution designed to enable businesses of all sizes to go online effortlessly. The platform distinguishes itself by allowing a single seller to create and manage **multiple stores** under one account, catering to different product categories and niche markets from a centralized dashboard.

## 🚀 Tech Stack

- **Monorepo:** [Turborepo](https://turbo.build/)
- **Runtime & Manager:** [Bun](https://bun.sh/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)

---

## 🛠️ Installation & Setup

### Prerequisites
- [Bun](https://bun.sh/) installed locally.
- Docker (optional, for containerized setup).
- PostgreSQL database URL.

### 💻 Manual Installation

Follow these steps to run the project locally on your machine.

**1. Clone the repository**
git clone [https://github.com/your-username/allkart.git](https://github.com/your-username/allkart.git)
cd allkart
- bun install
- cp .env.example .env
- cd packages/database && bunx prisma generate
- cd packages/auth-db && bunx prisma db push
- bun dev

### 🐳 Docker Installation

To run the application using Docker containers:
- docker-compose up -d
