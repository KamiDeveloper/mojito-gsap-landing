import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { openingHours, socials } from "../../constants"
import { SplitText } from "gsap/all"

const Contact = () => {

    useGSAP(() => {
        const titleSplit = SplitText.create('#contact h2', { type: "words" })
        const timeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: "top center"
            },
            ease: "power1.inOut"
        })
        timeLine
            .from(titleSplit.words, {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02,
            })
            .from('#contact h3, #contact p', {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02,
            })
            .to('#f-right-leaf', {
                y: '-50',
                duration: .5,
                ease: "power1.inOut"
            })
            .to('#f-left-leaf', {
                y: '50',
                duration: .5,
                ease: "power1.inOut"
            }, '<')
    }, [])
    return (
        <footer id="contact">
            <img src="images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" />
            <img src="images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" />
            <div className="content">
                <h2>Where to Find Us</h2>
                <h3>Visit Our Bar</h3>
                <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
                <div>
                    <h3>Contact Us</h3>
                    <p>(555) 987 -6543</p>
                    <p>hello@mojito.com</p>
                </div>
                <div>
                    <h3>Open Every Day</h3>
                    {openingHours.map((time) => (
                        <p key={time.day}>
                            {time.day}: {time.time}
                        </p>
                    ))}
                </div>
                <div>
                    <h3>Socials</h3>
                    <div className="flex-center gap-5">
                        {socials.map((social) => (
                            <a href={social.url}
                                key={social.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                            >
                                <img src={social.icon} alt={social.name} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Contact