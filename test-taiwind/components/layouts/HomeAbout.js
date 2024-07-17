import { CloudArrowUpIcon, LockClosedIcon, ServerIcon, SparklesIcon, FireIcon, StarIcon } from '@heroicons/react/20/solid'
import { motion } from "framer-motion"

const animateContentAbout = delay => ({
  hidden: { x: -150, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay  }
  }
})
const animateImageAbout = delay => ({
  hidden: { x: 300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, delay  }
  }
})

const features = [
  {
    id: 1,
    name: 'Ryan',
    description:
      'is a new brand built in a streetwear style mixed with a bit of simplicity and aesthetics',
    icon: SparklesIcon,
  },
  {
    id: 2,
    name: 'Exclusivity and Limitation',
    description: 'We will only sell some products in limited quantities, and some products are only available on the website',
    icon: FireIcon,
  },
  {
    id: 3,
    name: 'Your choice & Your vibe',
    description: 'We hope we can give you a best vibe, cheer!',
    icon: StarIcon,
  },
]

export default function HomeAbout() {
  return (
    <div id="about" className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">About RyanFlorida</h2> */}
              <motion.p 
                variants={animateContentAbout(0)}
                initial="hidden"
                whileInView="visible"
                className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                RYAN FLORIDA CLOTHING BRAND
              </motion.p>
              <motion.p
                variants={animateContentAbout(0.2)}
                initial="hidden"
                whileInView="visible"
                className="mt-6 text-lg leading-8 text-gray-600"
              >
                Ryan focuses on the form and quality of the products, and the comfort of people wearing them
              </motion.p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature, i) => (
                  <motion.div
                    variants={animateContentAbout(feature.id * 0.3)}
                    initial="hidden"
                    whileInView="visible"
                    key={feature.name}
                    className="relative pl-9"
                  >
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
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
            src="/asset/img/about.png"
            alt="Product screenshot"
            width={2432}
            height={1442}
            className="w-[24rem] max-w-none rounded-sm ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
