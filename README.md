# MoodleExperts - Professional Moodle Services Website

A modern, responsive website showcasing professional Moodle services including hosting, administration, development, and support.

## 🎯 Features

### Responsive Design
- Fully responsive and mobile-friendly
- Bootstrap 5 framework for consistent styling
- Works perfectly on all devices and screen sizes

### Services Showcase
1. **Moodle Hosting**
   - VPS Hosting
   - Onsite Servers (Linux)
   - High Performance
   - 24/7 Monitoring

2. **Moodle Administration**
   - Configuration & Setup
   - Custom Settings
   - User Management
   - Maintenance

3. **Moodle Development**
   - Custom Plugins
   - Dashboards & Reports
   - Custom Themes
   - Articulate 360 Integration

4. **Moodle Coordination & Support**
   - Staff Training
   - 24/7 Support
   - Technical Assistance
   - Best Practices Guidance

### Key Sections
- **Hero Section** - Eye-catching landing area with call-to-action
- **Services Section** - Detailed service cards with features
- **Why Choose Us** - Six compelling reasons to work with you
- **Pricing Section** - Four flexible pricing tiers
- **Contact Form** - Interactive form with validation
- **Footer** - Social media links and company info

### Technology Stack
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with animations
- **Bootstrap 5** - Responsive framework
- **JavaScript** - Form validation and interactivity
- **Font Awesome** - Professional icons

## 📁 File Structure

```
Websites Moodle/
├── index.html          # Main website (single page)
├── css/
│   └── style.css       # Custom styling
├── js/
│   └── script.js       # JavaScript functionality
└── images/             # Placeholder for images
```

## 🚀 How to Use

### 1. **Local Development**
   - Open `index.html` directly in your web browser
   - No server required for static files
   - Use a code editor like VS Code for editing

### 2. **Customization**
   
   **Update Company Information:**
   - Replace "MoodleExperts" with your company name
   - Update contact details (phone, email, address)
   - Modify pricing and service descriptions

   **Add Your Logo:**
   - Replace the brand name in navbar with your logo
   - Update social media links in footer

   **Change Colors:**
   - Primary color: `#667eea` (purple)
   - Secondary: `#764ba2` (dark purple)
   - Search `#667eea` and `#764ba2` in CSS to change theme colors

   **Add Real Images:**
   - Replace placeholder image URLs with your Moodle screenshots
   - Update image URLs in the hero section and service cards

### 3. **Deployment**

   **Option A: Shared Hosting**
   - Upload files via FTP to your web server
   - Ensure all files are in correct directory structure

   **Option B: Cloud Services**
   - Deploy to Netlify (drag & drop)
   - Deploy to Vercel (Git integration)
   - Deploy to GitHub Pages (free hosting)
   - Deploy on AWS S3 (static website hosting)

   **Option C: Your Own Server**
   - Copy all files to web server
   - Ensure proper permissions

### 4. **Setting Up Email Form**

   Currently, the contact form shows a success message. To make it functional:

   **Backend Option (PHP):**
   ```php
   // Save this as process-form.php
   if ($_SERVER['REQUEST_METHOD'] == 'POST') {
       $to = "your-email@example.com";
       $subject = "New Contact Form Submission";
       $message = "Name: {$_POST['name']}\nEmail: {$_POST['email']}\nService: {$_POST['service']}\nMessage: {$_POST['message']}";
       
       mail($to, $subject, $message);
   }
   ```

   **Backend Option (Node.js/Express):**
   - See "Node.js Integration" section below

   **Alternative: Third-party Services**
   - Use Formspree.io
   - Use EmailJS
   - Use Firebase Backend

### 5. **SEO Optimization**

   Update the `<meta>` tags in `index.html`:
   ```html
   <meta name="description" content="Professional Moodle services...">
   <meta name="keywords" content="Moodle hosting, Moodle development...">
   <meta name="author" content="Your Name">
   ```

## 🎨 Customization Guide

### Change Theme Colors
1. Open `css/style.css`
2. Find color values:
   - `#667eea` - Primary (purple)
   - `#764ba2` - Secondary (dark purple)
3. Replace with your brand colors

### Update Site Content
1. **Hero Section** - Edit text in `index.html` lines 72-80
2. **Services** - Update service cards (lines 95-170)
3. **Pricing** - Modify pricing cards (lines 254-316)
4. **Contact Info** - Update footer (lines 358-372)

### Add Animations
- CSS animations are in `css/style.css`
- JavaScript scroll animations in `js/script.js`
- Customizable animation speeds and effects

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Tips
1. Never commit sensitive information (API keys, passwords)
2. Use HTTPS when deploying
3. Validate all form inputs on server-side
4. Keep dependencies updated

## 📞 Contact Form Integration

### Using Formspree
1. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Using EmailJS
```javascript
emailjs.init("YOUR_PUBLIC_KEY");

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('service_id', 'template_id', this);
});
```

## 🚀 Performance Tips

1. **Optimize Images**
   - Compress images before uploading
   - Use WebP format when possible
   - Use lazy loading for images

2. **Minify Files**
   - Minify CSS and JavaScript
   - Remove unused CSS

3. **Caching**
   - Enable browser caching
   - Use CDN for fast delivery

## 📊 Analytics

Add Google Analytics:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Insert before closing `</head>` tag.

## 🐛 Troubleshooting

### Styles not loading?
- Check file paths in `index.html`
- Verify CSS file is in `css/` folder

### Form not working?
- Check browser console for errors (F12)
- Ensure JavaScript file is loaded
- Verify form has correct IDs

### Images not displaying?
- Check image file paths
- Verify image files exist in correct folder
- Use absolute URLs for external images

## 📝 Maintenance Checklist

- [ ] Update testimonials/case studies quarterly
- [ ] Monitor contact form submissions
- [ ] Update service pricing as needed
- [ ] Add new portfolio items
- [ ] Update team information
- [ ] Check broken links monthly
- [ ] Update copyright year in footer
- [ ] Monitor Google Analytics

## 📄 License

This website template is free to use and modify for your business.

## 💡 Tips for Success

1. **Add Real Testimonials** - People trust social proof
2. **Showcase Case Studies** - Show your work and results
3. **Include Your Team** - Add team member photos and bios
4. **Regular Updates** - Keep content fresh and current
5. **Mobile First** - Test thoroughly on mobile devices
6. **SEO Optimization** - Use relevant keywords
7. **Fast Loading** - Optimize images and code
8. **Clear CTAs** - Make it easy to contact you

## 🎓 Learning Resources

- Bootstrap Docs: https://getbootstrap.com/docs
- MDN Web Docs: https://developer.mozilla.org
- Font Awesome Icons: https://fontawesome.com/icons
- CSS Animations: https://www.w3schools.com/css/css3_animations.asp

## 📞 Support

For questions about Moodle services, contact your local Moodle partner or visit https://moodle.org

---

**Happy selling! 🚀**
