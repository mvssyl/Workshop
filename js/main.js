gsap.registerPlugin(ScrollTrigger);

const carousel = document.querySelector(".carousel");
const cells = document.querySelectorAll(".carousel__cell");
const numCells = cells.length; 
const angleStep = 360 / numCells; // 40 degrés

// --- 1. SETUP GÉOMÉTRIQUE (Ton code "Ventilateur") ---
// Pas de Radius complexe, pas de Math.tan. Juste l'angle.
cells.forEach((cell, i) => {
    gsap.set(cell, {
        rotateY: i * angleStep,
        // Z reste à 0 ! C'est ça qui garde tout collé au centre.
    });
});

// --- 2. CENTRAGE (L'Offset) ---
// Actuellement, la scène 1 va de 0° à 40° (elle est à droite).
// Pour l'avoir face à nous, on recule le carrousel de la moitié de l'angle (-20°).
const startOffset = -70;
gsap.set(carousel, { rotateY: startOffset });


// --- 3. ANIMATION SÉQUENTIELLE (Stop & Go) ---
// Au lieu d'un "gsap.to" simple, on fait une Timeline.

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".fenetre-theatre",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Fluidité
        pin: ".scene-container" // On bloque l'écran
    }
});

cells.forEach((cell, i) => {
    
    // A. APPARITION DES ÉLÉMENTS (Le "Stop")
    //const content = cell.querySelectorAll(".hide-at-start");
    
    /*if(content.length > 0) {
        tl.to(content, {
            opacity: 1,
            y: 0,
            duration: 1, // Temps passé à regarder la scène
            stagger: 0.1
        });
        
        // Petite pause statique
        tl.to({}, { duration: 0.5 });
    }*/

    // B. ROTATION VERS LA SUIVANTE (Le "Go")
    if (i < numCells - 1) {
        
        // Optionnel : Faire disparaitre les éléments avant de tourner
        // tl.to(content, { opacity: 0, duration: 0.5 });

        // Calcul de l'angle cible :
        // Angle actuel (startOffset) - (Numéro de la prochaine scène * 40°)
        const nextAngle = startOffset - ((i + 1) * angleStep);

        tl.to(carousel, {
            rotateY: nextAngle,
            duration: 2, // Le voyage est plus long que l'anim interne
            ease: "power2.inOut" // Mouvement fluide
        });
    }
});