import React from 'react';
import BlurText from "../../components/Text/BlurText/BlurText.jsx";
import SplitText from "../../components/Text/SplitText.jsx";
import ScrollReveal from '../../components/Text/ScrollReveal/ScrollReveal.jsx';
import { TextGenerateEffect } from "../../components/Text/TextGenerateEffect.jsx";
import PixelTransition from '../../components/Animation/PixelTransition/PixelTransition.jsx';

const About = () => {
    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    return (
        <div className="container mx-auto flex min-h-screen items-center">
            <div className='mr-8 ml-20'>
                <PixelTransition
                    firstContent={
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
                            alt="default pixel transition content, a cat!"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    }
                    secondContent={
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                            }}
                        >
                            <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
                        </div>
                    }
                    gridSize={12}
                    pixelColor="#ffffff"
                    animationStepDuration={0.4}
                    className="custom-pixel-card"
                />
            </div>
            <div className="flex flex-col items-start">
                <BlurText
                    text="About Me"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-6xl font-bold text-white mb-12"
                />
                <div className="space-y-8">
                    <SplitText
                        text="Who am I?"
                        className="text-4xl font-semibold text-cyan-300"
                    />
                    <TextGenerateEffect
                        duration={1.5}
                        filter={true}
                        words={`I am a passionate Software Engineering student and Junior Frontend
                        Developer with a keen interest in creating beautiful, functional,
                        and user-friendly web applications. I am always eager to learn new technologies and improve my skills.`}
                    />
                </div>
            </div>
        </div>
    );
};

export default About;
