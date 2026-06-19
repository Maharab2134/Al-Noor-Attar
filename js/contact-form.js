/**
 * contact-form.js - Al Noor Attar Form Validation & Transmission Mimicking
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset styles
    statusBox.style.display = 'none';
    statusBox.classList.remove('success', 'error');

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const service = document.getElementById('form-service').value;
    const message = document.getElementById('form-message').value.trim();

    // Client-side validations
    const isBengali = document.documentElement.lang === 'bn';

    if (!name || !email || !service || !message) {
      showStatus(
        isBengali ? 'দয়া করে সব আবশ্যকীয় ক্ষেত্র পূরণ করুন।' : 'Please fill in all required fields.',
        'error'
      );
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus(
        isBengali ? 'দয়া করে একটি সঠিক ইমেইল সাবমিট করুন।' : 'Please enter a valid email address.',
        'error'
      );
      return;
    }

    // Start Sending State
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = isBengali ? 'অনুসন্ধান পাঠানো হচ্ছে...' : 'Transmitting Inquiry...';
    submitBtn.style.opacity = '0.7';

    // Mock delay (1.5 seconds)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      showStatus(
        isBengali 
          ? 'ধন্যবাদ! আপনার অনুসন্ধানটি আমাদের এতিলেয়ারে সফলভাবে পৌঁছেছে। একজন সুগন্ধি উপদেষ্টা শিগগিরই যোগাযোগ করবেন।' 
          : 'Inquiry transmitted successfully! A fragrance advisor will contact you within 24 hours.',
        'success'
      );
      form.reset();
    } catch (err) {
      showStatus(
        isBengali ? 'দুঃখিত, কোনো একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'An error occurred. Please try again.',
        'error'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '';
    }
  });

  function showStatus(msg, type) {
    statusBox.textContent = msg;
    statusBox.style.display = 'block';
    statusBox.classList.add(type);
    
    // Auto Scroll slightly to status box if needed
    statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});
