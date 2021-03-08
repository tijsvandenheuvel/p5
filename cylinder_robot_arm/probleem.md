# cylinder robot arm

In dit project probeer ik om een digitale versie van een cylindrische robot arm te maken

Ik doe dit met P5, een javascript library waarmee je makkelijk visualisaties kan maken 

en zonder al te veel gedoe in een webbrowser kan runnen

om dit programma te starten open dus gewoon het 'index.html' bestand in een browser.

Je kan ook altijd de pagina herladen als er iets mis gaat. 

## wat is de bedoeling ? 

Het gaat hier over een robot met een aantal cylindervormige modules 

die ten opzichte van elkaar kunnen bewegen in 2 mogelijke richtingen

- rond eigen as
- open-toe beweging rond een scharnierpunt

We willen hierbij van elk punt de coordinaten berekenen 

op basis van de afmetingen en de gemaakte hoeken

het uiteindelijke doel is om die robot in een richting te sturen en 

zelf te laten uitrekenen welke hoeken het daarvoor moet aannemen.

Joris (pa van Pippa) wil dit graag in het echt bouwen en daarvan kwam dit project dus.

## probleem

In P5 is het vrij simpel om zo een cylindervormige robot te maken zoals in de demo.

De manier waarop P5 dit doet is door elk schijfke te tekenen en 

het gehele assenstelsel te transleren of roteren naar de volgende plek en 

daar het volgende schijfke tekenen.

Op deze manier weet je dus niet wat de totale afstand is tussen het eerste punt en een aantal punten verder.

Ik ben al best ver geraakt in het zelf berekenen van de vectoren van de verschillende punten maar

ik zit muurvast bij de rotatie om eigen as nadat er al rond een scharnier is geroteerd.

In 3 dimensies draaien rond een vector blijkt ni simpel.

Ik heb al dingen geprobeerd met rotatiematrixen ma ik snap er eigelijk ni veel meer van.

Het grootste deel van het schouwspel speelt zich af in de cylinder_bot.js file en 

meerbepaald in de getVectors() functie.

Ik heb geprobeerd om alle code in deze file zo duidelijk mogelijk te commentarien

Ik hoop da ge er een beetje aan uit kunt. 


