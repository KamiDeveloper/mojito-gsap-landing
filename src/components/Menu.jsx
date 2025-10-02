'use client';

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { allCocktails } from "../../constants"
import { useRef, useState } from "react";

const Menu = () => {

    const contentRef = useRef()

    const totalCocktails = allCocktails.length

    const [currentIndex, setCurrentIndex] = useState(0)


    useGSAP(() => {
        gsap.fromTo('#title', {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut"
        })

        gsap.fromTo('.cocktail img', {
            opacity: 0, xPercent: -100, rotate: -15
        }, {
            xPercent: 0, opacity: 1, rotate: 0,
            duration: 2,
            ease: "elastic.out(1, 0.5)"
        })
        gsap.fromTo('.details h2, .details p', {
            opacity: 0,
            yPercent: 25,
        }, {
            opacity: 1,
            yPercent: 0,
            duration: .5,
            ease: "power1.inOut",
            stagger: 0.5
        })

    }, [currentIndex])

    useGSAP(() => {
        const parallaxTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#menu',
                start: 'top 30%',
                end: 'bottom 80%',
                scrub: true
            }
        })

        parallaxTimeLine.from('#m-left-leaf', {
            x: -200,
        }).from('#m-right-leaf', {
            x: 200
        }, '<')

    }, [])


    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails
        setCurrentIndex(newIndex)
    }

    const getCocktailAt = (indexOffset) => {
        return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
    }
    const [currentCocktail, prevCocktail, nextCocktail] = [getCocktailAt(0), getCocktailAt(-1), getCocktailAt(1)]

    return (
        <section id="menu" aria-labelledby="menu-heading">
            <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
            <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />
            <h2 id="menu-heading" className="sr-only">Cocktail Menu</h2>
            <nav className="cocktail-tabs" aria-label="Cocktail navigation">
                {allCocktails.map((cocktail, index) => {
                    const isActive = index === currentIndex
                    return (
                        <button
                            key={cocktail.id}
                            className={`${isActive
                                ? 'text-white border-white'
                                : 'text-white/50 border-white/50'}`}
                            onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>
            <div className="content">
                <div className="arrows">
                    <button
                        className="text-left"
                        onClick={() => goToSlide(currentIndex - 1)}
                    >
                        <span> {prevCocktail.name}</span>
                        <img src="/images/right-arrow.png" alt="right arrow" aria-hidden="true" />
                    </button>
                    <button
                        className="text-left"
                        onClick={() => goToSlide(currentIndex + 1)}
                    >
                        <span> {nextCocktail.name}</span>
                        <img src="/images/left-arrow.png" alt="left arrow" aria-hidden="true" />
                    </button>
                </div>
                <div className="cocktail">
                    <img src={currentCocktail.image} alt={currentCocktail.name} className="object-contain" />
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
    )
}

export default Menu