import Link from "next/link"
import { motion } from "framer-motion"
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
  http://localhost:3000/collections/hats
*/
const callouts = [
    {
      name: 'Summer',
      imageSrc: '/asset/img/collection-tshirt.jpg',
      imageAlt: 'Summer collection',
      href: '/collections/tops',
    },
    {
      name: 'Spring',
      imageSrc: '/asset/img/collection-hoodie.jpg',
      imageAlt: 'Spring collection',
      href: '/collections/outer-wears',
    },
    {
      name: 'Hat',
      imageSrc: '/asset/img/collection-hat.png',
      imageAlt: 'Hat collection',
      href: '/collections/hats',
    },
  ]
  
  export default function HomeCategoryPreview() {
    return (
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout,i) => (
                <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.5 }}
                  key={callout.name} 
                >
                  <Link    
                    href={callout.href} 
                    className="group relative pointer "
                  >
                    <div className="relative w-full overflow-hidden rounded-lg mb-4 bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <img
                        src={callout.imageSrc}
                        alt={callout.imageAlt}
                        className="h-full w-full object-contain md:object-cover"
                      />
                    </div>
                    <h3 className="hidden md:block mb-8 text-base font-semibold text-gray-900">
                      <div>
                        <span className="absolute inset-0" />
                        {callout.name}
                      </div>
                    </h3>
                    {/* <p className="text-base font-semibold text-gray-900">{callout.description}</p> */}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  