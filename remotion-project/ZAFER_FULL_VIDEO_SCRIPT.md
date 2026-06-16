# Zafer — Script Motion Design (vidéo complète ~45s)

> Brief créatif à destination d'un motion designer freelance.
> Calqué image par image sur la vidéo de référence "Kolize" (1600.agency, 44.65s / 60fps / 2622×1206), même rythme, même grammaire d'animation, mêmes durées de plan — adapté à l'univers Zafer (marketplace P2P de confiance, île Maurice).
> **Ce document ne contient aucun code.** Il décrit textes, visuels et animations à produire dans l'outil du designer (After Effects, Figma/Lottie, Rive, etc.).

---

## 0. Charte à respecter

**Couleurs**
- Primaire terracotta : `#BE5C3C`
- Primaire foncé : `#A84A2F`
- Accent : `#C1440E`
- Fond clair : `#FFFFFF` / `#F8F6F4` / `#F9F9F9`
- Texte : `#1A1A1A` (titres) / `#666666` (texte courant) / `#999999` (légendes)
- Couleurs de "plan coloré" plein écran (transitions, façon Kolize) : décliner des teintes pastel de la palette Zafer plutôt que rose/jaune/vert génériques — ex. terracotta clair `#F1D9CC`, sable `#F3E9D7`, vert sauge discret `#DCE5D6` (un seul plan peut rester un clin d'œil pastel neutre si besoin de contraste).
- Couleur d'un seul "carton plein écran chiffre" (équivalent du carton jaune 600€/29.99€ chez Kolize) : terracotta `#BE5C3C` avec texte blanc.

**Typographie** : DM Sans, graisses 400/500/700/900. Titres kinétiques en 700–900, légendes/labels en 500.

**Logo Zafer** : silhouette de maison terracotta arrondie avec un sourire blanc incurvé à l'intérieur (PAS une lettre "Z"). Variante "manuscrite" (façon logo "Kolize" tracé à la main en intro/outro) à décliner : un trait noir façon feutre qui dessine le contour de la maison + sourire, puis bascule sur le logo couleur final.

**Iconographie** : traits 1.8px arrondis (stroke-linecap/linejoin round), noir `#1A1A1A` sur fond clair, style outline minimaliste — cohérent avec les icônes déjà produites (maison, voiture, frigo) pour le clip "cartes" existant.

**Rythme global** : 30fps (ou 60fps si le designer livre en haute fluidité), durée totale ≈ 45–49s, format vertical 1080×1920 (Reels/Stories/TikTok) — à confirmer avec le client si un format paysage 16:9 est aussi nécessaire pour le site web.

---

## Plan de montage — 10 scènes, timing aligné sur la référence

| # | Référence (Kolize) | Zafer | Timecode |
|---|---|---|---|
| 0 | Cartes "Vous êtes [métier]" | Cartes "Vous avez [un truc à vendre]" | 0:00–0:04 |
| 1 | "pas le temps pour TikTok / agence à 600€" | "pas le temps de poster sur 5 groupes Facebook / une agence immo à 5000 Rs" | 0:04–0:08 |
| 2 | "Résultat ? 0 vues, pas de présence en ligne..." | "Résultat ? annonce perdue, 0 vue, pas confiance..." | 0:08–0:12 |
| 3 | Logo Kolize + "C'est votre community manager / 100% virtuel" | Logo Zafer + "C'est votre vitrine locale / 100% Maurice" | 0:12–0:18 |
| 4 | "On s'occupe de tout" — checklist 4 étapes | "Publier, c'est 4 étapes" — checklist | 0:18–0:22.5 |
| 5 | "On vous dit exactement quoi faire" — 3 cartes photo | "On vous guide à chaque étape" — 3 cartes photo annonce | 0:22.5–0:25.5 |
| 6 | "Tout est basé sur..." Activité / Image / Tendances | "Tout est pensé pour..." Catégorie / Photos / Quartier | 0:25.5–0:30 |
| 7 | "C'est simple / rapide / et surtout..." + réseau d'avatars | "C'est simple / rapide / et surtout en confiance" + réseau | 0:30–0:38 |
| 8 | "Gagnez du temps / Soignez votre image" + carton prix 29.99€ | "Gagnez du temps / Vendez en confiance" + carton "Gratuit" | 0:38–0:40 |
| 9 | "Simple / Pro / Fait pour vous" + logo + tagline finale | "Simple / Local / Fait pour Maurice" + logo + tagline finale | 0:40–0:45 |

---

## SCÈNE 0 — Cold open : cartes persona (0:00 – 0:04s)

**Visuel** : fond blanc. Au centre, un mot fantôme géant en arrière-plan, gris très clair (`rgba(0,0,0,0.08)`), DM Sans 900, qui occupe toute la largeur : **"Vous avez"**. Par-dessus, une pile de 3 cartes (même gabarit que les cartes du clip "Immobilier/Voiture/Maison" déjà livré : fond `#F5F2EC`, bordure 2.5px `#1A1A1A`, radius 18px, ombre décalée 7px) défile une par une au centre, légèrement inclinée (3D perspective, rotateY).

**Texte sur les cartes** (icône outline 52px + label DM Sans bold 15px) :
1. Icône **valise/cartable** → label **"Un service à proposer"**
2. Icône **canapé/meuble** → label **"Un meuble à vendre"**
3. Icône **clé** → label **"Un logement à louer"**

**Texte final de la scène** (remplace le mot fantôme, kinetic typography, noir `#1A1A1A`, bold) :
**"Vous avez quelque chose à vendre ou louer"** — le segment "à vendre ou louer" est souligné d'un trait elliptique tracé à la main, terracotta `#BE5C3C` (même effet que l'ellipse jaune sous "savoir-faire" dans la référence).

**Animation** :
- Chaque carte entre depuis la droite à `x:+820px`, `rotateY:-70°`, `scale:0.85`, `opacity:0` → arrive à `x:0, rotateY:0°, scale:1, opacity:1` en ~18 frames, easing `easeOut` cubique, avec un flou de mouvement fort en début de course (`blur 14px→0px`) qui s'estompe sur les 60% premiers % du trajet.
- Hold ~35 frames, puis sortie symétrique vers la gauche (`x:-820px, rotateY:+70°`, blur qui remonte sur la fin).
- Le mot fantôme "Vous avez" pulse en opacité (0.12 → 0.08) pendant les transitions de carte, pour ne pas distraire.
- Le texte final apparaît avec un léger délai après la 3e carte : fade-in + scale 0.95→1, easeOut, et le trait elliptique se dessine ensuite (effet "draw-on" de gauche à droite, 12 frames).

---

## SCÈNE 1 — Le problème : pas le temps, trop cher (0:04 – 0:08s)

**Beat A — "Mais..." (transition, ~0.5s)**
Mot **"Mais.."** en kinetic typography (bold noir), entrée scale-in + blur, sur fond blanc avec un mot fantôme "Mais" géant derrière en transparence — identique au principe de la scène 0.

**Beat B — Manque de temps**
Une icône d'horloge ronde façon emoji (cadran rose `#E8B4C8`-like recoloré en terracotta clair `#E3B8A8`, aiguilles noires) apparaît en haut, et le texte **"pas le temps pour"** s'écrit dessous en DM Sans bold noir. Une pilule (badge arrondi, fond sable `#F3E9D7`, icône carrée à gauche) glisse depuis la droite avec le texte **"poster sur 10 groupes Facebook"**.

**Beat C — Coût d'une alternative**
Transition flou de couleur (cross-blur) : le fond passe au sable, puis au terracotta clair. Le texte **"une alternative à"** apparaît, puis cut sur un fond terracotta clair plein écran avec :
- Une carte type "annonce immobilière" (icône bâtiment, placeholder photo, barre de prix) qui flotte au centre, légèrement inclinée, avec rebond.
- Le prix **"5 000 Rs"** affiché en gros sous la carte.
- Des pièces de monnaie / billets stylisés (petits ovales orange, traits) qui tombent en arrière-plan façon confettis, mouvement de chute avec léger tangage (rotation oscillante), à différentes vitesses pour un effet parallax.

**Animation** : chaque mot-clé entre en kinetic typography (scale 0.8→1, blur 12px→0px, translateY +20px→0, easeOut, ~10 frames), les pilules glissent horizontalement (translateX 60px→0, opacity 0→1). Les pièces tombent en boucle continue tout le long du beat C (translateY infini, rotation sinusoïdale, recyclées hors-écran).

---

## SCÈNE 2 — Le résultat : zéro visibilité (0:08 – 0:12s)

**Visuel** : le mot fantôme géant **"Résultat ?"** s'affiche en transparence, puis le texte plein **"Résultat ?"** apparaît par-dessus (kinetic typography classique).

Transition vers une colonne de **3 mockups d'annonces** empilés verticalement à gauche de l'écran (cartes rectangulaires, coins arrondis, placeholder photo gris avec icône image, 3 points de pagination, compteur **"0 vues"** en bas à droite de chaque carte).

À droite, 3 pilules colorées apparaissent l'une après l'autre (stagger, délai ~12 frames entre chaque), chacune avec une icône croix `✕` à gauche :
1. Pilule terracotta clair : **"✕ Annonce invisible"**
2. Pilule bleu pastel `#C9D6E8` (clin d'œil à la pilule bleue Kolize "Pas de Gen Z") : **"✕ Pas de réponse"**
3. Pilule jaune sable `#F0DDB0` : **"✕ Aucun acheteur sérieux"**

**Animation** : les cartes mockup glissent depuis le bas avec un léger overshoot (spring, bounce léger). Les pilules entrent depuis la droite (translateX 50px→0 + fade), stagger séquencé pour que chacune "ponctue" le rythme — synchronisé pour tomber pile sur un battement si une musique/voix off est ajoutée plus tard.

---

## SCÈNE 3 — Entrée de Zafer (0:12 – 0:18s)

**Beat A — Reveal du logo (façon intro "Kolize" tracée à la main)**
Fond blanc. Un trait noir façon feutre dessine en time-lapse (stroke draw-on, ~20 frames) le contour de la maison-sourire du logo Zafer, puis le dessin bascule en couleur (terracotta + sourire blanc) et se stabilise en haut de l'écran, wordmark **"Zafer"** en dessous en DM Sans bold noir.

**Beat B — Mockups téléphone**
Deux téléphones flottent légèrement inclinés de part et d'autre du logo :
- Téléphone gauche : écran "Statistiques de mon annonce" — compteur **"Vues : 1 248"**, **"Contacts WhatsApp : 12"**.
- Téléphone droit : écran de création d'annonce avec une photo de produit (ex. une table en bois ou une voiture) et le badge **"Photo optimisée"**.

**Beat C — Phrase d'accroche**
Le logo et les téléphones s'effacent doucement (fade + léger scale down), et le texte central apparaît, centré, en deux temps (mot par mot, kinetic typography) :
**"C'est votre"** puis **"vitrine locale de confiance"**, avec un avatar rond (photo d'un utilisateur mauricien souriant, style portrait neutre) qui apparaît au-dessus du texte, entouré de 2 cercles concentriques fins (anneaux de "radar"/réseau) qui se dessinent progressivement (stroke draw-on, opacity croissante).

**Beat D — Badge + toggle**
Une pilule terracotta apparaît sous le texte : **"100 % Maurice"** (remplace "100% virtuel"). En dessous, un toggle/switch avec le label **"Vendeurs vérifiés"** s'anime de off → on (le rond du switch glisse de gauche à droite, le fond du switch passe de gris à vert `#7FA86B`).

**Beat E — Réseau d'avatars**
Au moment où le toggle s'active, 6 à 8 petits avatars (photos de visages divers, représentatifs de la population mauricienne) apparaissent en orbite autour de l'avatar central, sur 2 cercles concentriques, avec un effet d'entrée en cascade (stagger ~6 frames entre chaque, scale 0→1 + fade, easeOut bounce léger).

---

## SCÈNE 4 — Comment ça marche : publier en 4 étapes (0:18 – 0:22.5s)

**Texte titre** : **"Publier, c'est 4 étapes"** (remplace "On s'occupe de tout"), kinetic typography bold noir, aligné à gauche en haut.

**Visuel** : une ligne horizontale fine se dessine progressivement de gauche à droite (stroke draw-on synchronisé avec l'apparition des étapes). 4 ronds posés sur la ligne, espacés régulièrement, chacun avec un label au-dessus et une icône check à l'intérieur qui se remplit (transition d'un contour vide à un disque plein olive/terracotta avec coche blanche) au fur et à mesure :

1. **Photo** (icône appareil photo)
2. **Description** (icône texte/lignes)
3. **Catégorie** (icône étiquette — Véhicule / Immobilier / Maison)
4. **Publication** (icône check / fusée)

**Animation** : chaque étape apparaît avec un délai de ~12 frames sur la précédente — le rond passe de "vide contour gris" à "plein coloré + coche" en un crossfade rapide (8 frames), et le segment de ligne qui le relie au précédent se dessine juste avant (stroke-dashoffset animé). À la fin, hold 15 frames sur les 4 étapes complètes, puis un léger zoom-out / recul de caméra (scale 1→0.92) pour amorcer la transition suivante.

---

## SCÈNE 5 — On vous guide (0:22.5 – 0:25.5s)

**Visuel** : 3 cartes "photo" façon polaroid (fond crème `#F3EEDF`, coin arrondi, placeholder image avec icône image grise) se superposent en éventail au centre (la carte du milieu légèrement plus haute et plus grande que les deux latérales, qui sont inclinées de ±8°).

**Texte** : une pilule avec icône check vert apparaît en dessous : **"On vous guide à chaque étape"** (remplace "On vous dit exactement quoi faire").

**Animation** : les 3 cartes entrent en cascade depuis des directions légèrement différentes (gauche, centre-bas, droite) avec un effet de "pose" final en éventail — translate + rotate + scale, spring avec un petit rebond, stagger 6 frames. La pilule de texte arrive ensuite par le bas (translateY 30px→0 + fade), 10 frames après la dernière carte.

---

## SCÈNE 6 — Personnalisation (0:25.5 – 0:30s)

**Texte titre** : **"Tout est pensé pour..."** (remplace "Tout est basé sur..."), kinetic typography, avatar utilisateur qui apparaît au-dessus du titre avec 2 lignes pointillées qui descendent ensuite vers 3 cartes.

**3 cartes qui apparaissent une à une** (stagger ~15 frames), chacune avec un check vert au-dessus :
1. **"Votre catégorie"** — grille de 6 icônes outline (voiture, maison, frigo/électroménager, vêtement, téléphone, vélo), l'icône "Véhicule" est surlignée (fond bleu clair) pour illustrer une sélection active.
2. **"Vos photos"** — 3 mini-vignettes photo, l'une surlignée en bleu pour indiquer "photo principale sélectionnée".
3. **"Votre quartier"** — petite carte stylisée de l'île Maurice avec un point/pin terracotta localisé sur une ville (ex. Port-Louis ou Curepipe), et 2-3 lignes de tendance discrètes (mini sparkline) en arrière-plan évoquant la demande locale.

**Animation** : identique au principe Kolize — chaque carte glisse depuis le bas avec un léger flou de mouvement, les lignes pointillées reliant l'avatar à chaque carte se dessinent juste avant l'apparition de la carte (stroke draw-on rapide, 8 frames), et un check vert "pop" (scale 0→1.2→1, overshoot léger) marque la validation de chaque critère.

---

## SCÈNE 7 — Simple, rapide, en confiance (0:30 – 0:38s)

**Beat A — Triptyque de mots clés sur fonds pleins colorés**
Trois cuts rapides plein écran, chacun avec un fond plein de la palette Zafer et un texte centré :
1. Fond terracotta clair `#F1D9CC` — **"C'est simple"** avec le mot "simple" sur une pilule pleine terracotta, texte blanc.
2. Fond sable `#F3E9D7` — **"C'est rapide"** avec "rapide" sur une pilule pleine `#A84A2F`, texte blanc.
3. Fond vert sauge `#DCE5D6` — **"et surtout"** suivi (cut suivant) de **"en confiance"**.

**Animation** : chaque mot-clé apparaît en kinetic typography (scale-in + blur), la pilule colorée "pop" derrière le mot-clé une fraction de seconde après (delay ~5 frames), chaque carton dure ~15-18 frames puis cut direct (pas de fondu, cut sec comme dans la référence) vers le carton suivant.

**Beat B — Le réseau de confiance (zoom + expansion)**
Fond blanc. Un avatar central (visage d'un utilisateur Zafer, photo réelle ou illustration) apparaît au centre dans un cercle, entouré d'anneaux concentriques fins qui se dessinent progressivement.

Puis le réseau s'étend : 6-8 avatars supplémentaires apparaissent en orbite, en cascade (stagger), représentant des acheteurs/vendeurs à travers l'île — pour suggérer "tout Maurice vous voit". Les anneaux concentriques continuent de pulser légèrement (scale 1→1.03→1 en boucle lente) pour donner une sensation de réseau vivant.

**Texte qui s'incruste pendant l'expansion du réseau** (2 pilules qui apparaissent successivement en bas) :
1. **"Gagnez du temps"** + icône horloge, sur fond avec un graphique discret en diagonale derrière (lignes de tendance ascendante, rose/terracotta clair).
2. **"Vendez en toute confiance"** (remplace "Soignez votre image") + icône bouclier ou cœur-check, avec une petite couronne ou étoile scintillante au-dessus d'une carte-annonce pour suggérer "mise en avant / avis positifs".

---

## SCÈNE 8 — Le prix : gratuit (0:38 – 0:40s)

**Transition** : texte **"Et tout ça..."** entouré d'un trait elliptique tracé à la main (même procédé que la scène 0), cut vers fond plein terracotta `#BE5C3C`.

**Visuel** : un téléphone mockup légèrement incliné occupe la gauche de l'écran, écran affichant l'app Zafer (liste d'annonces, barre de recherche, catégories en icônes). Des éléments décoratifs (petites pièces/étoiles stylisées, ou bulles de notification WhatsApp vertes) tombent en arrière-plan en parallax, façon confettis.

**Texte** (grand, blanc, bold, à droite du téléphone) :
**"Gratuit"**
puis en dessous, plus petit : **"pour vendre et acheter"**

> ⚠️ Note pour le client : dans la référence, ce plan affiche un prix d'abonnement ("29.99€/mois"). Le modèle économique réel de Zafer (gratuit, commission, freemium...) doit être confirmé avant production — ce script part de l'hypothèse "gratuit" cohérente avec un marketplace P2P grand public, à ajuster si un modèle payant existe.

**Animation** : entrée du téléphone par la gauche avec léger flou de mouvement, le mot "Gratuit" apparaît en scale-in énergique (overshoot prononcé, façon "carton prix" de la référence), les éléments décoratifs tombent en boucle continue.

---

## SCÈNE 9 — Closing : pilules finales + logo + tagline (0:40 – 0:45s)

**Beat A — Pilules finales**
Fond blanc. 3 pilules apparaissent par paires successives (stagger), chacune avec un check vert :
1. **"✓ Simple"**
2. **"✓ Local"** (remplace "Pro")
3. **"✓ Fait pour Maurice"** (remplace "Fait pour vous")

Chaque paire de pilules glisse légèrement depuis le bas en se chevauchant dans le temps avec la paire suivante (la 1ère reste visible quand la 2e arrive, transition douce par recouvrement horizontal).

**Beat B — Logo outro**
Cut vers fond blanc plein écran. Le logo Zafer se redessine en version "trait à la main" (même feutre noir que l'intro), puis se colorise (terracotta + sourire blanc), et le wordmark **"Zafer"** apparaît dessous en DM Sans bold noir.

**Beat C — Tagline finale**
Sous le logo, en 2 lignes, kinetic typography : **"Vos bonnes affaires"** / **"méritent d'être vues."** (remplace "Votre savoir-faire mérite d'être vu"), puis hold ~20 frames sur l'écran final logo + tagline (carton de fin, éventuellement avec un bouton CTA "Télécharger l'app" ou "Visiter zafer.mu" si un end-card cliquable est nécessaire pour les formats publicitaires).

---

## Notes de production transverses (à respecter sur tout le film)

- **Kinetic typography** : toute apparition de mot/titre = combo `opacity 0→1` + `translateY +15/20px→0` + `scale 0.8→1` + `blur 12px→0px`, easing `easeOut` cubique, durée ~8-12 frames à 30fps. C'est la signature visuelle du film, à appliquer de façon identique sur toutes les scènes texte.
- **Pilules/badges** : fond plein arrondi (border-radius = hauteur/2, effet "pill"), icône carrée à gauche (check ✓ vert sur fond vert clair, ou croix ✕ sur fond coloré), texte DM Sans 500/700. Entrée toujours en glissement horizontal (translateX 50-60px → 0) + fade.
- **Cartes/mockups** : fond `#F5F2EC` ou crème, bordure 2-2.5px noir `#1A1A1A`, radius 16-18px, ombre "stack" en aplat décalé de 6-7px (pas de flou de blur sur l'ombre, contour net comme un dessin).
- **Transitions plein écran colorées** : cuts secs (pas de fondu) entre les cartons colorés du triptyque "simple/rapide/confiance" — c'est volontairement abrupt dans la référence, à conserver pour le punch rythmique.
- **Avatars réseau** : entrée en cascade (stagger 6-10 frames), scale 0→1 avec léger overshoot (spring bounce faible), jamais plus de 8-10 avatars simultanés pour rester lisible.
- **Vitesse globale** : la référence tient en 44.65s pour ~9 grandes scènes — chaque scène dure entre 2.5s et 8s, aucun plan ne dépasse ~8s. Respecter cette densité : on ne s'attarde jamais, le texte change toutes les 1.5-2.5s en moyenne.
- **Élément récurrent optionnel** : un petit bouton flottant sticky en coin bas-droit type "Devis rapide" existe dans la référence tout au long de la vidéo (probablement un artefact du lecteur vidéo de la page d'origine, pas un élément du montage) — **ne pas reproduire**, ce n'est pas un élément de design intentionnel de la vidéo source.
- **Durée finale cible** : 44-45s si calé strictement sur la référence ; la chaîne YouTube source indique un export "natif" de 49s (4s de carton de fin supplémentaire probable, non capturés dans l'enregistrement analysé) — prévoir éventuellement 3-4s de marge en fin de scène 9 pour un carton CTA cliquable si le format de diffusion l'exige (pub Instagram/TikTok avec bouton "En savoir plus").

---

## Récapitulatif des textes (pour copier-coller rapide)

```
Scène 0 : Un service à proposer / Un meuble à vendre / Un logement à louer
          → "Vous avez quelque chose à vendre ou louer"
Scène 1 : "Mais.." / "pas le temps pour" / "poster sur 10 groupes Facebook"
          / "une alternative à" / "5 000 Rs"
Scène 2 : "Résultat ?" / "✕ Annonce invisible" / "✕ Pas de réponse"
          / "✕ Aucun acheteur sérieux"
Scène 3 : "C'est votre" / "vitrine locale de confiance" / "100 % Maurice"
          / "Vendeurs vérifiés"
Scène 4 : "Publier, c'est 4 étapes" / Photo / Description / Catégorie / Publication
Scène 5 : "On vous guide à chaque étape"
Scène 6 : "Tout est pensé pour..." / "Votre catégorie" / "Vos photos" / "Votre quartier"
Scène 7 : "C'est simple" / "C'est rapide" / "et surtout" / "en confiance"
          / "Gagnez du temps" / "Vendez en toute confiance"
Scène 8 : "Et tout ça..." / "Gratuit" / "pour vendre et acheter"
Scène 9 : "✓ Simple" / "✓ Local" / "✓ Fait pour Maurice"
          / "Vos bonnes affaires" / "méritent d'être vues."
```
