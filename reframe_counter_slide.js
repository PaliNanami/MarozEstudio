const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const target = `                        <!-- Slide 2 -->
                        <div class="carousel-slide absolute inset-0 opacity-0 scale-95 z-0" data-project="02: VERDI Coffee Tea Shop - Barra">
                            <img src="assets/verdi-counter.jpg" alt="Diseño de barra y mostrador de VERDI Coffee Tea Shop por MAROZ Estudio" class="w-full h-full object-cover object-center">
                        </div>`;

const replacement = `                        <!-- Slide 2 -->
                        <div class="carousel-slide absolute inset-0 opacity-0 scale-95 z-0" data-project="02: VERDI Coffee Tea Shop - Barra">
                            <img src="assets/verdi-counter.jpg" alt="Diseño de barra y mostrador de VERDI Coffee Tea Shop por MAROZ Estudio" class="w-full h-full object-cover object-bottom">
                        </div>`;

c = c.replace(target, replacement);
fs.writeFileSync('index.html', c, 'utf8');
console.log('Successfully changed the object position to object-bottom for the Verdi counter slide!');
