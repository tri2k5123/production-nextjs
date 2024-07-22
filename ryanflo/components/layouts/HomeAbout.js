import { features, aboutInfo } from '../constants';
import { animateContentAbout, animateImageAbout } from '../animate';
import { motion } from "framer-motion";

export default function HomeAbout() {
  return (
    <div id="about" className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
              <motion.p 
                variants={animateContentAbout(0)}
                initial="hidden"
                whileInView="visible"
                className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                {aboutInfo.title}
              </motion.p>
              <motion.p 
                variants={animateContentAbout(0.2)}
                initial="hidden"
                whileInView="visible"
                lassName="mt-6 text-lg leading-8 text-gray-600"
              >
                {aboutInfo.desc}
              </motion.p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <motion.div 
                  variants={animateContentAbout(feature.id * 0.3)}
                  initial="hidden"
                  whileInView="visible"
                    key={feature.name} 
                    className="relative pl-9"
                  >
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-[#16B8FF]" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
          <motion.img
            variants={animateImageAbout(0)}
            initial="hidden"
            whileInView="visible"
            src={aboutInfo.img}
            alt={aboutInfo.alt}
            className="w-[24rem] max-w-none rounded-sm ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}
