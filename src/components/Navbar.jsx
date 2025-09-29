import { useGSAP } from "@gsap/react"
import { navLinks } from "../../constants"
import gsap from "gsap"

const Navbar = () => {

    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: "nav",
                start: "bottom top",
                scrub: true
            }
        })
        navTween.fromTo('nav', {
            backgroundColor: '#0000'
        }, {
            backgroundColor: '#0005',
            backgroundFilter: 'blur(10px)',
            ease: 'power4.Out'
        })
    }, [])


    return (
        <nav>
            <div>
                <a href="#home" className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="Logo" />
                    <p>Velvet Pour</p>
                </a>

                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar