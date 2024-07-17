import Link from "next/link";
import { motion } from "framer-motion";
const containerPromoSection = delay => ({
  hidden: { x: -150, opacity: 0 },
  visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: delay },
  },
});

export default function HomePromoSection() {
    return (
      <div className="relative overflow-hidden bg-white ">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <motion.h1
                variants={containerPromoSection(0)}
                initial='hidden'
                animate='visible'
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Summer styles are finally here
              </motion.h1>
              <motion.p
                variants={containerPromoSection(0.25)}
                initial='hidden'
                animate='visible'
                className="mt-4 text-xl text-gray-500"
              >
                This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care
                if you live or die.
              </motion.p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                      >
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="/asset/img/promo7.png"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="/asset/img/promo2.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </motion.div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          className="h-64 w-44 overflow-hidden rounded-lg"
                        >
                          <img
                            src="/asset/img/promo3.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="h-64 w-44 overflow-hidden rounded-lg"
                        >
                          <img
                            src="/asset/img/promo1.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          className="h-64 w-44 overflow-hidden rounded-lg"
                        >
                          <img
                            src="/asset/img/promo5.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </motion.div>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                      >
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="/asset/img/promo6.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="/asset/img/promo4.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <motion.div
                  variants={containerPromoSection(0.5)}
                  initial='hidden'
                  animate='visible'
                >
                  <Link
                    href={"/collections/all"}
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                  >
                    Shop Collection
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  