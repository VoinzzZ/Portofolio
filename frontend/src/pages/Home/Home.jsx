import React from 'react';
import SplitText from './../../components/Text/SplitText.jsx';
import Lanyard from '../../components/Animation/Lanyard/Lanyard.jsx';
import RotatingText from '../../components/Text/RotatingText.jsx';
import '../../styles/animations.css';

const Home = () => {
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    const splitTextProps = {
        className: "text-4xl font-bold text-white text-left",
        delay: 150,
        animationFrom: { opacity: 0, transform: 'translate3d(0,50px,0)' },
        animationTo: { opacity: 1, transform: 'translate3d(0,0,0)' },
        easing: "easeOutCubic",
        threshold: 0.2,
        rootMargin: "-50px",
        onLetterAnimationComplete: handleAnimationComplete,
    };

    return (
        <div className="relative h-full flex justify-between items-center">
            <div className="flex flex-col pl-20 ml-50 scale-in delay-300">
                <div className="mb-4 fade-in-up">
                    <SplitText text="Hello, I'm" {...splitTextProps}
                    className={`${splitTextProps.className} text-2xl`}
                    />
                </div>

                <div className="fade-in-up delay-100">
                    <SplitText
                        text="Antony Kurnawan"
                        className={`${splitTextProps.className} mb-10 text-6xl`}
                    />
                </div>

                <div className="flex items-center gap-2 mt-8 fade-in-up delay-200">
                    <SplitText text="As" {...splitTextProps} />
                    <RotatingText
                        texts={[
                            'Software Engineering Students',
                            'Junior FE Developer',
                            'Junior Web Developer',
                        ]}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg font-extrabold scale-in"
                        staggerFrom="last"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-120%' }}
                        staggerDuration={0.020}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: 'spring', damping: 40, stiffness: 450 }}
                        rotationInterval={2000}
                    />
                </div>
            </div>

            <div className="flex-1 flex justify-end pr-20 scale-in delay-300">
                <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </div>
        </div>
    );
};

export default Home;
