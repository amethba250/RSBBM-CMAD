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

    /* Animation bouton */
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

    /* Animation panier */
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
    document.getElementById("badgePanier").textContent = totalQuantite;

    if (totalQuantite === 0) {
        document.getElementById("badgePanier").style.display = "none";
    } else {
        document.getElementById("badgePanier").style.display = "inline-block";
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

    let message = "Bonjour, je souhaite commander :%0A";
    let total = 0;

    panier.forEach(item => {
        message += `- ${item.nom} x${item.quantite}%0A`;
        total += item.prix * item.quantite;
    });

    message += `%0ATotal : ${total} FCFA`;

    let numero = "221772794606";
    let url = `https://wa.me/${numero}?text=${message}`;

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
document.addEventListener("click", function(e) {
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
   INITIALISATION
========================= */
window.onload = function () {
    afficherPanier();
};