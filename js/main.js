"use strict";

const dataList = {
    "aquaculture-production": "data/aquaculture-production.json",
    "average-surfece-temperature": "data/average-surfece-temperature.json",
    "capture-fishery-production": "data/capture-fishery-production.json",
    "children-per-woman": "data/children-per-woman.json",
    "daily-calories-supply": "data/daily-calories-supply.json",
    "homocide-rate": "data/homocide-rate.json",
    "hours-per-worker": "data/hours-per-worker.json",
    "international-trips-for-personal-reasons": "data/international-trips-for-personal-reasons.json",
    "konbini-count": "data/konbini-count.json",
    "life-expectancy-at-birth": "data/life-expectancy-at-birth.json",
    "manga-physical-sales": "data/manga-physical-sales.json",
    "objects-launched-into-outer-space": "data/objects-launched-into-outer-space.json",
    "population-by-age-group": "data/population-by-age-group.json",
    "population": "data/population.json",
    "share-new-cars-electric": "data/share-new-cars-electric.json",
    "share-of-land-area-used-for-agriculture": "data/share-of-land-area-used-for-agriculture.json",
    "data/shinkansen-delay": "data/shinkansen-delay.json",
    "solar-energy-capacity": "data/solar-energy-capacity.json",
    "tsunami-count": "data/tsunami-count.json",
    "whale-killed": "data/whale-killed.json"
}

const loadData = async (url) => {
    const response = await fetch(url);
    const values = await response.json();
    return values;
};

loadData(dataList["aquaculture-production"])
    .then((values) => {
        console.log(values);
    });

gsap.registerPlugin(ScrollTrigger);

const bande = document.querySelector(".bande-histoire");

function scrollMouvement() {
    let bandeWidth = bande.scrollWidth;
    return - (bandeWidth - window.innerWidth);
}

const tween = gsap.to(bande, {
    x: scrollMouvement,
    ease: "none",
    duration: 3,
});

const sections = gsap.utils.toArray("[class*='part-']");

sections.forEach((section, i) => {
    gsap.fromTo(section,
        {
            rotateY: -45,
            scale: 0.8,
            opacity: 0.5,
        },
        {
            rotateY: 45,
            scale: 0.8,
            opacity: 0.5,
            ease: "none",
        

            ScrollTrigger: {
                trigger: section,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
            }
        }
    
    );

    gsap.fromTo(section,
        { scale: 0.8, opacity: 0.5},
        {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            ease: "power1.inOut",
            repeat: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: section,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
            }
        }
    );
});

ScrollTrigger.create({
    trigger: ".fenetre-theatre",
    start: "top top",
    end: () => "+=" + (scrollMouvement() * -1),
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    snap: 1 / (9-1)
});