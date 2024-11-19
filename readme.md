# BlogVerse Frontend

BlogVerse is a modern, feature-rich blogging platform that allows users to create, share, and engage with blog content. This repository contains the frontend implementation of the BlogVerse platform.

## 🚀 Features

- Responsive modern user interface
- User authentication and authorization
- Create, edit, and delete blog posts
- Rich text editor for content creation
- Comment system
- User profiles
- Category-based blog filtering
- Search functionality
- Like and bookmark posts
- Social sharing integration

## 🛠️ Tech Stack

- **Framework:** React.js
- **State Management:** Redux
- **Styling:** Tailwind CSS
- **Authentication:** JWT
- **Package Manager:** npm/yarn
- **Deployment:** Vercel/Netlify

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/rampalyadav0001/BlogVerse-Frontend.git
```

2. Navigate to the project directory:
```bash
cd BlogVerse-Frontend
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Create a `.env` file in the root directory and add necessary environment variables:
```env
REACT_APP_API_URL=your_backend_api_url
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

5. Start the development server:
```bash
npm start
# or
yarn start
```

## 📁 Project Structure

```
src/
├── components/        # Reusable components
├── pages/            # Page components
├── services/         # API services
├── store/            # Redux store configuration
├── utils/            # Utility functions
├── hooks/            # Custom hooks
├── assets/           # Static assets
└── styles/           # Global styles
```

## 🔑 Environment Variables

The following environment variables are required:

- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `REACT_APP_CLOUDINARY_URL`: Cloudinary URL for image uploads

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Rampal Yadav**
  - GitHub: [@rampalyadav0001](https://github.com/rampalyadav0001)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped this project grow
- Special thanks to the React and Redux communities for their excellent documentation
- Icon assets provided by [Hero Icons](https://heroicons.com/)

## 📧 Contact

For any queries or suggestions, please reach out to [your-email@example.com]

---

⭐️ If you find this project helpful, please give it a star!
