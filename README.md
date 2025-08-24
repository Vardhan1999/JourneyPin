# 📍 JourneyPin

JourneyPin is a social map application where users can share the places they visit.  
Anyone can explore uploaded spots without logging in, while authenticated users can add their own visited places with details like:

- ✅ User details: **Name, Email, Password, Profile Image**  
- ✅ Place details: **Title, Description, Address, Longitude & Latitude, Image**  

---

## 🚀 Features

- 🌍 **Explore without login** → Browse all shared places on an interactive map.  
- 👤 **Authentication system (JWT)** → Users can register/login to add new places.  
- 📌 **Add a spot** → Upload your visited place with title, description, address, coordinates, and an image.  
- 🖼 **Image support** → Users can upload images for both profiles and places.  
- 🔎 **Discoverability** → See what others have shared worldwide.  

---

## 🛠 Tech Stack

- **Frontend:** React  
- **Backend:** Node.js / Express  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Maps Integration:** Google Maps API  

---

## 📂 Project Structure

```bash
📦 journeypin
 ┣ 📂 backend        # API & database logic
 ┃ ┣ 📂 models       # Mongoose schemas (User, Place)
 ┃ ┣ 📂 routes       # Express routes
 ┃ ┣ 📂 middleware   # Auth & validation
 ┃ ┗ 📜 server.js    # Entry point
 ┣ 📂 frontend       # React client
 ┣ 📂 public         # Static assets
 ┣ 📂 assets         # Images and branding (banner/logo)
 ┣ 📜 .env.example   # Example environment variables
 ┣ 📜 package.json
 ┣ 📜 README.md
