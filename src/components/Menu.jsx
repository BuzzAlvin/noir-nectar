import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { allCocktailList } from "../../constants";
import { useMediaQuery } from "react-responsive";

const Menu = () => {
    const contentRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = useMediaQuery({maxWidth: 768});

  useGSAP(() => {
    const start = isMobile ? 'top 80%' : 'top bottom';
    const end = isMobile ? 'bottom center' : 'bottom 20%'
    gsap.fromTo('#title', {opacity: 0}, {opacity: 1, duration: 1});
    gsap.fromTo('.cocktail img', {opacity: 0, xPercent: -100}, {
        xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
    })
    gsap.fromTo('.details h2', {yPercent: 100, opacity: 0}, {
        yPercent: 0, opacity: 1, ease: 'power1.inOut'
    })
    gsap.fromTo('.details p', {yPercent: 100, opacity: 0}, {
        yPercent: 0, opacity: 1, ease: 'power1.inOut'
    })
    //animation for leaves
    gsap.timeline({
        scrollTrigger: {
            trigger: '#menu',
            start,
            end,
            scrub: true
        }
    })
    .fromTo("#m-right-leaf", {x: 50}, {x: 0})
    .fromTo("#m-left-leaf", { x: -50}, { x: 0})
  }, [currentIndex])

  const totalCocktail = allCocktailList.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktail) % totalCocktail;
    setCurrentIndex(newIndex);
  };

  //cocktail calculations
  const getCocktailAt = (indexOffset) => {
    return allCocktailList[
      (currentIndex + indexOffset + totalCocktail) % totalCocktail
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);
  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktailList.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${isActive ? "text-white border-white" : "text-white/50 border-white/50"}`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} className="object-contain" />
        </div>

        <div className="recipe">
            <div ref={contentRef} className="info">
                <p>Recipe for:</p>
                <p id="title">{currentCocktail.name}</p>
            </div>

            <div className="details">
                <h2>{currentCocktail.title}</h2>
                <p>{currentCocktail.description}</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
