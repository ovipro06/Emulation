# Android 14 Magisk OS Virtual Emulator - Local Hosting Guide

Run this emulator 100% locally on your computer or local home network (LAN) without any external cloud server or internet dependency.

---

## 🚀 Option 1: Run with Node.js (Quickest)

### Requirements
- [Node.js](https://nodejs.org/) (v18, v20, or v22 recommended)
- npm or pnpm

### Steps:
1. **Clone or Download the Repository:**
   ```bash
   git clone <YOUR_REPO_URL>
   cd android14-emulator
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Local Development Server:**
   ```bash
   npm run dev
   ```

4. **Access Locally:**
   - **On your PC:** Open [http://localhost:3000](http://localhost:3000)
   - **On your Phone (Same Wi-Fi):** Open `http://<YOUR_COMPUTER_LOCAL_IP>:3000`
     *(Find your local IP by running `ipconfig` on Windows or `ifconfig` / `ip a` on Mac/Linux)*

---

## 📦 Option 2: Production Build & Local Offline Static Server

To compile the project into production static files and serve it fully offline:

```bash
# 1. Build optimized offline production assets
npm run build

# 2. Serve locally with zero external dependencies
npx serve dist -l 3000
```

Now open [http://localhost:3000](http://localhost:3000) or your phone browser on your local Wi-Fi.

---

## 🐳 Option 3: Run with Docker

If you prefer containerized local hosting:

```bash
# Build the local Docker image
docker build -t android14-emulator .

# Run the container locally on port 3000
docker run -d -p 3000:3000 --name android14-local android14-emulator
```

Access at `http://localhost:3000`.
