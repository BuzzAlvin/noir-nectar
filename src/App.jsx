import { ScrollTrigger, SplitText} from "gsap/all";
import gsap from "gsap";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
    </main>
  )
}

export default App
