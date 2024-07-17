import { society, letterContent } from '../constants';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function HomeNewLetterSection() {
  const [sending, setSending] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(prev => !prev)
    emailjs
      .sendForm('service_wosqvbk', 'template_qgtb7ea', form.current, {
        publicKey: 'qAThYA3xGs86bsKax',
      })
      .then(
        () => {
          e.target.reset();
          setSending(prev => !prev)

        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div id='contact' className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="w-full flex flex-col justify-between items-center lg:items-start gap-x-16 lg:flex-row">
          <div className="max-w-2xl  text-center items-center flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{letterContent.title}</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              {letterContent.desc}
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <form ref={form} onSubmit={sendEmail} className="text-sm max-w-3xl mx-auto">
                <input type="text" name="from_name" className="mb-3 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#16B8FF] sm:text-sm sm:leading-6 w-full" placeholder="Your Name" required />
                <input type="email" name="from_email" className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#16B8FF] sm:text-sm sm:leading-6 w-full" placeholder="Your Email" autoComplete="email" required />
                <textarea name="message" className="my-3 text-sm min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#16B8FF] sm:text-sm sm:leading-6 w-full" placeholder="Your Message" rows="5" required></textarea>
                <button type={`${sending ? 'button' : 'submit'}`} value='Send' className={`py-4 px-8 text-sm font-semibold rounded-md ${sending ? `bg-gray-500 cursor-default` : `text-[#111827] bg-[#16B8FF] hover:text-[#16B8FF]  transition-colors duration-500 hover:bg-white cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16B8FF]`}`}>
                  {sending ? "Sending..." : "Submit"}

                </button>
              </form>
            </div>
          </div>
          <dl className="mt-5 lg:mt-0 grid grid-cols-1 gap-x-8 gap-y-10 max-w-sm">
            <div className="flex flex-col items-center text-center">

              <dt className="my-4 md:mt-0 text-3xl font-semibold text-white">Contact us by</dt>
              <dd className="mt-2 leading-7 text-gray-400 flex gap-5 flex-wrap flex-row justify-center">
                {society.map(({ link, icon, alt }) => (
                  <Link key={link} href={link} className='w-[12%]'>
                    <img src={icon} alt={alt} className='inline-block text-3xl rounded-xl ' />
                  </Link>

                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}
