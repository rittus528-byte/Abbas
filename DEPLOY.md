# How to Go Live (AidIran.io)

Is project ko live karne ke liye niche diye gaye steps follow karein:

## Option 1: Vercel (Recommended)
Next.js projects ke liye Vercel sabse behtreen aur asaan rasta hai.

1.  **GitHub Push:** Apne code ko GitHub par upload karein.
2.  **Vercel Connect:** [Vercel.com](https://vercel.com) par login karein aur GitHub repository connect karein.
3.  **Environment Variables:** Vercel Dashboard mein "Settings" -> "Environment Variables" mein ye values add karein:
    *   `MONGODB_URI`: (Aapka real MongoDB Atlas link)
    *   `NEXTAUTH_SECRET`: (Koi bhi random lambi string)
    *   `NEXTAUTH_URL`: `https://your-domain.com`
    *   `ADMIN_USER`: `admin@aidiran.io`
    *   `ADMIN_PASSWORD`: (Aapka secret password)
4.  **Deploy:** Click Deploy! Vercel automatically build kar ke live kar dega.

## Option 2: VPS (Hosting/CPanel)
Agar aap kisi VPS par hosting kar rahe hain:

1.  **Build Code:**
    ```bash
    npm install
    npm run build
    ```
2.  **Start Server:**
    ```bash
    npm run start
    ```
3.  **PM2 (Process Manager):** Server ko background mein chalane ke liye:
    ```bash
    npm install -g pm2
    pm2 start npm --name "aidiran" -- start
    ```

### Important Note
Hamesha yaad rakhein ke `.env.local` sirf local test ke liye hoti hai. Live server par **Environment Variables** dashboard mein set karni hoti hain.

---

**Link to Portal:** Ab aapke home page ke header mein "Portal" ka link add ho gaya hai jis se aap login page tak ja sakte hain.
