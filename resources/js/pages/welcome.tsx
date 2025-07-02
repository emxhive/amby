import HeaderNav from '@/components/welcome/HeaderNav';
import HeroTextSection from '@/components/welcome/hero-left';
import { pi } from '@/lib/utils';
import ss from '../../css/welcome.module.css';

const LandingPage: React.FC = () => {
    return (
        <div className={ss.bgWrap}>
            {/* <div className={ss.bgGlowRed}></div>
            <div className={ss.bgGlowOrange}></div>
            <div className={ss.bgOverlay}></div> */}
            <div className={`m-auto flex h-dvh max-h-dvh max-w-[1280px] flex-col px-20`}>
                <HeaderNav />

                <main className="flex flex-1">
                    <HeroTextSection />
                    <div className="relative m-auto flex aspect-square w-1/3 items-center justify-center rounded-full bg-ambyYellow-100">
                        <img src={pi('dated-popcorn.png')} className="absolute bottom-1/4 w-sm" />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LandingPage;
