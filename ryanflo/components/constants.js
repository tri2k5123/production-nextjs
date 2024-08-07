import { SparklesIcon, FireIcon, StarIcon } from '@heroicons/react/20/solid'

// poster
export const posters = [
  `url(/asset/img/poster.png)`,
  `url(/asset/img/slideshow_1.webp)`,
  `url(/asset/img/slideshow_2.webp)`,
]

// About
export const features = [
  {
    name: 'Ryan',
    description:
      'is a new brand built in a streetwear style mixed with a bit of simplicity and aesthetics',
    icon: SparklesIcon,
  },
  {
    name: 'Exclusivity and Limitation',
    description: 'We will only sell some products in limited quantities, and some products are only available on the website',
    icon: FireIcon,
  },
  {
    name: 'Your choice & Your vibe',
    description: 'We hope we can give you a best vibe, cheer!',
    icon: StarIcon,
  },
]

export const aboutInfo = {
  title: 'RYAN FLORIDA CLOTHING BRAND',
  desc: 'Ryan focuses on the form and quality of the products, and the comfort of people wearing them',
  img: '/asset/img/about.png',
  alt: 'Image About Ryan'
}

// Category
export const callOuts = [
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

// NewLetterSection
export const society = [
  {
    link: 'https://www.facebook.com/B999999999999',
    icon: '/asset/img/logofacebook.png',
    alt: 'Facebook'
  },
  {
    link: 'https://www.instagram.com/ryanflorida.clo/',
    icon: '/asset/img/logoinsta.png',
    alt: 'Instagram'
  },
  {
    link: 'https://www.tiktok.com/@ryanflorida.clo',
    icon: '/asset/img/logotiktok.png',
    alt: 'Tiktok'
  }
]
export const letterContent = {
  title: 'Your review is our pleasure.',
  desc: "Don't hesitate to comment if you have any questions, interface errors or even something you don't like about our website."
}

export const listPaymentMethod = [
  {
    icon: "/asset/img/COD.svg",
    name: "COD",
    title: "Cash On Delivery (COD)",
    desc: "Pay when you receive"
  },
  {
    icon: "/asset/img/banking.png",
    name: "Credit card",
    title: "Credit card",
    desc: "Make payments online"
  }
]