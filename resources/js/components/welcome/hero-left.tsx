import { ShoppingCart } from 'lucide-react';

const HeroTextSection = () => {
    return (
        <section className="flex w-1/2 flex-col justify-evenly">
            <div className="space-y-5">
                <div className="relative flex w-max items-center rounded-full bg-ambyRed-100/40 py-1 pr-3 pl-10 text-sm font-semibold text-ambyRed-300">
                    <span className="absolute left-1 text-2xl drop-shadow-md">🍔</span>
                    Amby Dated Foods
                </div>

                <div className="text-5xl leading-tight font-bold">
                    <h1 className="">Pure Date Syrup</h1>
                    <h1>Endless Possibilities</h1>
                </div>

                <div className="text-sm font-semibold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla officia, eveniet non, quidem aut provident debitis atque magni
                    aspernatur architecto harum, eligendi perferendis sed! Rerum fugit quo ut sunt consequatur?
                </div>
            </div>

            <div className="flex w-max cursor-pointer items-center rounded-full bg-black py-1.5 pr-12 pl-1.5 shadow-lg transition-all duration-150 hover:scale-105 hover:shadow-xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ambyYellow-600">
                    <ShoppingCart className="h-5 w-5 text-black" />
                </span>
                <span className="ml-7 text-sm font-semibold text-white">Buy Now</span>
            </div>
        </section>
    );
};

export default HeroTextSection;
