let panier = [];

/* =========================
   AJOUT AU PANIER + ANIMATION
========================= */
function ajouterAuPanier(btn) {
    let nom = btn.getAttribute("data-nom");
    let prix = parseInt(btn.getAttribute("data-prix"));

    let existant = panier.find(item => item.nom === nom);

    if (existant) {
        existant.quantite += 1;
    } else {
        panier.push({
            nom: nom,
            prix: prix,
            quantite: 1
        });
    }

    afficherPanier();

    /* Animation bouton Commander */
    let ancienTexte = btn.innerText;
    btn.innerText = "Ajouté ✔";
    btn.disabled = true;
    btn.style.transform = "scale(1.05)";
    btn.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";

    setTimeout(() => {
        btn.innerText = ancienTexte;
        btn.disabled = false;
        btn.style.transform = "";
        btn.style.boxShadow = "";
    }, 1000);

    /* Animation icône panier */
    let panierBtn = document.getElementById("btnPanier");
    panierBtn.style.transform = "scale(1.15)";

    setTimeout(() => {
        panierBtn.style.transform = "scale(1)";
    }, 400);
}

/* =========================
   AFFICHER PANIER
========================= */
function afficherPanier() {
    let liste = document.getElementById("listePanier");
    let total = 0;
    let totalQuantite = 0;

    liste.innerHTML = "";

    if (panier.length === 0) {
        liste.innerHTML = "<li>Votre panier est vide 🛒</li>";
    }

    panier.forEach(item => {
        let li = document.createElement("li");

        li.innerHTML = `
            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:12px;
                padding:10px;
                background:#fff;
                border-radius:10px;
            ">
                <div>
                    <strong>${item.nom}</strong><br>
                    x${item.quantite} — ${item.prix * item.quantite} FCFA
                </div>

                <button onclick="supprimerDuPanier('${item.nom}')"
                    style="
                        background:#8b2e2e;
                        color:white;
                        border:none;
                        width:35px;
                        height:35px;
                        border-radius:8px;
                        cursor:pointer;
                    ">
                    ✕
                </button>
            </div>
        `;

        liste.appendChild(li);

        total += item.prix * item.quantite;
        totalQuantite += item.quantite;
    });

    document.getElementById("total").textContent = total + " FCFA";

    let badge = document.getElementById("badgePanier");
    badge.textContent = totalQuantite;

    if (totalQuantite === 0) {
        badge.style.display = "none";
    } else {
        badge.style.display = "inline-block";
    }
}

/* =========================
   SUPPRIMER DU PANIER
========================= */
function supprimerDuPanier(nom) {
    panier = panier.filter(item => item.nom !== nom);
    afficherPanier();
}

/* =========================
   COMMANDER VIA WHATSAPP
========================= */
function commanderWhatsApp() {
    if (panier.length === 0) {
        alert("Votre panier est vide 🛒");
        return;
    }

    let message = "Bonjour, je souhaite commander :\n";
    let total = 0;

    panier.forEach(item => {
        message += `- ${item.nom} x${item.quantite}\n`;
        total += item.prix * item.quantite;
    });

    message += `\nTotal : ${total} FCFA`;

    let numero = "221772794606";
    let url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}

/* =========================
   OUVRIR / FERMER PANIER
========================= */
function togglePanier() {
    let overlay = document.getElementById("panierOverlay");

    if (overlay.style.display === "block") {
        overlay.style.display = "none";
    } else {
        overlay.style.display = "block";
    }
}

/* =========================
   FERMER SI CLICK AILLEURS
========================= */
document.addEventListener("click", function (e) {
    let overlay = document.getElementById("panierOverlay");
    let btnPanier = document.getElementById("btnPanier");

    if (
        overlay &&
        !overlay.contains(e.target) &&
        !btnPanier.contains(e.target)
    ) {
        overlay.style.display = "none";
    }
});

/* =========================
   ANIMATION DES CARDS AU SCROLL
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".menu-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});

/* =========================
   INITIALISATION
========================= */
window.onload = function () {
    afficherPanier();
};