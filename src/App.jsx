/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */


// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

const APP = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
      </main>
    </>
  )
}

export default APP;