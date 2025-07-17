// Contact.jsx
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Contacts = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_1qqflum',       // replace
      'template_acl4lr4',      // replace
      form.current,
      '2AvDM3Q3Z_1NSHCOq'        // replace
    )
    .then(() => {
      alert('Message sent!');
      form.current.reset();
    })
    .catch((error) => {
      alert('Failed to send message.');
      console.error(error);
    });
  };

  return (
    <div id='contact' className='scroll-mt-30 md:scroll-mt-50 w-screen h-130 vh'>
      <div className='flex flex-col items-center justify-center'>
      <h1 className='text-primary text-2xl font-bold'>Contact Form</h1>
    <form ref={form} onSubmit={sendEmail} className="p-4 max-w-md mx-auto space-y-3">
      <input name="name" placeholder="Your Name" required className=" w-full p-2 border" />
      <input name="email" type="email" placeholder="Your Email" required className="w-full p-2 border" />
      <textarea name="message" placeholder="Your Message" required className="w-full p-2 border" />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Send</button>
    </form>
    </div>
    </div>
  );
};

export default Contacts;