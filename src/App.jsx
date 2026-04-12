import Nav        from './components/Nav'
import Hero       from './components/Hero'
import Portfolio  from './components/Portfolio'
import About      from './components/About'
import Pricing    from './components/Pricing'
import HowItWorks from './components/HowItWorks'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

// Divider between major sections
function GoldDivider() {
  return <hr className="divider-gold mx-auto w-32 md:w-48" />
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Portfolio />
        <GoldDivider />
        <About />
        <GoldDivider />
        <Pricing />
        <GoldDivider />
        <HowItWorks />
        <GoldDivider />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
